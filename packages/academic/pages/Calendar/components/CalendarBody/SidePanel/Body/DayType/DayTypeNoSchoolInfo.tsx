import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { Pencil } from "lucide-react"
import { CALENDAR } from "@/app/styles/colors"

const NoSchoolInfo: React.FC<CalendarBody.SidePanel.Body.DayType.NoSchoolInfoProps> = ({ noSchoolDay }) => {
    if (!noSchoolDay) return null

    return (
        <div className="relative flex items-center justify-center w-full px-2">
            <div className="text-center">
                <div className="font-semibold" style={{ color: CALENDAR.SCHEDULE_HEADING_TEXT }}>No School</div>
                <div className="text-sm" style={{ color: CALENDAR.TEXT_SECONDARY }}>{noSchoolDay.name}</div>
            </div>
            <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="w-4 h-4" style={{ color: CALENDAR.TEXT_SECONDARY }} />
            </div>
        </div>
    )
}

export default NoSchoolInfo
