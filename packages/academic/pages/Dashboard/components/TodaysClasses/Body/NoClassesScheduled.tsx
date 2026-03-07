import React from "react"
import type { TodaysClasses } from "@/pages/Dashboard/types"
import { DASHBOARD } from "@/app/styles/colors"

const NoClassesScheduled: React.FC<TodaysClasses.Body.NoClassesScheduledProps> = () => {
    return (
        <p className="text-center py-6 flex items-center justify-center h-full min-h-[180px]" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
            No classes scheduled for today.
        </p>
    )
}

export default NoClassesScheduled
