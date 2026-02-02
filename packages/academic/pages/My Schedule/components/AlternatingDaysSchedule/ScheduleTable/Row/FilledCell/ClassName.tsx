import React from "react"
import type { AlternatingDaysSchedule } from "@/pages/My Schedule/types"

const ClassName: React.FC<AlternatingDaysSchedule.ScheduleTable.Row.FilledCell.ClassNameProps> = ({ name }) => {
    return (
        <span className="text-sm font-medium text-white truncate">
            {name}
        </span>
    )
}

export default ClassName
