import React, { useMemo } from "react"
import { useDroppable } from "@dnd-kit/core"
import { useClasses } from "@/app/hooks/entities/useClasses"
import { useAssignments } from "@/app/hooks/entities/useAssignments"
import type { AssignmentColumn } from "@/pages/My Assignments/types"
import AssignmentColumnBody from "./Body"
import AssignmentColumnHeader from "./AssignmentColumnHeader"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const AssignmentColumn: React.FC<AssignmentColumn.Props> = ({
    status,
    title,
    isMobile,
    isOpen,
    onToggle,
    activeAssignmentId,
    overId,
    dragEnabled,
    searchQuery = "",
    typeFilter = [],
    priorityFilter = [],
}) => {
    const { getClassById } = useClasses()
    const { getAssignmentsByStatus } = useAssignments()

    const isCollapsed = isMobile && !isOpen

    const items = useMemo(() => {
        const query = searchQuery.toLowerCase().trim()
        return getAssignmentsByStatus(status)
            .filter((item) => {
                const className = getClassById(item.classId)?.name.toLowerCase() || ""
                const matchesSearch =
                    !query ||
                    item.title.toLowerCase().includes(query) ||
                    className.includes(query) ||
                    (item.description?.toLowerCase().includes(query) ?? false)
                const matchesType = typeFilter.length === 0 || typeFilter.includes(item.type || "")
                const matchesPriority =
                    priorityFilter.length === 0 || priorityFilter.includes(item.priority)
                return matchesSearch && matchesType && matchesPriority
            })
            .toSorted((a, b) =>
                status === "Done"
                    ? b.dueDate.localeCompare(a.dueDate)
                    : a.dueDate.localeCompare(b.dueDate)
            )
    }, [getAssignmentsByStatus, status, searchQuery, typeFilter, priorityFilter, getClassById])

    const totalCount = getAssignmentsByStatus(status).length

    const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: status })

    return (
        <div
            className={`assignments-column w-full lg:flex-1 rounded-xl shadow-md p-4 flex flex-col ${isMobile ? "" : "h-full min-h-0"}`}
            style={{
                backgroundColor: MY_ASSIGNMENTS.BACKGROUND_PRIMARY,
                border: `1px solid ${MY_ASSIGNMENTS.BORDER_PRIMARY}`,
                paddingBottom: isCollapsed ? 0 : undefined,
            }}
        >
            <AssignmentColumnHeader
                status={status}
                title={title}
                totalCount={totalCount}
                isMobile={isMobile}
                isCollapsed={isCollapsed}
                onToggle={onToggle}
            />

            <div
                className="min-h-0 flex-grow transition-all duration-300 ease-in-out"
                style={{
                    display: "grid",
                    gridTemplateRows: isCollapsed ? "0fr" : "1fr",
                }}
            >
                <div className="overflow-hidden" style={{ maxHeight: isMobile ? "345px" : undefined }}>
                    <AssignmentColumnBody
                        status={status}
                        items={items}
                        droppableRef={setDroppableRef}
                        isOver={isOver}
                        isMobile={isMobile}
                        dragEnabled={dragEnabled}
                        activeAssignmentId={activeAssignmentId}
                        overId={overId}
                    />
                </div>
            </div>
        </div>
    )
}

export default AssignmentColumn