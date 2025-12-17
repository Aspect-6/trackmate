import React from 'react';
import EventItem from './EventItem';
import { EventListProps } from '@/pages/Calendar/types';

const EventList: React.FC<EventListProps> = ({ events, onEventClick }) => (
    <>
        {events.map(e => (
            <EventItem key={e.id} event={e} onClick={onEventClick} />
        ))}
    </>
);

export default React.memo(EventList);
