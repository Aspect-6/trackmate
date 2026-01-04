import React from "react"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import type { AssignmentBoard as AssignmentBoardTypes } from "@/pages/My Assignments/types"
import AssignmentItem from "@/pages/My Assignments/components/AssignmentBoard/Body/AssignmentItem"
import DragPlaceholder from "./DragPlaceholder"
import EmptyState from "./EmptyState"

const AssignmentList: React.FC<AssignmentBoardTypes.Body.ListProps> = ({
	items,
	showPlaceholder,
	insertionIndex,
	onAssignmentClick,
	getClassById,
	dragEnabled,
}) => {
	if (items.length === 0) {
		return <EmptyState />
	}

	return (
		<SortableContext
			items={items.map((a) => a.id)}
			strategy={verticalListSortingStrategy}
		>
			{items.map((assignment, index) => {
				const shouldShowBefore = showPlaceholder && insertionIndex === index
				return (
					<React.Fragment key={assignment.id}>
						{shouldShowBefore && <DragPlaceholder />}
						<AssignmentItem
							assignment={assignment}
							onClick={onAssignmentClick}
							getClassById={getClassById}
							dragEnabled={dragEnabled}
						/>
					</React.Fragment>
				)
			})}
			{showPlaceholder && insertionIndex === items.length && (
				<DragPlaceholder />
			)}
		</SortableContext>
	)
}

export default AssignmentList
