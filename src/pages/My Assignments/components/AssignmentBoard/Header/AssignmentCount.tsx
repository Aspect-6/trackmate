import React, { useMemo } from "react"
import { useApp } from "@/app/context/AppContext"
import type { AssignmentBoard as AssignmentBoardTypes } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const AssignmentBoardAssignmentCount: React.FC<
  AssignmentBoardTypes.Header.AssignmentCountProps
> = ({ status }) => {
  const { assignments } = useApp()

  const count = useMemo(
    () => assignments.filter((a) => a.status === status).length,
    [assignments, status],
  )

  const getColors = () => {
    switch (status) {
      case "To Do":
        return {
          header: MY_ASSIGNMENTS.HEADER_TEXT_TODO,
          border: MY_ASSIGNMENTS.COUNT_BORDER_TODO,
        }
      case "In Progress":
        return {
          header: MY_ASSIGNMENTS.HEADER_TEXT_INPROGRESS,
          border: MY_ASSIGNMENTS.COUNT_BORDER_INPROGRESS,
        }
      case "Done":
        return {
          header: MY_ASSIGNMENTS.HEADER_TEXT_DONE,
          border: MY_ASSIGNMENTS.COUNT_BORDER_DONE,
        }
      default:
        return {
          header: MY_ASSIGNMENTS.TEXT_PRIMARY,
          border: MY_ASSIGNMENTS.BORDER_LIGHT,
        }
    }
  }

  const { header: headerColor, border: badgeBorderColor } = getColors()

  return (
    <span
      className="text-xs font-bold px-2 py-1 rounded-full border"
      style={{
        backgroundColor: MY_ASSIGNMENTS.ITEM_HOVER_BG,
        color: headerColor,
        borderColor: badgeBorderColor,
      }}
    >
      {count}
    </span>
  )
}

export default AssignmentBoardAssignmentCount
