import React from 'react';
import { CalendarDayProps } from '@/pages/Calendar/types';
import CalendarDayContainer from './CalendarDayContainer';
import CalendarDayNumber from './CalendarDayNumber';
import MobileDots from './MobileDots';
import AssignmentList from './AssignmentList';
import EventList from './EventList';

const CalendarDay: React.FC<CalendarDayProps> = ({
    day,
    month,
    year,
    isToday,
    noSchool,
    assignments,
    events,
    onSelectDate,
    onAssignmentClick,
    onEventClick,
    getClassColor
}) => {
    const mobileDots = [
        ...assignments.map(a => ({ id: `assignment-${a.id}`, color: getClassColor(a.classId) })),
        ...events.map(e => ({ id: `event-${e.id}`, color: e.color }))
    ];

    return (
        <CalendarDayContainer year={year} month={month} day={day} isToday={isToday} noSchool={noSchool} onSelectDate={onSelectDate}>
            <CalendarDayNumber day={day} noSchool={noSchool} />

            <MobileDots dots={mobileDots} />

            <div className="space-y-1 overflow-hidden hidden md:block">
                <AssignmentList assignments={assignments} getClassColor={getClassColor} onAssignmentClick={onAssignmentClick} />
                {events.length > 0 && assignments.length > 0 && <div className="h-0.5"></div>}
                <EventList events={events} onEventClick={onEventClick} />
            </div>
        </CalendarDayContainer>
    );
};

export default CalendarDay;
