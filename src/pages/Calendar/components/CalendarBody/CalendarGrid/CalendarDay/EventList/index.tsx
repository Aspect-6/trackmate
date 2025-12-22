import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import EventItem from './EventItem'

const EventList: React.FC<CalendarBody.Grid.Day.EventList.Props> = ({ events, onEventClick }) => (
    <>
        {events.map(e => (
            <EventItem key={e.id} event={e} onClick={onEventClick} />
        ))}
    </>
)

export default React.memo(EventList)
