import React, { useState } from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const DayType: React.FC<CalendarBody.SidePanel.Body.DayType.Props> = ({ noSchoolDay, dayType, onNoSchoolClick, children }) => {
    const [isHovered, setIsHovered] = useState(false)
    if (!noSchoolDay && !dayType) return null

    const isInteractive = Boolean(noSchoolDay && onNoSchoolClick)

    return (
        <div
            id="day-type-info"
            className={`mb-4 p-3 rounded-lg${isInteractive ? ' calendar-side-panel-item cursor-pointer transition-colors' : ''}`}
            style={{ backgroundColor: isInteractive && isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG }}
            onClick={() => isInteractive && onNoSchoolClick!(noSchoolDay!.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    )
}

export default DayType
