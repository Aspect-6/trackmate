import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { Pencil } from "lucide-react"
import { CALENDAR } from "@/app/styles/colors"

const DayTypeDisplay: React.FC<CalendarBody.SidePanel.Body.DayType.DisplayProps> = ({ dayType }) => {
    if (!dayType) return null

    return (
        <div className="relative flex items-center justify-center w-full px-2">
            <div className="text-center">
                <div className="font-bold text-lg" style={{ color: dayType === "A" ? CALENDAR.TEXT_A_DAY : CALENDAR.TEXT_B_DAY }}>
                    {dayType}-Day
                </div>
            </div>
            <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="w-4 h-4" style={{ color: CALENDAR.TEXT_SECONDARY }} />
            </div>
        </div>
    )
}

export default DayTypeDisplay
