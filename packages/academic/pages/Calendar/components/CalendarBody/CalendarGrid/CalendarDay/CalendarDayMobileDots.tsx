import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"

const CalendarDayMobileDots: React.FC<CalendarBody.Grid.Day.MobileDotsProps> = ({ dots }) => {
    if (!dots || dots.length === 0) return null
    return (
        <div className="flex flex-wrap gap-1 mb-1 md:hidden">
            {dots.map(dot => (
                <span key={dot.id} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dot.color }} />
            ))}
        </div>
    )
}

export default React.memo(CalendarDayMobileDots)
