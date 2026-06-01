import React from "react"
import type { TodaysEvents } from "@/pages/Dashboard/types"

const TodaysEventsBody: React.FC<TodaysEvents.Body.Props> = ({ isMobile, isCollapsed, children }) => {
    return (
        <div
            className="flex-1"
            style={{
                display: isMobile ? "grid" : undefined,
                gridTemplateRows: isCollapsed ? "0fr" : "1fr",
                transition: "grid-template-rows 0.25s ease-out",
                maxHeight: isMobile ? "14.7rem" : "275px",
            }}
        >
            <div className="overflow-hidden h-full">
                <div
                    className="space-y-2 pr-2 custom-scrollbar h-full"
                    style={{
                        overflowY: "auto",
                        overscrollBehavior: "contain",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TodaysEventsBody

export { default as EventList } from "./EventList"
export { default as NoEventsScheduled } from "./NoEventsScheduled"
