import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { formatEventTimeRange } from "@/app/lib/utils"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const EventItem: React.FC<CalendarBody.SidePanel.Body.EventList.EventItemProps> = ({ event, onEventClick }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <div
            onClick={() => onEventClick(event.id)}
            className="p-3 rounded-lg cursor-pointer transition-colors"
            style={{
                border: `1px solid ${CALENDAR.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${event.color}`,
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG
            }}
            {...hoverProps}
        >
            <div className="font-semibold" style={{ color: CALENDAR.TEXT_PRIMARY }}>{event.title}</div>
            <div className="text-sm" style={{ color: CALENDAR.TEXT_SECONDARY }}>{formatEventTimeRange(event.startTime, event.endTime)}</div>
            {event.description && <div className="text-xs mt-1" style={{ color: CALENDAR.TEXT_SECONDARY }}>{event.description}</div>}
        </div>
    )
}

export default React.memo(EventItem)
