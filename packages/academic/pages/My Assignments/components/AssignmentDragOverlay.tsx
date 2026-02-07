import React from "react"
import { useAssignments } from "@/app/hooks/entities/useAssignments"
import { useClasses } from "@/app/hooks/entities/useClasses"
import type { AssignmentType } from "@/app/types"
import type { AssignmentDragOverlayProps } from "@/pages/My Assignments/types"
import { formatDateRelative, formatTime } from "@shared/lib"
import { GripVertical } from "lucide-react"
import PriorityBadge from "@/app/components/PriorityBadge"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

export const AssignmentDragOverlay: React.FC<AssignmentDragOverlayProps> = ({ assignmentId }) => {
	const assignment = useAssignments().getAssignmentById(assignmentId)!
	const linkedClass = useClasses().getClassById(assignment.classId)
	if (!linkedClass) return null

	const classColor = linkedClass.color
	const className = linkedClass.name

	const examTypes: AssignmentType[] = ["Quiz", "Test", "Midterm", "Final Exam"]
	const dateLabel = examTypes.includes(assignment.type) ? "On" : "Due"
	const showTime = assignment.dueTime && assignment.dueTime !== "23:59"

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
			<div
				className="flex items-center justify-center"
				style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
			>
				<GripVertical size={16} />
			</div>
			<div className="flex-grow">
				<p
					className="font-semibold text-sm mb-1"
					style={{ color: MY_ASSIGNMENTS.TEXT_PRIMARY }}
				>
					{assignment.title}
				</p>
				<p
					className="text-xs mb-2"
					style={{ color: classColor, fontWeight: 600 }}
				>
					{className}
				</p>
				<div className="flex justify-between items-center">
					<span
						className="text-xs font-medium"
						style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
					>
						{dateLabel}: {formatDateRelative("short", assignment.dueDate)}
						{showTime && ` at ${formatTime(assignment.dueTime)}`}
					</span>
					<PriorityBadge priority={assignment.priority} className="px-2 py-0.5" />
				</div>
			</div>
		</div>
	)
}

export default AssignmentDragOverlay
