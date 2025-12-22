import React from "react"
import { useApp } from "@/app/context/AppContext"
import AssignmentBoard from "@/pages/My Assignments/components/AssignmentBoard"
import AssignmentDragOverlay from "@/pages/My Assignments/components/AssignmentDragOverlay"
import { useAssignmentBoard } from "@/pages/My Assignments/hooks/useAssignmentBoard"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import "./index.css"

const MyAssignments: React.FC = () => {
  const { getClassById } = useApp()

  const {
    columnConfigs,
    sensors,
    collisionDetection,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleDragOver,
    activeAssignmentId,
    dragEnabled,
    isMobile,
    openColumns,
    toggleColumn,
    overId,
  } = useAssignmentBoard()

  return (
    <div className="my-assignments-page flex-1 min-h-0 flex flex-col">
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
      >
        <div className="assignments-column-layout flex-1 min-h-0 flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4 lg:pb-0">
          {columnConfigs.map(({ status, title }) => (
            <AssignmentBoard
              key={status}
              status={status}
              title={title}
              isMobile={isMobile}
              openColumns={openColumns}
              toggleColumn={toggleColumn}
              activeAssignmentId={activeAssignmentId}
              overId={overId}
              dragEnabled={dragEnabled}
            />
          ))}
        </div>

        <DragOverlay>
          {dragEnabled && activeAssignmentId ? (
            <AssignmentDragOverlay
              assignmentId={activeAssignmentId}
              getClassById={getClassById}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default MyAssignments
