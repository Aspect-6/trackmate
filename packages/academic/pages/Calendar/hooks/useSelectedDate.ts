import { useState, useCallback } from "react"

/**
 * Hook for managing the selected date state in the calendar.
 * Provides a clear function that can be passed to navigation hooks.
 */
export const useSelectedDate = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const clearSelection = useCallback(() => setSelectedDate(null), [])

    return {
        selectedDate,
        setSelectedDate,
        clearSelection
    }
}
