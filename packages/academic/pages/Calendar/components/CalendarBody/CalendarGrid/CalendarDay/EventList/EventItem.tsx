import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { getTextColorForBackground } from "@/app/lib/utils"

const EventItem: React.FC<CalendarBody.Grid.Day.EventList.EventItemProps> = ({ event, onClick }) => {
    const textColor = getTextColorForBackground(event.color)
    return (
        <div
            onClick={(clickEvent) => { clickEvent.stopPropagation(); onClick(event.id) }}
            className="calendar-event"
            style={{ backgroundColor: event.color, color: textColor }}
        >
            {event.title}
        </div>
    )
}

export default EventItem
