import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const DayTypeDisplay: React.FC<CalendarBody.SidePanel.Body.DayType.DisplayProps> = ({ dayType }) => {
    if (!dayType) return null

    return (
        <div className="text-center">
            <div className="font-bold text-lg" style={{ color: dayType === 'A' ? CALENDAR.TEXT_A_DAY : CALENDAR.TEXT_B_DAY }}>
                {dayType}-Day
            </div>
        </div>
    )
}

export default DayTypeDisplay
