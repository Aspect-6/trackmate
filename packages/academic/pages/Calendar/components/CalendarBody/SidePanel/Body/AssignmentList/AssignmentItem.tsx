import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { CalendarBody } from "@/pages/Calendar/types"
import PriorityBadge from "@/app/components/PriorityBadge"
import { CALENDAR } from "@/app/styles/colors"

const AssignmentItem: React.FC<CalendarBody.SidePanel.Body.AssignmentList.AssignmentItemProps> = ({ assignment, getClassById, onAssignmentClick }) => {
    const { isHovered, hoverProps } = useHover()
    const linkedClass = getClassById(assignment.classId)
    const classColor = linkedClass.color
    const className = linkedClass.name
    const isDone = assignment.status === "Done"

    return (
        <div
            onClick={() => onAssignmentClick(assignment.id)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${isDone ? "opacity-60" : ""}`}
            style={{
                border: `1px solid ${CALENDAR.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classColor}`,
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG
            }}
            {...hoverProps}
        >
            <div className={`font-semibold ${isDone ? "line-through" : ""}`} style={{ color: isDone ? CALENDAR.TEXT_SECONDARY : CALENDAR.TEXT_PRIMARY }}>{assignment.title}</div>
            <div className="text-sm flex items-center justify-between mt-1" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                <span style={{ color: isDone ? CALENDAR.TEXT_SECONDARY : classColor }}>{className}</span>
                <PriorityBadge
                    priority={isDone ? "Done" : assignment.priority}
                    className="px-2 py-0.5"
                />
            </div>
        </div>
    )
}

export default React.memo(AssignmentItem)
