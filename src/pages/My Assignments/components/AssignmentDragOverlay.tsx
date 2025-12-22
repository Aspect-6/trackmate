import React from "react"
import { useApp } from "@/app/context/AppContext"
import type { AssignmentDragOverlayProps } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"
import AssignmentCardContent from "./AssignmentCardContent"

export const AssignmentDragOverlay: React.FC<AssignmentDragOverlayProps> = ({
  assignmentId,
  getClassById,
}) => {
  const assignment = useApp().assignments.find((a) => a.id === assignmentId)
  const linkedClass = assignment?.classId
    ? getClassById(assignment.classId)
    : undefined

  if (!assignment) return null

  const classColor = linkedClass ? linkedClass.color : MY_ASSIGNMENTS.TEXT_MUTED
  const className = linkedClass ? linkedClass.name : "Unassigned"

  return (
    <div
      className="assignments-item p-4 rounded-lg border border-l-4 bg-[var(--card-bg)] shadow-lg flex gap-3"
      style={
        {
          borderColor: MY_ASSIGNMENTS.BORDER_PRIMARY,
          borderLeftWidth: "4px",
          borderLeftColor: classColor,
          color: MY_ASSIGNMENTS.ITEM_TEXT,
          boxShadow: MY_ASSIGNMENTS.ITEM_SHADOW,
          "--card-bg": MY_ASSIGNMENTS.ITEM_BG,
          "--card-hover-bg": MY_ASSIGNMENTS.ITEM_HOVER_BG,
          pointerEvents: "none",
          opacity: 0.9,
        } as React.CSSProperties
      }
    >
      <AssignmentCardContent
        assignment={assignment}
        classColor={classColor}
        className={className}
        showGrip={true}
      />
    </div>
  )
}

export default AssignmentDragOverlay
