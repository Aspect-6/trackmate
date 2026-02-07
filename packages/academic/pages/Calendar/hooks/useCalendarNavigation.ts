import { useState, useCallback } from "react"
import { formatDate, dateToLocalISOString } from "@shared/lib"

/**
 * Hook for managing calendar navigation state.
 * Handles the current viewing month/year and navigation between months.
 */
export const useCalendarNavigation = (onMonthChange?: () => void) => {
    const [currentDate, setCurrentDate] = useState(new Date())

    const changeMonth = useCallback((offset: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(newDate.getMonth() + offset)
            return newDate
        })
        onMonthChange?.()
    }, [onMonthChange])

    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const period = formatDate("period", dateToLocalISOString(currentDate))

    const jumpToDate = useCallback((date: Date) => {
        setCurrentDate(date)
        onMonthChange?.()
    }, [onMonthChange])

    return {
        currentDate,
        changeMonth,
        jumpToDate,
        month,
        year,
        period,
    }
}
