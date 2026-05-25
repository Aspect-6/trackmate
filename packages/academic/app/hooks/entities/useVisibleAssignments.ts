import { useMemo } from "react"
import { useAssignments } from "./useAssignments"
import { useClasses } from "./useClasses"

/**
 * A wrapper hook around useAssignments that filters out assignments
 * belonging to archived classes from the computed UI views, while
 * keeping the raw 'assignments' array and lookup functions intact.
 */
export const useVisibleAssignments = () => {
    const assignmentsState = useAssignments()
    const { classes } = useClasses()

    const archivedClassIds = useMemo(() => 
        new Set(classes.filter(c => c.isArchived).map(c => c.id)),
    [classes])

    return useMemo(() => {
        const assignments = assignmentsState.assignments.filter(a => !archivedClassIds.has(a.classId))
        const activeAssignments = assignmentsState.activeAssignments.filter(a => !archivedClassIds.has(a.classId))
        const completedAssignments = assignmentsState.completedAssignments.filter(a => !archivedClassIds.has(a.classId))
        const overdueAssignments = assignmentsState.overdueAssignments.filter(a => !archivedClassIds.has(a.classId))
        const sortedByDueDate = assignmentsState.sortedByDueDate.filter(a => !archivedClassIds.has(a.classId))

        // Filter the date-indexed dictionary
        const assignmentsByDate = { ...assignmentsState.assignmentsByDate }
        for (const date in assignmentsByDate) {
            const dayAssignments = assignmentsByDate[date]
            if (dayAssignments) {
                assignmentsByDate[date] = dayAssignments.filter(a => !archivedClassIds.has(a.classId))
                if (assignmentsByDate[date]?.length === 0) {
                    delete assignmentsByDate[date]
                }
            }
        }

        return {
            ...assignmentsState,
            assignments,
            activeAssignments,
            completedAssignments,
            overdueAssignments,
            sortedByDueDate,
            assignmentsByDate,

            // Override lookup functions to use the filtered views
            getAssignmentById: (id: string) => assignments.find(a => a.id === id) ?? null,
            getAssignmentsForDate: (date: string) => assignmentsByDate[date] ?? [],
            getAssignmentsByStatus: (status: any) => assignments.filter(a => a.status === status),
            getAssignmentsByClass: (classId: string) => assignments.filter(a => a.classId === classId)
        }
    }, [assignmentsState, archivedClassIds])
}
