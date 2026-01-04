import React from "react"
import type { AssignmentCardContentProps } from "@/pages/My Assignments/types"
import { GripVertical } from "lucide-react"
import { formatDate } from "@/app/lib/utils"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"
import PriorityBadge from "@/app/components/PriorityBadge"

const AssignmentCardContent: React.FC<AssignmentCardContentProps> = ({
	assignment,
	classColor,
	className,
	showGrip = false,
}) => {
	return (
		<>
			{showGrip && (
				<div
					className="flex items-center justify-center text-gray-600"
					style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
				>
					<GripVertical size={16} />
				</div>
			)}
			<div className="flex-grow">
				<p className="font-semibold text-sm mb-1" style={{ color: MY_ASSIGNMENTS.TEXT_PRIMARY }}>{assignment.title}</p>
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
						Due: {formatDate(assignment.dueDate)}
					</span>
					<PriorityBadge
						priority={assignment.priority}
						className="px-2 py-0.5"
					/>
				</div>
			</div>
		</>
	)
}

export default AssignmentCardContent
