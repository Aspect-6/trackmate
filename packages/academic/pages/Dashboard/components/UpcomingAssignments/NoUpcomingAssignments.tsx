import React from "react"
import { DASHBOARD } from "@/app/styles/colors"

const NoUpcomingAssignments: React.FC = () => {
    return (
        <p className="text-center py-6" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
            No upcoming assignments to display.
        </p>
    )
}

export default NoUpcomingAssignments
