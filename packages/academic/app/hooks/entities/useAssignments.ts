import { useMemo, useCallback } from "react"
import { useSettings } from "@/app/hooks/useSettings"
import { useFirestoreWithArchive } from "@/app/hooks/data/useFirestoreWithArchive"
import { generateId, todayString } from "@shared/lib"
import { isSubtaskDisplayId, parseSubtaskDisplayId } from "@/app/lib/subtaskIds"
import type { Assignment, RenderableAssignment, Status } from "@/app/types"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"
import {
    type AssignmentStoreSetters,
    type SubtaskPatch,
    assignmentPartialToSubtaskPatch,
    flattenAssignmentsForDisplay,
    getSubtaskCount,
    isPremiumTargetForSubtaskCount,
    routeAssignmentUpdate,
    runUpdateParent,
    runUpdateSubtask,
} from "@/app/lib/assignments"

// Archive completed assignments older than 365 days
const getAssignmentDate = (a: Assignment) => a.dueDate
const isAssignmentArchivable = (a: Assignment) => a.status === "Done"

/**
 * Hook for accessing and working with assignments.
 * Provides filtered views, lookup functions, and CRUD operations.
 *
 * Automatically archives completed assignments older than 365 days
 * while keeping them accessible to the user seamlessly.
 *
 * For premium users, also reads from premium assignment documents
 * and merges them into a single unified list.
 */
export const useAssignments = () => {
    const [standardItems, setStandardItems] = useFirestoreWithArchive<Assignment>(
        FIRESTORE_KEYS.ASSIGNMENTS,
        FIRESTORE_KEYS.ASSIGNMENTS_ARCHIVE,
        getAssignmentDate,
        isAssignmentArchivable
    )

    const [premiumItems, setPremiumItems] = useFirestoreWithArchive<Assignment>(
        FIRESTORE_KEYS.ASSIGNMENTS_PREMIUM,
        FIRESTORE_KEYS.ASSIGNMENTS_PREMIUM_ARCHIVE,
        getAssignmentDate,
        isAssignmentArchivable
    )

    const { assignmentTypes } = useSettings()

    const storeSetters: AssignmentStoreSetters = useMemo(() => {
        return { setStandardItems, setPremiumItems }
    }, [setStandardItems, setPremiumItems])

    const parentAssignments = useMemo(() => {
        return [...standardItems, ...premiumItems]
    }, [standardItems, premiumItems])

    const premiumParentIds = useMemo(() => {
        return new Set(premiumItems.map(a => a.id))
    }, [premiumItems])

    const assignments = useMemo(() => (
        flattenAssignmentsForDisplay(parentAssignments)
    ), [parentAssignments])

    // Filtered views (sorted by due date)
    const activeAssignments = useMemo(() => {
        return assignments
            .filter(assignment => assignment.status === "To Do" || assignment.status === "In Progress")
            .toSorted((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    }, [assignments])
    const completedAssignments = useMemo(() => {
        return assignments.filter(assignment => assignment.status === "Done")
    }, [assignments])
    const overdueAssignments = useMemo(() => {
        return assignments.filter(assignment => assignment.status !== "Done" && new Date(assignment.dueDate) < new Date())
    }, [assignments])

    // Sorted views
    const sortedByDueDate = useMemo(() => {
        return assignments.toSorted((assignmentA, assignmentB) =>
            new Date(assignmentA.dueDate).getTime() - new Date(assignmentB.dueDate).getTime()
        )
    }, [assignments])

    // Indexed by date
    const assignmentsByDate = useMemo(() => {
        return assignments.reduce<Record<string, RenderableAssignment[]>>((acc, assignment) => {
            if (assignment.dueDate) {
                if (!acc[assignment.dueDate]) acc[assignment.dueDate] = []
                acc[assignment.dueDate]!.push(assignment)
            }
            return acc
        }, {})
    }, [assignments])

    // Lookup functions
    const getAssignmentById = useCallback((id: string) => {
        return assignments.find(assignment => assignment.id === id) ?? null
    }, [assignments])
    const getParentAssignmentById = useCallback((id: string) => {
        const parsed = parseSubtaskDisplayId(id)
        const parentId = parsed?.parentId ?? id
        return parentAssignments.find(assignment => assignment.id === parentId) ?? null
    }, [parentAssignments])
    const getAssignmentsForDate = useCallback((date: string) => {
        return assignmentsByDate[date] ?? []
    }, [assignmentsByDate])
    const getAssignmentsByStatus = useCallback((status: Status) => {
        return assignments.filter(assignment => assignment.status === status)
    }, [assignments])
    const getAssignmentsByClass = useCallback((classId: string) => {
        return assignments.filter(assignment => assignment.classId === classId)
    }, [assignments])

    // Actions
    const updateSubtask = useCallback((
        parentId: string,
        subtaskId: string,
        patch: SubtaskPatch
    ): void => {
        runUpdateSubtask(parentId, subtaskId, patch, premiumParentIds, storeSetters)
    }, [premiumParentIds, storeSetters])

    const updateParent = useCallback((
        parentId: string,
        updates: Partial<Assignment>
    ): void => {
        runUpdateParent(parentId, updates, premiumParentIds, storeSetters)
    }, [premiumParentIds, storeSetters])

    const addAssignment = useCallback((assignment: Omit<Assignment, "id" | "createdAt">): void => {
        const id = generateId()
        const createdAt = todayString()

        const nextParent: Assignment = {
            ...assignment,
            id,
            createdAt,
            subtasks: assignment.subtasks ?? [],
        }

        const writePremium = isPremiumTargetForSubtaskCount(getSubtaskCount(nextParent))

        if (writePremium) {
            setPremiumItems(prev => [...prev, nextParent])
        } else {
            setStandardItems(prev => [...prev, nextParent])
        }
    }, [setStandardItems, setPremiumItems])

    const updateAssignment = useCallback((id: string, updates: Partial<Assignment>): void => {
        const routed = routeAssignmentUpdate(id)
        if (routed.kind === "subtask") {
            updateSubtask(routed.parentId, routed.subtaskId, assignmentPartialToSubtaskPatch(updates))
        } else if (routed.kind === "parent") {
            updateParent(routed.parentId, updates)
        }
    }, [updateSubtask, updateParent])

    const deleteAssignment = useCallback((id: string): void => {
        // For now, only parent deletion is supported by the existing UI.
        if (isSubtaskDisplayId(id)) return

        const isInPremiumDoc = premiumParentIds.has(id)
        if (isInPremiumDoc) {
            setPremiumItems(prev => prev.filter(a => a.id !== id))
        } else {
            setStandardItems(prev => prev.filter(a => a.id !== id))
        }
    }, [setStandardItems, setPremiumItems, premiumParentIds])

    const markAsDone = useCallback((id: string) => {
        return updateAssignment(id, { status: "Done" })
    }, [updateAssignment])

    return {
        // Raw data
        parentAssignments,
        assignments,
        assignmentTypes,

        // Counts
        totalNum: assignments.length,

        // Filtered views
        activeAssignments,
        completedAssignments,
        overdueAssignments,

        // Sorted views
        sortedByDueDate,

        // Indexed data
        assignmentsByDate,

        // Lookup functions
        getAssignmentById,
        getParentAssignmentById,
        getAssignmentsForDate,
        getAssignmentsByStatus,
        getAssignmentsByClass,

        // Actions
        addAssignment,
        updateAssignment,
        updateSubtask,
        updateParent,
        deleteAssignment,
        markAsDone,
    }
}
