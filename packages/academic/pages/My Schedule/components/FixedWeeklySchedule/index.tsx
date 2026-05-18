import React from "react"
import type { FixedWeeklySchedule } from "@/pages/My Schedule/types"
import { MY_SCHEDULE } from "@/app/styles/colors"

const FixedWeeklySchedule: React.FC<FixedWeeklySchedule.Props> = ({ title, children }) => {
    return (
        <div className="mb-8 last:mb-0">
            <h3
                className="text-lg font-semibold mb-4"
                style={{ color: MY_SCHEDULE.TEXT_PRIMARY }}
            >
                {title}
            </h3>
            {children}
        </div>
    )
}

export default FixedWeeklySchedule

export { default as ScheduleTable } from "./ScheduleTable"
export { default as ScheduleTableRow } from "./ScheduleTable/Row"
export { default as FooterRow } from "./ScheduleTable/FooterRow"
export { default as AddRowButton } from "./ScheduleTable/AddRowButton"
export { default as RemoveLastRowButton } from "./ScheduleTable/RemoveLastRowButton"
export { default as EmptyCell } from "../AlternatingDaysSchedule/ScheduleTable/Row/EmptyCell"
export { default as FilledCell } from "../AlternatingDaysSchedule/ScheduleTable/Row/FilledCell"
