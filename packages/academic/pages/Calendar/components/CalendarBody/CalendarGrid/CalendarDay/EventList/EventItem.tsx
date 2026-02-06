import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { getTextColorForBackground } from "@/app/lib/utils"
import { useHover } from "@shared/hooks/ui/useHover"
import { isTimePast, isDatePast, todayString } from "@shared/lib"

const EventItem: React.FC<CalendarBody.Grid.Day.EventList.EventItemProps> = ({ event, onClick }) => {
    const textColor = getTextColorForBackground(event.color)
    const { isHovered, hoverProps } = useHover()

    const isPast = React.useMemo(() => {
        if (isDatePast(event.date)) return true
        if (event.date > todayString()) return false

        return event.startTime ? isTimePast(event.endTime || event.startTime) : false
    }, [event.date, event.startTime, event.endTime])

    return (
        <div
            className={`calendar-event ${isPast ? "saturate-70" : ""}`}
            style={{
                backgroundColor: event.color,
                color: textColor,
                opacity: isHovered ? (isPast ? 0.5 : 0.85) : (isPast ? 0.6 : 1)
            }}
            onClick={(clickEvent) => { clickEvent.stopPropagation(); onClick(event.id) }}
            {...hoverProps}
        >
            {event.title}
        </div>
    )
}

export default EventItem
