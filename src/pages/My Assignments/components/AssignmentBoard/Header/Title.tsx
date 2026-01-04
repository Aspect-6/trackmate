import React from "react"
import type { AssignmentBoard as AssignmentBoardTypes } from "@/pages/My Assignments/types"
import { ChevronDown } from "lucide-react"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const AssignmentBoardTitle: React.FC<AssignmentBoardTypes.Header.TitleProps> = ({
	status,
	children,
	isMobile,
	openColumns,
}) => {
	const isListHidden = isMobile && !openColumns[status]

	const getHeaderColor = () => {
		if (status === "To Do") return MY_ASSIGNMENTS.BOARD_HEADER_TEXT_UPCOMING
		if (status === "In Progress") return MY_ASSIGNMENTS.BOARD_HEADER_TEXT_INPROGRESS
		if (status === "Done") return MY_ASSIGNMENTS.BOARD_HEADER_TEXT_DONE
	}

	const headerColor = getHeaderColor()

	return (
		<div className="flex items-center gap-2">
			{isMobile && (
				<ChevronDown
					className={`w-4 h-4 transition-transform duration-200 ${isListHidden ? "-rotate-90" : "rotate-0"}`}
					style={{ color: headerColor }}
					aria-hidden="true"
				/>
			)}
			<h2 className="text-lg font-bold" style={{ color: headerColor }}>
				{children}
			</h2>
		</div>
	)
}

export default AssignmentBoardTitle
