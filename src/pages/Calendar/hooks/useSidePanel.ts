import { useMemo } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { useCalendarData } from './useCalendarData'
import { dateToLocalISOString, formatDate } from '@/app/lib/utils'

interface UseSidePanelProps {
    selectedDate: Date | null
}

/**
 * Hook for computing the side panel data for a selected calendar day.
 * Returns null if no date is selected.
 */
export const useSidePanel = ({ selectedDate }: UseSidePanelProps) => {
    const { getDayTypeForDate } = useApp()
    const { assignments, events, noSchool } = useCalendarData()

    const sidePanelData = useMemo(() => {
        if (!selectedDate) return null

        const dateString = dateToLocalISOString(selectedDate)
        const noSchoolDay = noSchool.find(ns => dateString >= ns.startDate && dateString <= ns.endDate) || null
        const dayType = getDayTypeForDate ? getDayTypeForDate(dateString) : null
        // TODO: Classes now stored per-term - need to determine active term to show classes
        const dayClasses: (string | null)[] = []
        const dueAssignments = assignments.filter(a => a.dueDate === dateString)
        const dayEvents = events.filter(e => e.date === dateString).sort((eventA, eventB) => {
            if (eventA.startTime && eventB.startTime) return eventA.startTime.localeCompare(eventB.startTime)
            if (eventA.startTime) return -1
            if (eventB.startTime) return 1
            return 0
        })

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
    }, [selectedDate, assignments, events, noSchool, getDayTypeForDate])

    return sidePanelData
}
