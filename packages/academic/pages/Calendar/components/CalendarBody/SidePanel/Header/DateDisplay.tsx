import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const DateDisplay: React.FC<CalendarBody.SidePanel.Header.DateDisplayProps> = ({ children }) => (
    <h3 className="text-sm font-bold truncate" style={{ color: CALENDAR.TEXT_PRIMARY }}>{children}</h3>
)

export default DateDisplay
