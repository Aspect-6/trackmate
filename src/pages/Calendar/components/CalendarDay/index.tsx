import React, { useState } from 'react';
import { CalendarDayProps } from '@/pages/Calendar/types';
import CalendarDayAssignment from '@/pages/Calendar/components/CalendarDay/CalendarDayAssignment';
import CalendarDayEvent from '@/pages/Calendar/components/CalendarDay/CalendarDayEvent';
import { CALENDAR } from '@/app/styles/colors';

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
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={() => onSelectDate(new Date(year, month, day))}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="border-r border-b border-[#30363d] p-2 overflow-y-auto relative cursor-pointer transition-colors"
            style={{
                backgroundColor: isHovered ? CALENDAR.DAY_BG_HOVER : (isToday ? CALENDAR.TODAY_BG : (noSchool ? CALENDAR.NO_SCHOOL_BG : undefined)),
                borderColor: noSchool ? CALENDAR.NO_SCHOOL_BORDER : undefined,
                boxShadow: isToday ? `inset 0 0 0 2px ${CALENDAR.TODAY_BORDER}` : undefined
            }}
        >
            <span className="font-bold block mb-1" style={{ color: noSchool ? CALENDAR.NO_SCHOOL_TEXT : CALENDAR.DAY_NUMBER_TEXT }}>{day}</span>

            <div className="space-y-1 overflow-hidden md:block flex flex-wrap gap-1">
                {assignments.map(a => (
                    <CalendarDayAssignment
                        key={a.id}
                        assignment={a}
                        color={getClassColor(a.classId)}
                        onClick={onAssignmentClick}
                    />
                ))}

                {events.map(e => (
                    <CalendarDayEvent
                        key={e.id}
                        event={e}
                        onClick={onEventClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default CalendarDay;
