import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const CalendarDayNumber: React.FC<CalendarBody.Grid.Day.NumberProps> = ({ day, noSchool, isToday }) => (
    <span
        className="font-bold mb-1 inline-flex w-6.5 h-6.5 items-center justify-center rounded-full"
        style={{
            color: noSchool
                ? CALENDAR.TEXT_MUTED
                : isToday 
                    ? CALENDAR.TEXT_WHITE
                    : CALENDAR.TEXT_SECONDARY,
            backgroundColor: isToday ? CALENDAR.ADDITEM_BUTTON_BG : undefined
        }}
    >
        {day}
    </span>
)

export default React.memo(CalendarDayNumber)
