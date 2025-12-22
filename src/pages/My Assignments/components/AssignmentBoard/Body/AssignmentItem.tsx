import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { AssignmentBoard as AssignmentBoardTypes } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"
import AssignmentCardContent from "@/pages/My Assignments/components/AssignmentCardContent"

const AssignmentItem: React.FC<
  AssignmentBoardTypes.Body.AssignmentItemProps
> = ({ assignment, onClick, getClassById, dragEnabled }) => {
  const { id, classId } = assignment
  const linkedClass = getClassById(classId)
  const classColor = linkedClass ? linkedClass.color : MY_ASSIGNMENTS.TEXT_MUTED
  const className = linkedClass ? linkedClass.name : "Unassigned"

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !dragEnabled })

  const transformTransition = !isDragging && transition ? transition : null
  const baseHoverTransition =
    "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)"
  const combinedTransition = [transformTransition, baseHoverTransition]
    .filter(Boolean)
    .join(", ")

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition: combinedTransition,
    willChange: "transform",
  }

  const dragHandleProps = dragEnabled ? { ...attributes, ...listeners } : {}
  const cursorClass = dragEnabled
    ? "cursor-grab active:cursor-grabbing"
    : "cursor-default"
  const contentSpacingClass = dragEnabled ? "flex gap-3" : "flex"

  return (
    <div
      ref={setNodeRef}
      style={
        {
          ...dragStyle,
          borderColor: MY_ASSIGNMENTS.BORDER_PRIMARY,
          borderLeftWidth: "4px",
          borderLeftColor: classColor,
          color: MY_ASSIGNMENTS.ITEM_TEXT,
          boxShadow: MY_ASSIGNMENTS.ITEM_SHADOW,
          "--card-bg": MY_ASSIGNMENTS.ITEM_BG,
          "--card-hover-bg": MY_ASSIGNMENTS.ITEM_HOVER_BG,
          touchAction: dragEnabled ? "none" : "auto",
        } as React.CSSProperties
      }
      {...dragHandleProps}
      onClick={() => onClick(id)}
      className={`assignments-item p-4 rounded-lg border border-l-4 ${cursorClass} bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-colors ${contentSpacingClass} ${isDragging ? "opacity-40" : ""}`}
    >
      <AssignmentCardContent
        assignment={assignment}
        classColor={classColor}
        className={className}
        showGrip={dragEnabled}
      />
    </div>
  )
}

export default AssignmentItem
