import React, { useState } from "react"
import { useClasses } from "@/app/hooks/entities/useClasses"
import AssignmentBoard from "@/pages/My Assignments/components/AssignmentBoard"
import ActionBar from "@/pages/My Assignments/components/ActionBar"
import AssignmentDragOverlay from "@/pages/My Assignments/components/AssignmentDragOverlay"
import { useAssignmentBoard } from "@/pages/My Assignments/hooks/useAssignmentBoard"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import "./index.css"

const MyAssignments: React.FC = () => {
	const { getClassById } = useClasses()

	const [searchQuery, setSearchQuery] = useState("")
	const [typeFilter, setTypeFilter] = useState<string[]>([])
	const [priorityFilter, setPriorityFilter] = useState<string[]>([])

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
		<div className="flex-1 min-h-0 flex flex-col">
			<ActionBar
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				typeFilter={typeFilter}
				onTypeFilterChange={setTypeFilter}
				priorityFilter={priorityFilter}
				onPriorityFilterChange={setPriorityFilter}
			/>
			<DndContext
				sensors={sensors}
				collisionDetection={collisionDetection}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
				onDragOver={handleDragOver}
			>
				<div className="assignments-column-layout flex-1 min-h-0 flex flex-col lg:flex-row gap-4 pb-4 lg:pb-0">
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
							searchQuery={searchQuery}
							typeFilter={typeFilter}
							priorityFilter={priorityFilter}
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
