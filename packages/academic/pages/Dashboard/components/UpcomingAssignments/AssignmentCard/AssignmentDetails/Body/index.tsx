import React from "react"
import type { UpcomingAssignments } from "@/pages/Dashboard/types"
import { DASHBOARD } from "@/app/styles/colors"

const AssignmentDetailsBody: React.FC<UpcomingAssignments.AssignmentCard.Details.Body.Props> = ({ children, compact }) => {
    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center text-sm ${compact ? "gap-0.5 sm:gap-3" : "sm:gap-4"}`}
            style={{ color: DASHBOARD.TEXT_SECONDARY }}
        >
            {children}
        </div>
    )
}

export default AssignmentDetailsBody
