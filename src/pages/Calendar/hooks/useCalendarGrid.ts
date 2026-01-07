import { useMemo } from 'react'
import { useAssignments } from '@/app/hooks/useAssignments'
import { useEvents } from '@/app/hooks/useEvents'
import { useNoSchool } from '@/app/hooks/useNoSchool'
import { todayString } from '@/app/lib/utils'
import type { UseCalendar } from '@/pages/Calendar/types'

interface UseCalendarGridProps {
    month: number
    year: number
}

/**
 * Hook for computing the calendar grid cells.
 * Generates an array of cells representing days and empty slots for a month view.
 */
export const useCalendarGrid = ({ month, year }: UseCalendarGridProps) => {
    const { getAssignmentsForDate } = useAssignments()
    const { getEventsForDate } = useEvents()
    const { getNoSchoolStatusForDate } = useNoSchool()

    const calendarCells = useMemo(() => {
        const cells: UseCalendar.CalendarCell[] = []
        const firstDayOfMonth = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const totalCells = firstDayOfMonth + daysInMonth
        const remainingCells = 42 - totalCells
        const todayStr = todayString()

        // Empty start days
        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push({ type: 'empty', key: `empty-start-${i}` })
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const isToday = dateString === todayStr
            const noSchool = getNoSchoolStatusForDate(dateString)
            const dayAssignments = getAssignmentsForDate(dateString)
            const dayEvents = getEventsForDate(dateString)

            cells.push({
                type: 'day',
                key: `day-${day}`,
                day,
                dateString,
                isToday,
                noSchool: noSchool ?? undefined,
                assignments: dayAssignments,
                events: dayEvents
            })
        }

        // Empty end days
        for (let i = 0; i < remainingCells; i++) {
            cells.push({ type: 'empty', key: `empty-end-${i}` })
        }

        return cells
    }, [year, month, getAssignmentsForDate, getEventsForDate, getNoSchoolStatusForDate])

    return calendarCells
}
