import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const DateDisplay: React.FC<CalendarBody.SidePanel.Header.DateDisplayProps> = ({ children }) => (
    <h3 className="text-base font-bold" style={{ color: CALENDAR.SIDE_PANEL_TEXT }}>{children}</h3>
)

export default DateDisplay
