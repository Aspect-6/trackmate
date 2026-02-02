import React from "react"
import type { TodaysEvents } from "@/pages/Dashboard/types"
import EventItem from "./EventItem"

const EventList: React.FC<TodaysEvents.Body.EventList.Props> = ({ events, onEventClick }) => {
    return (
        <>
            {events.map(event => (
                <EventItem
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event.id)}
                />
            ))}
        </>
    )
}

export default EventList
