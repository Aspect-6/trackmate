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
    const isSubtask = assignment.kind === "subtask"
    const parentTitle = isSubtask ? assignment.parentTitle : undefined

    return (
        <div
            id={`assignment-${assignment.id}`}
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
            <div className="text-sm flex items-stretch justify-between mt-1 gap-3" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                <div className="min-w-0 flex-1 flex flex-col">
                    <div style={{ color: classColor }}>{className}</div>
                    {parentTitle ? (
                        <div className="text-xs mt-1 font-medium whitespace-normal break-words" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                            {parentTitle}
                        </div>
                    ) : null}
                </div>
                {(isDone || !isSubtask) && (
                    <div className="flex flex-col justify-end">
                        <PriorityBadge
                            priority={isDone ? "Done" : (assignment.kind === "parent" ? assignment.priority : "Low")}
                            className="px-2 py-0.5"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default React.memo(AssignmentItem)
