import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'

const CalendarSidePanelBody: React.FC<CalendarBody.SidePanel.Body.Props> = ({ children }) => (
    <div className="space-y-6">
        {children}
    </div>
)

export default CalendarSidePanelBody
