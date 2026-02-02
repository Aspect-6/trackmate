import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { getTextColorForBackground } from "@/app/lib/utils"

const AssignmentItem: React.FC<CalendarBody.Grid.Day.AssignmentList.AssignmentItemProps> = ({ assignment, color, onClick }) => {
    const textColor = getTextColorForBackground(color)
    return (
        <div
            onClick={(e) => { e.stopPropagation(); onClick(assignment.id) }}
            className="calendar-assignment"
            style={{ backgroundColor: color, color: textColor }}
        >
            {assignment.title}
        </div>
    )
}

export default AssignmentItem
