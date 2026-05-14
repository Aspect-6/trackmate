import React from "react"
import type { SemesterSchedule } from "@/pages/My Schedule/types"
import { MY_SCHEDULE } from "@/app/styles/colors"

const SemesterSchedule: React.FC<SemesterSchedule.Props> = ({ title, children }) => {
    return (
        <div className="mb-8 last:mb-0">
            {title && (
                <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: MY_SCHEDULE.TEXT_PRIMARY }}
                >
                    {title}
                </h3>
            )}
            {children}
        </div>
    )
}

export default SemesterSchedule

export { default as ScheduleTable } from "./ScheduleTable"
export { default as ScheduleTableRow } from "./ScheduleTable/Row"
// Cells are visually identical for both schedule formats — reuse the existing
// implementations rather than duplicating them.
export { default as EmptyCell } from "../AlternatingDaysSchedule/ScheduleTable/Row/EmptyCell"
export { default as FilledCell } from "../AlternatingDaysSchedule/ScheduleTable/Row/FilledCell"
