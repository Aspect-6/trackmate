import { useMemo } from 'react'
import { useCalendarData } from './useCalendarData'
import { todayString } from '@/app/lib/utils'
import type { UseCalendar } from '@/pages/Calendar/types'

interface UseCalendarGridProps {
    month: number
    year: number
    assignmentsByDate: ReturnType<typeof useCalendarData>['assignmentsByDate']
    eventsByDate: ReturnType<typeof useCalendarData>['eventsByDate']
    noSchoolByDate: ReturnType<typeof useCalendarData>['noSchoolByDate']
}

/**
 * Hook for computing the calendar grid cells.
 * Generates an array of cells representing days and empty slots for a month view.
 */
export const useCalendarGrid = ({
    month,
    year,
    assignmentsByDate,
    eventsByDate,
    noSchoolByDate,
}: UseCalendarGridProps) => {
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
            const noSchool = noSchoolByDate[dateString]

            const dayAssignments = assignmentsByDate[dateString] || []
            const dayEvents = (eventsByDate[dateString] ?? []).toSorted((eventA, eventB) => {
                if (eventA.startTime && eventB.startTime) return eventA.startTime.localeCompare(eventB.startTime)
                if (eventA.startTime) return -1
                if (eventB.startTime) return 1
                return 0
            })

            cells.push({
                type: 'day',
                key: `day-${day}`,
                day,
                dateString,
                isToday,
                noSchool,
                assignments: dayAssignments,
                events: dayEvents
            })
        }

        // Empty end days
        for (let i = 0; i < remainingCells; i++) {
            cells.push({ type: 'empty', key: `empty-end-${i}` })
        }

        return cells
    }, [year, month, assignmentsByDate, eventsByDate, noSchoolByDate])

    return calendarCells
}
