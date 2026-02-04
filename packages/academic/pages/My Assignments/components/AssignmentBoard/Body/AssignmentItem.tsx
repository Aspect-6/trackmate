import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { AssignmentBoard as AssignmentBoardTypes } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"
import AssignmentCardContent from "@/pages/My Assignments/components/AssignmentCardContent"

const AssignmentItem: React.FC<AssignmentBoardTypes.Body.AssignmentItemProps> = ({
	assignment,
	onClick,
	getClassById,
	dragEnabled
}) => {
	const { isHovered, hoverProps } = useHover()
	const { id, classId } = assignment
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id, disabled: !dragEnabled })

	const linkedClass = getClassById(classId)
	if (!linkedClass) return null

	const classColor = linkedClass.color
	const className = linkedClass.name

	const transformTransition = !isDragging && transition ? transition : null
	const baseHoverTransition =
		"background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)"
	const combinedTransition = [transformTransition, baseHoverTransition]
		.filter(Boolean)
		.join(", ")

	const dragStyle = {
		transform: CSS.Transform.toString(transform),
		transition: combinedTransition,
		willChange: "transform",
	}

	const dragHandleProps = dragEnabled ? { ...attributes, ...listeners } : {}
	const cursorClass = dragEnabled
		? "cursor-grab active:cursor-grabbing"
		: "cursor-default"
	const contentSpacingClass = dragEnabled ? "flex gap-3" : "flex"

	return (
		<div
			ref={setNodeRef}
			data-assignment-item
			style={{
				...dragStyle,
				border: `1px solid ${MY_ASSIGNMENTS.BORDER_PRIMARY}`,
				borderLeft: `4px solid ${classColor}`,
				backgroundColor: isHovered ? MY_ASSIGNMENTS.BACKGROUND_SECONDARY : MY_ASSIGNMENTS.BACKGROUND_PRIMARY,
				touchAction: dragEnabled ? "none" : "auto"
			}}
			{...dragHandleProps}
			onClick={() => onClick(id)}
			className={`p-4 rounded-lg shadow-md overflow-hidden ${cursorClass} transition-colors ${contentSpacingClass} ${isDragging ? "opacity-40" : ""}`}
			{...hoverProps}
		>
			<AssignmentCardContent
				assignment={assignment}
				classColor={classColor}
				className={className}
				showGrip={dragEnabled}
			/>
		</div>
	)
}

export default AssignmentItem
