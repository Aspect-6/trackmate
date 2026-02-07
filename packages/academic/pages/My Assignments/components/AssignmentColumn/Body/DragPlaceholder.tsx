import React from "react"
import type { AssignmentColumn } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const DragPlaceholder: React.FC<AssignmentColumn.Body.DragPlaceholderProps> = () => (
    <div
        className="h-16 rounded-xl"
        style={{
            border: `2px dashed ${MY_ASSIGNMENTS.BORDER_PRIMARY}`,
            backgroundColor: MY_ASSIGNMENTS.BACKGROUND_BLACK_05,
        }}
        aria-hidden="true"
    />
)

export default DragPlaceholder
