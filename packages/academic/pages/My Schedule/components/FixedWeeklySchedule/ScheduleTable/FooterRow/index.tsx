import React from "react"
import type { FixedWeeklySchedule } from "@/pages/My Schedule/types"
import { DEFAULT_FIXED_WEEKLY_WEEKDAYS } from "@/app/lib/schedule"
import { MY_SCHEDULE } from "@/app/styles/colors"
import AddRowButton from "../AddRowButton"
import RemoveLastRowButton from "../RemoveLastRowButton"

const FooterRow: React.FC<FixedWeeklySchedule.ScheduleTable.FooterRow.Props> = ({
    onAddRow,
    onRemoveLastRow,
    showRemoveLastRow,
}) => {
    return (
        <tr aria-label="Row tools">
            <td
                colSpan={DEFAULT_FIXED_WEEKLY_WEEKDAYS.length}
                className="px-2 py-1.5"
                style={{
                    borderTop: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                    backgroundColor: MY_SCHEDULE.BACKGROUND_PRIMARY,
                }}
            >
                <div className="flex flex-wrap items-center justify-end gap-2">
                    <AddRowButton onClick={onAddRow} />
                    {showRemoveLastRow ? (
                        <RemoveLastRowButton onClick={onRemoveLastRow} />
                    ) : null}
                </div>
            </td>
        </tr>
    )
}

export default FooterRow
