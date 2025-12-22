import React, { useState } from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const CloseButton: React.FC<CalendarBody.SidePanel.Header.CloseButtonProps> = ({ onClick, children }) => {
    const [hovered, setHovered] = useState(false)
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="calendar-side-panel-close transition-colors"
            style={{ color: hovered ? CALENDAR.SIDE_PANEL_CLOSE_ICON_HOVER : CALENDAR.SIDE_PANEL_CLOSE_ICON }}
        >
            {children}
        </button>
    )
}

export default CloseButton
