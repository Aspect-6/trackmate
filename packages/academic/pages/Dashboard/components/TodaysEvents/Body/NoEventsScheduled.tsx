import React from "react"
import type { TodaysEvents } from "@/pages/Dashboard/types"
import { DASHBOARD } from "@/app/styles/colors"

const NoEventsScheduled: React.FC<TodaysEvents.Body.NoEventsScheduledProps> = () => {
    return (
        <p className="text-center py-6" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
            No events scheduled for today.
        </p>
    )
}

export default NoEventsScheduled
