import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { getTextColorForBackground } from "@/app/lib/utils"
import { useHover } from "@shared/hooks/ui/useHover"

const AssignmentItem: React.FC<CalendarBody.Grid.Day.AssignmentList.AssignmentItemProps> = ({ assignment, color, onClick }) => {
    const { isHovered, hoverProps } = useHover()
    const textColor = getTextColorForBackground(color)

    const isDone = assignment.status === "Done"

    return (
        <div
            className={`calendar-assignment ${isDone ? "saturate-70" : ""}`}
            style={{
                backgroundColor: color,
                color: textColor,
                opacity: isHovered ? (isDone ? 0.5 : 0.85) : (isDone ? 0.6 : 1)
            }}
            onClick={(e) => { e.stopPropagation(); onClick(assignment.id) }}
            {...hoverProps}
        >
            {assignment.title}
        </div>
    )
}

export default AssignmentItem
