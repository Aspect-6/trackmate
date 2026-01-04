import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const NoSchoolInfo: React.FC<CalendarBody.SidePanel.Body.DayType.NoSchoolInfoProps> = ({ noSchoolDay }) => {
    if (!noSchoolDay) return null

    return (
        <div className="text-center">
            <div className="font-semibold" style={{ color: CALENDAR.SCHEDULE_HEADING_TEXT }}>No School</div>
            <div className="text-sm" style={{ color: CALENDAR.TEXT_SECONDARY }}>{noSchoolDay.name}</div>
        </div>
    )
}

export default NoSchoolInfo
