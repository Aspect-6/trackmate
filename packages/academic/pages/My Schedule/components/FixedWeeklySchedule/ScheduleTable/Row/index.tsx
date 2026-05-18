import React from "react"
import type { FixedWeeklySchedule } from "@/pages/My Schedule/types"

const ScheduleTableRow: React.FC<FixedWeeklySchedule.ScheduleTable.Row.Props> = ({ children }) => {
    return <tr>{children}</tr>
}

export default ScheduleTableRow
