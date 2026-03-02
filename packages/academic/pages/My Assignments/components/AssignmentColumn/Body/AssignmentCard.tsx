import React, { useState, useEffect } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { useHover } from "@shared/hooks/ui/useHover"
import type { AssignmentType } from "@/app/types"
import type { AssignmentColumn } from "@/pages/My Assignments/types"
import { formatDateRelative, formatTime } from "@shared/lib"
import { GripVertical } from "lucide-react"
import PriorityBadge from "@/app/components/PriorityBadge"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const AssignmentCard: React.FC<AssignmentColumn.Body.AssignmentCardProps> = ({
    assignment,
    classInfo,
    dragEnabled,
    isTablet,
    onClick,
}) => {
    const [isLeftClicking, setIsLeftClicking] = useState(false)
    const { isHovered, hoverProps } = useHover()
    const {
        attributes,
        listeners,
        setNodeRef,
        isDragging,
    } = useSortable({ id: assignment.id, disabled: !dragEnabled })

    useEffect(() => {
        if (!isLeftClicking) return
        const handleGlobalMouseUp = () => setIsLeftClicking(false)
        window.addEventListener("mouseup", handleGlobalMouseUp)
        return () => window.removeEventListener("mouseup", handleGlobalMouseUp)
    }, [isLeftClicking])

    const examTypes: AssignmentType[] = ["Quiz", "Test", "Midterm", "Final Exam"]
    const dateLabel = examTypes.includes(assignment.type) ? "On" : "Due"
    const showTime = assignment.dueTime && assignment.dueTime !== "23:59"

    const cardDragHandlers = dragEnabled && !isTablet ? listeners : undefined
    const gripDragHandlers = dragEnabled ? listeners : undefined

    return (
        <div
            ref={setNodeRef}
            className={`p-4 rounded-lg shadow-md overflow-hidden transition-all flex gap-3 ${dragEnabled && !isTablet ? "cursor-grab active:cursor-grabbing select-none" : "cursor-pointer"}`}
            style={{
                border: `1px solid ${MY_ASSIGNMENTS.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classInfo.color}`,
                backgroundColor: isHovered
                    ? MY_ASSIGNMENTS.BACKGROUND_SECONDARY
                    : MY_ASSIGNMENTS.BACKGROUND_PRIMARY,
                touchAction: dragEnabled && !isTablet ? "none" : "auto",
                opacity: isDragging ? 0.4 : 1,
                transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onClick={() => onClick(assignment.id)}
            {...hoverProps}
            {...cardDragHandlers}
            onMouseDown={(e) => {
                if (e.button === 0) setIsLeftClicking(true)
                cardDragHandlers?.onMouseDown?.(e)
            }}
            {...attributes}
        >
            {dragEnabled && (
                <div
                    className="flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0"
                    style={{
                        color: MY_ASSIGNMENTS.TEXT_SECONDARY,
                        touchAction: "none",
                    }}
                    {...gripDragHandlers}
                >
                    <GripVertical size={16} />
                </div>
            )}
            <div className={`flex-grow ${isLeftClicking ? "select-none" : "select-text"}`}>
                <p
                    className="font-semibold text-sm mb-1"
                    style={{ color: MY_ASSIGNMENTS.TEXT_PRIMARY }}
                >
                    {assignment.title}
                </p>
                <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: classInfo.color }}
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
