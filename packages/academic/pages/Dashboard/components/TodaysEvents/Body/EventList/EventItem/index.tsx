import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { formatEventTimeRange } from "@/app/lib/utils"
import type { TodaysEvents } from "@/pages/Dashboard/types"
import { DASHBOARD } from "@/app/styles/colors"

const EventItem: React.FC<TodaysEvents.Body.EventList.EventItemProps> = ({ event, onClick }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <div
            onClick={onClick}
            className="flex items-center p-3 rounded-lg shadow-md border mb-2 cursor-pointer transition-colors"
            style={{
                borderColor: DASHBOARD.BORDER_PRIMARY,
                borderLeft: `4px solid ${event.color}`,
                backgroundColor: isHovered ? DASHBOARD.BACKGROUND_SECONDARY : DASHBOARD.BACKGROUND_PRIMARY
            }}
            {...hoverProps}
        >
            <div className="flex-1">
                <p className="font-semibold text-sm sm:text-base" style={{ color: DASHBOARD.TEXT_PRIMARY }}>{event.title}</p>
                <p className="text-xs mt-1" style={{ color: DASHBOARD.TEXT_SECONDARY }}>
                    {formatEventTimeRange(event.startTime, event.endTime)}
                </p>
            </div>
        </div>
    )
}

export default EventItem
