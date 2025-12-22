import React, { useMemo } from "react"
import { useDroppable } from "@dnd-kit/core"
import { useApp } from "@/app/context/AppContext"
import type { AssignmentBoard as AssignmentBoardTypes } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"
import AssignmentBoardHeader from "./Header"
import AssignmentBoardTitle from "./Header/Title"
import AssignmentBoardAssignmentCount from "./Header/AssignmentCount"
import AssignmentBoardBody from "./Body"
import AssignmentList from "./Body/List"

const AssignmentBoard: React.FC<AssignmentBoardTypes.Props> = ({
  status,
  title,
  isMobile,
  openColumns,
  toggleColumn,
  activeAssignmentId,
  overId,
  dragEnabled,
}) => {
  // Get global data
  const { assignments, getClassById, openModal } = useApp()

  // Derive local state from props
  const isCollapsed = isMobile ? !openColumns[status] : false
  const activeId = activeAssignmentId

  const itemsInView = useMemo(() => {
    const filtered = assignments.filter((a) => a.status === status)
    filtered.sort((a, b) => {
      if (status === "To Do" || status === "In Progress") {
        return a.dueDate.localeCompare(b.dueDate)
      }
      return b.dueDate.localeCompare(a.dueDate)
    })
    return filtered
  }, [assignments, status])

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: status })

  const isOverColumn =
    overId === status || itemsInView.some((item) => item.id === overId)
  const overIndex = itemsInView.findIndex((item) => item.id === overId)
  const insertionIndex = isOverColumn
    ? overIndex >= 0
      ? overIndex
      : itemsInView.length
    : -1
  const showPlaceholder = dragEnabled && !!activeId && isOverColumn

  const handleAssignmentClick = (id: string) => openModal("edit-assignment", id)

  return (
    <div
      className={`assignments-col w-full lg:flex-1 rounded-xl p-4 flex flex-col border ${isMobile ? "" : "h-full min-h-0"}`}
      style={{
        backgroundColor: MY_ASSIGNMENTS.BOARD_BG,
        borderColor: MY_ASSIGNMENTS.COLUMN_BORDER,
        boxShadow: MY_ASSIGNMENTS.COLUMN_SHADOW,
      }}
      data-collapsed={isMobile && isCollapsed ? "true" : "false"}
      aria-hidden={isMobile && isCollapsed}
    >
      <AssignmentBoardHeader
        status={status}
        isMobile={isMobile}
        openColumns={openColumns}
        toggleColumn={toggleColumn}
      >
        <AssignmentBoardTitle
          status={status}
          isMobile={isMobile}
          openColumns={openColumns}
        >
          {title}
        </AssignmentBoardTitle>
        <AssignmentBoardAssignmentCount status={status} />
      </AssignmentBoardHeader>

      <AssignmentBoardBody
        status={status}
        itemsInView={itemsInView}
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        isOver={dragEnabled && isOver}
        droppableRef={setDroppableRef}
      >
        <AssignmentList
          items={itemsInView}
          showPlaceholder={showPlaceholder}
          insertionIndex={insertionIndex}
          onAssignmentClick={handleAssignmentClick}
          getClassById={getClassById}
          dragEnabled={dragEnabled}
        />
      </AssignmentBoardBody>
    </div>
  )
}

export default AssignmentBoard
