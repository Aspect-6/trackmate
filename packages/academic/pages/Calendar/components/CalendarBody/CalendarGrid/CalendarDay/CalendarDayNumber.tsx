import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const CalendarDayNumber: React.FC<CalendarBody.Grid.Day.NumberProps> = ({ day, noSchool }) => (
    <span className="font-bold block mb-1" style={{ color: noSchool ? CALENDAR.TEXT_MUTED : CALENDAR.TEXT_SECONDARY }}>{day}</span>
)

export default React.memo(CalendarDayNumber)
