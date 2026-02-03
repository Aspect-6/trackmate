import { useMemo, useCallback } from "react"
import { useSettings } from "@/app/hooks/useSettings"
import { useFirestoreCollection } from "@/app/hooks/data/useFirestore"
import { generateId, todayString } from "@shared/lib"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"
import type { Assignment, Status } from "@/app/types"

const DEFAULT_ASSIGNMENTS: Assignment[] = []

/**
 * Hook for accessing and working with assignments.
 * Provides filtered views, lookup functions, and CRUD operations.
 */
export const useAssignments = () => {
    const [assignments, setAssignments] = useFirestoreCollection<Assignment>(FIRESTORE_KEYS.ASSIGNMENTS, DEFAULT_ASSIGNMENTS)
    const { assignmentTypes } = useSettings()

    // Counts
    const totalNum = assignments.length

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
        setAssignments(prev => [...prev, { ...assignment, id: generateId(), createdAt: todayString() }])
    }, [setAssignments])
    const updateAssignment = useCallback((id: string, updates: Partial<Assignment>): void => {
        setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
    }, [setAssignments])
    const deleteAssignment = useCallback((id: string): void => {
        setAssignments(prev => prev.filter(a => a.id !== id))
    }, [setAssignments])
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
