import { useMemo, useCallback } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { useSettings } from "@/app/hooks/useSettings"
import { useFirestoreWithArchive } from "@/app/hooks/data/useFirestoreWithArchive"
import { generateId, todayString } from "@shared/lib"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"
import type { Assignment, Status } from "@/app/types"

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
    const { isPremium } = useAuth()

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

    // Merge standard and premium assignments into a single list
    const assignments = useMemo(() => {
        if (!isPremium) return standardItems
        return [...standardItems, ...premiumItems]
    }, [standardItems, premiumItems, isPremium])

    // Counts
    const totalNum = assignments.length

    // Track which IDs live in the premium list for routing updates
    const premiumIds = useMemo(() => {
        if (!isPremium) return new Set<string>()
        return new Set(premiumItems.map(a => a.id))
    }, [premiumItems, isPremium])

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
        return assignments.reduce<Record<string, Assignment[]>>((acc, assignment) => {
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
    const addAssignment = useCallback((assignment: Omit<Assignment, "id" | "createdAt">): void => {
        setStandardItems(prev => [...prev, { ...assignment, id: generateId(), createdAt: todayString() }])
    }, [setStandardItems])
    const updateAssignment = useCallback((id: string, updates: Partial<Assignment>): void => {
        if (premiumIds.has(id)) {
            setPremiumItems(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
        } else {
            setStandardItems(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
        }
    }, [setStandardItems, setPremiumItems, premiumIds])
    const deleteAssignment = useCallback((id: string): void => {
        if (premiumIds.has(id)) {
            setPremiumItems(prev => prev.filter(a => a.id !== id))
        } else {
            setStandardItems(prev => prev.filter(a => a.id !== id))
        }
    }, [setStandardItems, setPremiumItems, premiumIds])
    const markAsDone = useCallback((id: string) => {
        return updateAssignment(id, { status: "Done" })
    }, [updateAssignment])

    return {
        // Raw data
        assignments,
        assignmentTypes,

        // Counts
        totalNum,

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
        getAssignmentsForDate,
        getAssignmentsByStatus,
        getAssignmentsByClass,

        // Actions
        addAssignment,
        updateAssignment,
        deleteAssignment,
        markAsDone,
    }
}
