import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const CalendarGrid: React.FC<CalendarBody.Grid.Props> = ({ children }) => {
    return (
        <div id="calendar-grid-container" className="h-full flex flex-col flex-grow overflow-hidden transition-all duration-300">
            <div
                id="calendar-grid"
                className="grid h-full"
                style={{
                    borderLeft: `1px solid ${CALENDAR.BORDER_PRIMARY}`,
                    borderTop: `1px solid ${CALENDAR.BORDER_PRIMARY}`,
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default CalendarGrid

export { default as CalendarGridDayHeader } from './CalendarGridDayHeader'
export { default as CalendarGridEmptyDay } from './CalendarGridEmptyDay'
export { default as CalendarDay } from './CalendarDay'
