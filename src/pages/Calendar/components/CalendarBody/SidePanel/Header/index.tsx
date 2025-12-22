import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'

const Header: React.FC<CalendarBody.SidePanel.Header.Props> = ({ children }) => (
    <div className="flex justify-between items-center mb-6">
        {children}
    </div>
)

export default Header
