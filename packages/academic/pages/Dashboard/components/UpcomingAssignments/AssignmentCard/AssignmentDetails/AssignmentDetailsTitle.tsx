import React from "react"
import type { UpcomingAssignments } from "@/pages/Dashboard/types"
import { cn } from "@/app/lib/utils"
import { DASHBOARD } from "@/app/styles/colors"

const AssignmentDetailsTitle: React.FC<UpcomingAssignments.AssignmentCard.Details.TitleProps> = ({ status, children }) => {
    return (
        <h3
            className={cn(
                "font-semibold truncate mb-1 text-base sm:text-lg",
                status === "Done" && "line-through"
            )}
            style={{ color: status === "Done" ? DASHBOARD.TEXT_TERTIARY : DASHBOARD.TEXT_PRIMARY }}
        >
            {children}
        </h3>
    )
}

export default AssignmentDetailsTitle
