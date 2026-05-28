import React from "react"
import { useAssignments } from "@/app/hooks/entities/useAssignments"
import { useClasses } from "@/app/hooks/entities/useClasses"
import type { AssignmentType } from "@/app/types"
import type { SubtaskRenderableAssignment } from "@/app/types"
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
	const isSubtask = assignment.kind === "subtask"
	const assignmentType = assignment.kind === "parent" ? assignment.type : undefined
	const dateLabel = isSubtask
		? "Due"
		: assignmentType && examTypes.includes(assignmentType)
			? "On"
			: "Due"
	const showTime = assignment.dueTime && assignment.dueTime !== "23:59"
	const subtaskParentTitle = isSubtask ? (assignment as SubtaskRenderableAssignment).parentTitle : undefined

	return (
		<div
			className={`${isSubtask ? "p-3" : "p-4"} rounded-lg shadow-md overflow-hidden flex gap-3 cursor-grabbing`}
			style={{
				backgroundColor: MY_ASSIGNMENTS.BACKGROUND_PRIMARY,
				border: `1px solid ${MY_ASSIGNMENTS.BORDER_PRIMARY}`,
				borderLeft: `${isSubtask ? 2 : 4}px solid ${classColor}`,
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
				<div className={`flex items-start justify-between gap-3 ${isSubtask ? "mb-1.5" : "mb-2"}`}>
					<p
						className={`text-xs font-semibold min-w-0 ${isSubtask && subtaskParentTitle ? "basis-1/2 whitespace-normal break-words" : "basis-full"}`}
						style={{ color: classColor }}
						title={className}
					>
						{className}
					</p>
					{isSubtask && subtaskParentTitle ? (
						<p
							className="font-medium basis-1/2 min-w-0 text-right whitespace-normal break-words"
							style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY, fontSize: "10px" }}
							title={subtaskParentTitle}
						>
							{subtaskParentTitle}
						</p>
					) : null}
				</div>
				<div className="flex justify-between items-center">
					<span
						className="text-xs font-medium"
						style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
					>
						{dateLabel}: {formatDateRelative("short", assignment.dueDate)}
						{showTime && ` at ${formatTime(assignment.dueTime)}`}
					</span>
					{!isSubtask && assignment.priority && (
						<PriorityBadge priority={assignment.priority} className="px-2 py-0.5" />
					)}
				</div>
			</div>
		</div>
	)
}

export default AssignmentDragOverlay
