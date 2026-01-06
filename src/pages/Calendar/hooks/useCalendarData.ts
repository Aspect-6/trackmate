import { useMemo } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { Assignment, Event, NoSchoolPeriod } from '@/app/types'
import { dateToLocalISOString, parseDateLocal } from '@/app/lib/utils'

/**
 * Hook for indexing calendar data by date.
 * Creates lookup maps for assignments, events, and no-school periods.
 */
export const useCalendarData = () => {
    const { assignments, events, noSchool: noSchoolPeriods } = useApp()

    const assignmentsByDate = useMemo(() =>
        assignments.reduce<Record<string, Assignment[]>>((acc, assignment) => {
            if (assignment.dueDate) {
                if (!acc[assignment.dueDate]) acc[assignment.dueDate] = []
                acc[assignment.dueDate]!.push(assignment)
            }
            return acc
        }, {}),
    [assignments])

    const eventsByDate = useMemo(() =>
        events.reduce<Record<string, Event[]>>((acc, event) => {
            if (event.date) {
                if (!acc[event.date]) acc[event.date] = []
                acc[event.date]!.push(event)
            }
            return acc
        }, {}),
    [events])

    const noSchoolByDate = useMemo(() =>
        noSchoolPeriods.reduce<Record<string, NoSchoolPeriod>>((acc, noSchoolPeriod) => {
            const start = parseDateLocal(noSchoolPeriod.startDate)
            const end = parseDateLocal(noSchoolPeriod.endDate)
            for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                const dateStr = dateToLocalISOString(date)
                acc[dateStr] = noSchoolPeriod
            }
            return acc
        }, {}),
    [noSchoolPeriods])

    return {
        assignments,
        events,
        noSchool: noSchoolPeriods,
        assignmentsByDate,
        eventsByDate,
        noSchoolByDate,
    }
}
