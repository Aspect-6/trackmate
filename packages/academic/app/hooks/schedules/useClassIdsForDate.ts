import { useAcademicTerms } from "@/app/hooks/entities"
import { getActiveTerm, isAlternatingAB } from "@/app/lib/schedule"
import { useAlternatingABClassIds } from "@/app/hooks/schedules/useAlternatingABClassIds"
import { useSemesterClassIds } from "@/app/hooks/schedules/useSemesterClassIds"
import { useFixedWeeklyClassIds } from "@/app/hooks/schedules/useFixedWeeklyClassIds"
import type { ClassIdsForDateResult } from "@/app/contexts/ScheduleComponentsContext"

/**
 * Returns the list of class IDs scheduled for a specific date, dispatching by
 * the active term's `scheduleType`
 */
export const useClassIdsForDate = (date: string): ClassIdsForDateResult => {
    const { academicTerms } = useAcademicTerms()
    const activeTerm = date ? getActiveTerm(date, academicTerms) : undefined

    const abResult = useAlternatingABClassIds(date)
    const semResult = useSemesterClassIds(date)
    const fwResult = useFixedWeeklyClassIds(date)

    const classIds = activeTerm?.scheduleType === "semester"
        ? semResult.classIds
        : activeTerm?.scheduleType === "fixed-weekly"
            ? fwResult.classIds
            : isAlternatingAB(activeTerm?.scheduleType)
                ? abResult.classIds
                : []

    const hasClasses = classIds.length > 0 && classIds.some(id => id !== null)
    return { classIds, hasClasses }
}
