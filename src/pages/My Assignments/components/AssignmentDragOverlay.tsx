import React from "react"
import { useApp } from "@/app/contexts/AppContext"
import type { AssignmentDragOverlayProps } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"
import AssignmentCardContent from "./AssignmentCardContent"

export const AssignmentDragOverlay: React.FC<AssignmentDragOverlayProps> = ({
	assignmentId,
	getClassById,
}) => {
	const assignment = useApp().assignments.find((a) => a.id === assignmentId)!

	const linkedClass = getClassById(assignment.classId)
	const classColor = linkedClass.color
	const className = linkedClass.name

	return (
		<div
			className="p-4 rounded-lg shadow-md overflow-hidden flex gap-3 cursor-grabbing"
			style={{
				backgroundColor: MY_ASSIGNMENTS.BACKGROUND_PRIMARY,
				border: `1px solid ${MY_ASSIGNMENTS.BORDER_PRIMARY}`,
				borderLeft: `4px solid ${classColor}`,
				pointerEvents: "none",
				opacity: 0.9,
			}}
		>
			<AssignmentCardContent
				assignment={assignment}
				classColor={classColor}
				className={className}
				showGrip={true}
			/>
		</div>
	)
}

export default AssignmentDragOverlay
