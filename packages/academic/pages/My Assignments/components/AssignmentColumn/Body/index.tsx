import React from "react"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useModal } from "@/app/contexts/ModalContext"
import { useClasses } from "@/app/hooks/entities/useClasses"
import { useAssignments } from "@/app/hooks/entities/useAssignments"
import type { AssignmentColumn } from "@/pages/My Assignments/types"
import AssignmentCard from "./AssignmentCard"
import DragPlaceholder from "./DragPlaceholder"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const AssignmentColumnBody: React.FC<AssignmentColumn.Body.Props> = ({
    status,
    items,
    droppableRef,
    isOver,
    isMobile,
    isTablet,
    dragEnabled,
    activeAssignmentId,
    overId,
}) => {
    const { openModal } = useModal()
    const { getClassById } = useClasses()
    const { getAssignmentById } = useAssignments()

    const activeAssignment = activeAssignmentId ? getAssignmentById(activeAssignmentId) : null
    const isOverColumn = overId === status || items.some((item) => item.id === overId)
    const showPlaceholder = dragEnabled && !!activeAssignmentId && isOverColumn && activeAssignment?.status !== status

    let insertionIndex = -1
    if (showPlaceholder && activeAssignment) {
        if (activeAssignment.status === status) {
            insertionIndex = items.findIndex((item) => item.id === activeAssignment.id)
            if (insertionIndex === -1) insertionIndex = items.length
        } else {
            const index = items.findIndex((item) => {
                if (status === "Done") {
                    return activeAssignment.dueDate.localeCompare(item.dueDate) > 0
                } else {
                    return activeAssignment.dueDate.localeCompare(item.dueDate) < 0
                }
            })
            insertionIndex = index >= 0 ? index : items.length
        }
    }

    const handleClick = (id: string) => openModal("edit-assignment", id)

    return (
        <div
            ref={droppableRef}
            className="min-h-0 flex-1 h-full space-y-3 overflow-y-auto custom-scrollbar"
            style={{
                backgroundColor: dragEnabled && isOver ? MY_ASSIGNMENTS.BACKGROUND_BLACK_05 : undefined,
                minHeight: items.length === 0 ? "60px" : undefined,
                paddingBottom: isMobile && items.length > 0 ? "12px" : undefined,
                overscrollBehavior: "contain",
            }}
        >
            {items.length === 0 ? (
                <p
                    className="m-0 py-3 text-sm italic text-center"
                    style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
                >
                    No assignments here.
                </p>
            ) : (
                <SortableContext items={items.map((a) => a.id)} strategy={verticalListSortingStrategy}>
                    {items.map((assignment, index) => {
                        const classInfo = getClassById(assignment.classId)
                        if (!classInfo) return null
                        return (
                            <React.Fragment key={assignment.id}>
                                {showPlaceholder && insertionIndex === index && <DragPlaceholder />}
                                <AssignmentCard
                                    assignment={assignment}
                                    classInfo={classInfo}
                                    dragEnabled={dragEnabled}
                                    isTablet={isTablet}
                                    onClick={handleClick}
                                />
                            </React.Fragment>
                        )
                    })}
                    {showPlaceholder && insertionIndex === items.length && <DragPlaceholder />}
                </SortableContext>
            )}
        </div>
    )
}

export default AssignmentColumnBody
