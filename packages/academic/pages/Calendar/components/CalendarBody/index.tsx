import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"

const CalendarBody: React.FC<CalendarBody.Props> = ({ children }) => (
    <div className="calendar-main-container flex flex-grow overflow-hidden relative">
        {children}
    </div>
)

export default CalendarBody
