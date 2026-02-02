import React from "react"
import type { TodaysEvents } from "@/pages/Dashboard/types"
import { DASHBOARD } from "@/app/styles/colors"
import TodaysEventsHeader from "./TodaysEventsHeader"
import TodaysEventsBody, { EventList, NoEventsScheduled } from "./Body"

const TodaysEvents: React.FC<TodaysEvents.Props> = ({
    events,
    onEventClick,
    isMobile,
    isCollapsed,
    onToggleCollapse
}) => {
    const hasEvents = events.length > 0

    return (
        <div
            className="border p-6 rounded-xl shadow-md dashboard-collapsible"
            style={{
                backgroundColor: DASHBOARD.BACKGROUND_PRIMARY,
                borderColor: DASHBOARD.BORDER_PRIMARY
            }}
            data-collapsed={isMobile && isCollapsed ? "true" : "false"}
        >
            <TodaysEventsHeader
                isMobile={isMobile}
                isCollapsed={isCollapsed}
                onToggleCollapse={onToggleCollapse}
            />

            <TodaysEventsBody isMobile={isMobile} isCollapsed={isCollapsed}>
                {hasEvents ? (
                    <EventList
                        events={events}
                        onEventClick={onEventClick}
                    />
                ) : (
                    <NoEventsScheduled />
                )}
            </TodaysEventsBody>
        </div>
    )
}

export default TodaysEvents
