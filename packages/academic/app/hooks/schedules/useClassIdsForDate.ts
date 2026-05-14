import { useAcademicTerms } from "@/app/hooks/entities"
import { getActiveTerm } from "@/app/lib/schedule"
import { useAlternatingABClassIds } from "@/app/hooks/schedules/useAlternatingABClassIds"
import { useSemesterClassIds } from "@/app/hooks/schedules/useSemesterClassIds"
import type { ClassIdsForDateResult } from "@/app/contexts/ScheduleComponentsContext"

/**
 * Returns the list of class IDs scheduled for a specific date, dispatching by
 * the active term's `scheduleType`
 */
export const useClassIdsForDate = (date: string): ClassIdsForDateResult => {
    const { filteredAcademicTerms } = useAcademicTerms()
    const activeTerm = date ? getActiveTerm(date, filteredAcademicTerms) : undefined

    const abResult = useAlternatingABClassIds(date)
    const semResult = useSemesterClassIds(date)

    const classIds = activeTerm?.scheduleType === "semester"
        ? semResult.classIds
        : abResult.classIds

    const hasClasses = classIds.length > 0 && classIds.some(id => id !== null)
    return { classIds, hasClasses }
}
