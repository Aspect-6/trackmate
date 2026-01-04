import React from "react"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const EmptyState: React.FC = () => (
	<p
		className="m-0 py-3 text-sm italic text-center"
		style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
	>
		No assignments here.
	</p>
)

export default EmptyState
