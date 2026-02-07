import React, { useMemo } from "react"
import { useDroppable } from "@dnd-kit/core"
import { useModal } from "@/app/contexts/ModalContext"
import { useClasses } from "@/app/hooks/entities/useClasses"
import { useAssignments } from "@/app/hooks/entities/useAssignments"
import type { AssignmentBoard } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"
import AssignmentBoardHeader from "./Header"
import AssignmentBoardTitle from "./Header/Title"
import AssignmentBoardAssignmentCount from "./Header/AssignmentCount"
import AssignmentBoardBody from "./Body"
import AssignmentList from "./Body/List"

const AssignmentBoard: React.FC<AssignmentBoard.Props> = ({
	status,
	title,
	isMobile,
	openColumns,
	toggleColumn,
	activeAssignmentId,
	overId,
	dragEnabled,
	searchQuery = "",
	typeFilter = [],
	priorityFilter = []
}) => {
	const { openModal } = useModal()
	const { getClassById } = useClasses()
	const { getAssignmentsByStatus } = useAssignments()

	const isCollapsed = isMobile ? !openColumns[status] : false
	const activeId = activeAssignmentId

	const itemsInView = useMemo(() => {
		const filtered = getAssignmentsByStatus(status)
		const query = searchQuery?.toLowerCase().trim() || ""

		return filtered.filter(item => {
			const className = getClassById(item.classId)?.name.toLowerCase() || ""
			const matchesSearch = !query || (
				item.title.toLowerCase().includes(query) ||
				className.includes(query) ||
				(item.description?.toLowerCase().includes(query) ?? false)
			)

			const matchesType = typeFilter.length === 0 || typeFilter.includes(item.type || "")
			const matchesPriority = priorityFilter.length === 0 || priorityFilter.includes(item.priority)

			return matchesSearch && matchesType && matchesPriority
		}).toSorted((a, b) => {
			if (status === "To Do" || status === "In Progress") {
				return a.dueDate.localeCompare(b.dueDate)
			}
			return b.dueDate.localeCompare(a.dueDate)
		})
	}, [getAssignmentsByStatus, status, searchQuery, typeFilter, priorityFilter, getClassById])

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
			className={`assignments-board w-full lg:flex-1 rounded-xl shadow-md p-4 flex flex-col ${isMobile ? "" : "h-full min-h-0"}`}
			style={{
				backgroundColor: MY_ASSIGNMENTS.BACKGROUND_PRIMARY,
				border: `1px solid ${MY_ASSIGNMENTS.BORDER_PRIMARY}`,
				paddingBottom: (isMobile && isCollapsed) ? 0 : undefined,
			}}
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
