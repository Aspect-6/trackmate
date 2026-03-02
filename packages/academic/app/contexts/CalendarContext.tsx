import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"

interface CalendarContextType {
    selectedDateString: string | null
    setSelectedDateString: (date: string | null) => void
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined)

interface CalendarProviderProps {
    children: ReactNode
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
    const [selectedDateString, setSelectedDateStringState] = useState<string | null>(null)

    const setSelectedDateString = useCallback((date: string | null): void => {
        setSelectedDateStringState(date)
    }, [])

    return (
        <CalendarContext.Provider value={{ selectedDateString, setSelectedDateString }}>
            {children}
        </CalendarContext.Provider>
    )
}

export const useCalendarContext = (): CalendarContextType => {
    const context = useContext(CalendarContext)
    if (!context) {
        throw new Error("useCalendarContext must be used within a CalendarProvider")
    }
    return context
}
