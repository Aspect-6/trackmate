import React from "react"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const DragPlaceholder: React.FC = () => (
	<div
		className="h-16 rounded-xl"
		style={{
			border: `2px dashed ${MY_ASSIGNMENTS.BORDER_PRIMARY}`,
			backgroundColor: "rgba(0, 0, 0, 0.035)",
		}}
		aria-hidden="true"
	/>
)

export default DragPlaceholder
