import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import EventItem from "./EventItem"
import { CALENDAR } from "@/app/styles/colors"

const EventList: React.FC<CalendarBody.SidePanel.Body.EventList.Props> = ({ events, onEventClick }) => {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.EVENT_HEADING_TEXT }}>Events</h4>
            <div className="space-y-2">
                {events.length > 0 ? (
                    events.map(event => (
                        <EventItem key={event.id} event={event} onEventClick={onEventClick} />
                    ))
                ) : (
                    <p className="text-sm italic" style={{ color: CALENDAR.TEXT_SECONDARY }}>No events scheduled</p>
                )}
            </div>
        </div>
    )
}

export default EventList
