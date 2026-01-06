import { useState } from 'react'
import { useCalendarNavigation } from './useCalendarNavigation'
import { useCalendarData } from './useCalendarData'
import { useCalendarGrid } from './useCalendarGrid'
import { useSidePanel } from './useSidePanel'

export const useCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const {
        currentDate,
        changeMonth,
        month,
        year,
        period
    } = useCalendarNavigation(() => setSelectedDate(null))

    const {
        assignmentsByDate,
        eventsByDate,
        noSchoolByDate
    } = useCalendarData()

    const calendarCells = useCalendarGrid({
        month,
        year,
        assignmentsByDate,
        eventsByDate,
        noSchoolByDate,
    })

    const sidePanelData = useSidePanel({ selectedDate })

    return {
        currentDate,
        selectedDate,
        setSelectedDate,
        changeMonth,
        sidePanelData,
        calendarCells,
        period,
        month,
        year
    }
}
