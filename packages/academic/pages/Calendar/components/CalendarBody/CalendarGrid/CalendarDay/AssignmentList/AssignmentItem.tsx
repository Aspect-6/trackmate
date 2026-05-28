import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { useHover } from "@shared/hooks/ui/useHover"
import { CALENDAR } from "@/app/styles/colors"

const AssignmentItem: React.FC<CalendarBody.Grid.Day.AssignmentList.AssignmentItemProps> = ({ assignment, color, onClick }) => {
    const { isHovered, hoverProps } = useHover()
    if (!color) return null

    const isDone = assignment.status === "Done"
    const isSubtask = assignment.kind === "subtask"

    return (
        <div
            className={`calendar-assignment ${isDone && !isSubtask ? "saturate-70" : ""}`}
            style={{
                backgroundColor: isSubtask ? color.replace(/^hsl\(/, "hsla(").replace(/\)$/, ", 0.55)") : color,
                boxShadow: isSubtask ? `inset 0 0 0 2px ${color}` : "none",
                color: CALENDAR.TEXT_WHITE,
                opacity: isHovered ? (isDone ? 0.5 : 0.85) : (isDone ? 0.6 : 1),
            }}
            onClick={(e) => { e.stopPropagation(); onClick(assignment.id) }}
            {...hoverProps}
        >
            {assignment.title}
        </div>
    )
}

export default AssignmentItem
