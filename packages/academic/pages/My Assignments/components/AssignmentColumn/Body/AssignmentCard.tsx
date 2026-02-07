import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useHover } from "@shared/hooks/ui/useHover"
import type { AssignmentColumn } from "@/pages/My Assignments/types"
import { formatDateRelative, formatTime } from "@shared/lib"
import { GripVertical } from "lucide-react"
import PriorityBadge from "@/app/components/PriorityBadge"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const AssignmentCard: React.FC<AssignmentColumn.Body.AssignmentCardProps> = ({
    assignment,
    classInfo,
    dragEnabled,
    onClick,
}) => {
    const { isHovered, hoverProps } = useHover()
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: assignment.id, disabled: !dragEnabled })

    const dateLabel = assignment.type === "Test" ? "On" : "Due"
    const showTime = assignment.dueTime && assignment.dueTime !== "23:59"

    const dragStyle = {
        transform: CSS.Transform.toString(transform),
        transition: [
            !isDragging && transition,
            "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            "box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        ]
            .filter(Boolean)
            .join(", "),
        willChange: "transform" as const,
    }

    return (
        <div
            ref={setNodeRef}
            className={`p-4 rounded-lg shadow-md overflow-hidden transition-colors ${dragEnabled ? "flex gap-3 cursor-grab active:cursor-grabbing" : "flex cursor-default"}`}
            style={{
                ...dragStyle,
                border: `1px solid ${MY_ASSIGNMENTS.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classInfo.color}`,
                backgroundColor: isHovered
                    ? MY_ASSIGNMENTS.BACKGROUND_SECONDARY
                    : MY_ASSIGNMENTS.BACKGROUND_PRIMARY,
                touchAction: dragEnabled ? "none" : "auto",
                opacity: isDragging ? 0.4 : 1,
            }}
            onClick={() => onClick(assignment.id)}
            {...(dragEnabled ? { ...attributes, ...listeners } : {})}
            {...hoverProps}
        >
            {dragEnabled && (
                <div
                    className="flex items-center justify-center"
                    style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
                >
                    <GripVertical size={16} />
                </div>
            )}
            <div className="flex-grow">
                <p
                    className="font-semibold text-sm mb-1"
                    style={{ color: MY_ASSIGNMENTS.TEXT_PRIMARY }}
                >
                    {assignment.title}
                </p>
                <p
                    className="text-xs mb-2"
                    style={{ color: classInfo.color, fontWeight: 600 }}
                >
                    {classInfo.name}
                </p>
                <div className="flex justify-between items-center">
                    <span
                        className="text-xs font-medium"
                        style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
                    >
                        {dateLabel}: {formatDateRelative("short", assignment.dueDate)}
                        {showTime && ` at ${formatTime(assignment.dueTime)}`}
                    </span>
                    <PriorityBadge priority={assignment.priority} className="px-2 py-0.5" />
                </div>
            </div>
        </div>
    )
}

export default AssignmentCard
