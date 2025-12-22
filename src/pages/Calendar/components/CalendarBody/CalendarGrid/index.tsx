import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'

const CalendarGrid: React.FC<CalendarBody.Grid.Props> = ({ children }) => {
    return (
        <div id="calendar-grid-container" className="calendar-container flex-grow overflow-hidden transition-all duration-300">
            <div id="calendar-grid" className="h-full">
                {children}
            </div>
        </div>
    )
}

export default CalendarGrid

export { default as CalendarGridDayHeader } from './CalendarGridDayHeader'
export { default as CalendarGridEmptyDay } from './CalendarGridEmptyDay'
export { default as CalendarDay } from './CalendarDay'
