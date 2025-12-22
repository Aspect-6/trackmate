import React, { useState } from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const CalendarDayContainer: React.FC<CalendarBody.Grid.Day.ContainerProps> = ({ year, month, day, isToday, noSchool, onSelectDate, children }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            onClick={() => onSelectDate(new Date(year, month, day))}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="border-r border-b p-2 overflow-y-auto relative cursor-pointer transition-colors"
            style={{
                borderColor: CALENDAR.GRID_BORDER,
                backgroundColor: isHovered ? CALENDAR.DAY_BG_HOVER : (isToday ? CALENDAR.TODAY_BG : (noSchool ? CALENDAR.NO_SCHOOL_BG : undefined)),
                backgroundImage: noSchool ? CALENDAR.NO_SCHOOL_PATTERN : undefined,
                boxShadow: isToday ? `inset 0 0 0 2px ${CALENDAR.TODAY_BORDER}` : undefined
            }}
        >
            {children}
        </div>
    )
}

export default React.memo(CalendarDayContainer)
