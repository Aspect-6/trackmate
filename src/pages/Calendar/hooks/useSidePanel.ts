import { useMemo } from 'react'
import { useAssignments, useEvents, useNoSchool, useSchedules, useAcademicTerms } from '@/app/hooks/entities'
import { dateToLocalISOString, formatDate } from '@/app/lib/utils'
import { getActiveTerm } from '@/app/lib/schedule'

interface UseSidePanelProps {
    selectedDate: Date | null
}

/**
 * Hook for computing the side panel data for a selected calendar day.
 * Returns null if no date is selected.
 */
export const useSidePanel = ({ selectedDate }: UseSidePanelProps) => {
    const { getDayTypeForDate } = useSchedules()
    const { academicTerms } = useAcademicTerms()
    const { getAssignmentsForDate } = useAssignments()
    const { getEventsForDate } = useEvents()
    const { noSchoolPeriods, getNoSchoolStatusForDate } = useNoSchool()

    const sidePanelData = useMemo(() => {
        if (!selectedDate) return null

        const dateString = dateToLocalISOString(selectedDate)
        const noSchoolDay = getNoSchoolStatusForDate(dateString)
        const dayType = getDayTypeForDate(dateString, getActiveTerm(dateString, academicTerms), noSchoolPeriods)
        // TODO: Classes now stored per-term - need to determine active term to show classes
        const dayClasses: (string | null)[] = []
        const dueAssignments = getAssignmentsForDate(dateString)
        const dayEvents = getEventsForDate(dateString)

        const formattedDate = formatDate('full', dateString)

        return {
            date: selectedDate,
            dateString,
            formattedDate,
            noSchoolDay,
            dayType,
            classes: dayClasses,
            dueAssignments,
            dayEvents
        }
    }, [selectedDate, getAssignmentsForDate, getEventsForDate, getNoSchoolStatusForDate, getDayTypeForDate, academicTerms, noSchoolPeriods])

    return sidePanelData
}
