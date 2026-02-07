import React, { useState } from "react"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { useMobileDetection } from "@/pages/My Assignments/hooks/useMobileDetection"
import { useColumnVisibility } from "@/pages/My Assignments/hooks/useColumnVisibility"
import { useAssignmentDrag } from "@/pages/My Assignments/hooks/useAssignmentDrag"
import ActionBar from "@/pages/My Assignments/components/ActionBar"
import AssignmentColumn from "@/pages/My Assignments/components/AssignmentColumn"
import AssignmentDragOverlay from "@/pages/My Assignments/components/AssignmentDragOverlay"
import type { Status } from "@/app/types"
import "./index.css"

interface ColumnConfig {
	status: Status
	title: string
}

const COLUMN_CONFIGS: ColumnConfig[] = [
	{ status: "To Do", title: "Upcoming" },
	{ status: "In Progress", title: "In Progress" },
	{ status: "Done", title: "Done" },
]

const MyAssignments: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>("")
	const [typeFilter, setTypeFilter] = useState<string[]>([])
	const [priorityFilter, setPriorityFilter] = useState<string[]>([])

	const { isMobile } = useMobileDetection()
	const { openColumns, toggleColumn } = useColumnVisibility(isMobile)

	const dragEnabled = !isMobile
	const {
		sensors,
		collisionDetection,
		handleDragStart,
		handleDragEnd,
		handleDragCancel,
		handleDragOver,
		activeAssignmentId,
		overId,
	} = useAssignmentDrag(dragEnabled)

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
					{COLUMN_CONFIGS.map(({ status, title }) => (
						<AssignmentColumn
							key={status}
							status={status}
							title={title}
							isMobile={isMobile}
							isOpen={openColumns[status]}
							onToggle={() => toggleColumn(status)}
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
						<AssignmentDragOverlay assignmentId={activeAssignmentId} />
					) : null}
				</DragOverlay>
			</DndContext>
		</div>
	)
}

export default MyAssignments

