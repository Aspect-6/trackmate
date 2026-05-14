import React from "react"
import type { SemesterSchedule } from "@/pages/My Schedule/types"
import { MY_SCHEDULE } from "@/app/styles/colors"

const ScheduleTableRow: React.FC<SemesterSchedule.ScheduleTable.Row.Props> = ({ isLastRow, semester, children }) => {
    return (
        <tr>
            <td
                className="p-3 font-semibold text-sm"
                style={{
                    color: MY_SCHEDULE.TEXT_PRIMARY,
                    borderBottom: !isLastRow ? `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}` : "none",
                    borderRight: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`
                }}
            >
                {semester}
            </td>
            {children}
        </tr>
    )
}

export default ScheduleTableRow
