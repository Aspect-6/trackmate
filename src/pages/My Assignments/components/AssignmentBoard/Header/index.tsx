import React from "react"
import type { AssignmentBoard as AssignmentBoardTypes } from "@/pages/My Assignments/types"
import { GLOBAL } from "@/app/styles/colors"

const AssignmentBoardHeader: React.FC<AssignmentBoardTypes.Header.Props> = ({
  status,
  children,
  isMobile,
  openColumns,
  toggleColumn,
}) => {
  const isListHidden = isMobile && !openColumns[status]
  const contentId = `assignments-${status.replace(/\s+/g, "-").toLowerCase()}`

  const handleToggleCollapse = () => toggleColumn(status)

  const headerInteractionProps = isMobile
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick: handleToggleCollapse,
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            handleToggleCollapse()
          }
        },
      }
    : {}

  return (
    <div
      className={`assignment-column-header flex justify-between items-center mb-4 px-2 py-2 border-b ${isMobile ? "cursor-pointer" : ""}`}
      style={{
        borderColor: isListHidden ? "transparent" : GLOBAL.HEADER_DIVIDER,
      }}
      aria-expanded={!isListHidden}
      aria-controls={contentId}
      {...headerInteractionProps}
    >
      {children}
    </div>
  )
}

export default AssignmentBoardHeader
