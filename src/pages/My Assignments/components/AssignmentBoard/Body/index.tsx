import React from "react"
import type { AssignmentBoard } from "@/pages/My Assignments/types"
import { useCollapseAnimation } from "@/pages/My Assignments/hooks/useCollapseAnimation"

const EMPTY_STATE_MIN_HEIGHT = 60
const LIST_BOTTOM_PADDING = 12

const AssignmentBoardBody: React.FC<AssignmentBoard.Body.Props> = ({
	status,
	itemsInView,
	isMobile,
	isCollapsed,
	isOver,
	droppableRef,
	children,
}) => {
	const { listRef, contentMaxHeight, isListHidden, contentId } = useCollapseAnimation({
		status,
		isMobile,
		isCollapsed,
		itemCount: itemsInView.length,
	})

	return (
		<div
			className="min-h-0 flex flex-col flex-grow transition-max-height duration-300"
			style={{
				maxHeight: isMobile
					? isListHidden
						? "0px"
						: `${contentMaxHeight}px`
					: "none",
				overflow: isMobile ? "hidden" : "visible",
			}}
		>
			<div
				ref={(node) => {
					droppableRef(node)
					if (node) (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node
				}}
				id={contentId}
				className="assignment-list min-h-0 flex-1 h-full space-y-3 overflow-y-auto custom-scrollbar"
				style={{
					minHeight: itemsInView.length === 0 ? `${EMPTY_STATE_MIN_HEIGHT}px` : undefined,
					paddingBottom: isMobile && itemsInView.length > 0 ? `${LIST_BOTTOM_PADDING}px` : undefined,
					backgroundColor: isOver ? "rgba(0, 0, 0, 0.04)" : undefined,
				}}
			>
				{children}
			</div>
		</div>
	)
}

export default AssignmentBoardBody
