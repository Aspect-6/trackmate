import React from 'react';
import { CalendarGridProps } from '@/pages/Calendar/types';
import CalendarDay from './CalendarDay';
import { CALENDAR } from '@/app/styles/colors';
import CalendarGridDayHeader from './CalendarGridDayHeader';
import EmptyDay from './EmptyDay';

const CalendarGrid: React.FC<CalendarGridProps> = ({
    year,
    month,
    todayStr,
    assignmentsByDate,
    eventsByDate,
    noSchoolByDate,
    onSelectDate,
    onAssignmentClick,
    onEventClick,
    getClassColor
}) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // values used in JSX maps below
    const totalCells = firstDayOfMonth + daysInMonth;
    const remainingCells = 42 - totalCells; // 6 rows * 7 cols

    const getDayInfo = (day: number) => {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = dateString === todayStr;
        const ns = noSchoolByDate[dateString];

        const assignments = assignmentsByDate[dateString] || [];
        const events = [...(eventsByDate[dateString] || [])].sort((a, b) => {
            if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
            if (a.startTime) return -1;
            if (b.startTime) return 1;
            return 0;
        });

        return { dateString, isToday, ns, assignments, events };
    };

    return (
        <div id="calendar-grid-container" className="calendar-container flex-grow overflow-hidden transition-all duration-300">
            <div id="calendar-grid" className="h-full">
                {/* Days of the week headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <CalendarGridDayHeader
                        key={day}
                        day={day}
                        backgroundColor={CALENDAR.DAY_HEADER_BG}
                        textColor={CALENDAR.DAY_HEADER_TEXT}
                    />
                ))}
                {/* Calendar Days */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <EmptyDay key={`empty-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const { isToday, ns, assignments: dayAssignments, events: dayEvents } = getDayInfo(day);

                    return (
                        <CalendarDay
                            key={day}
                            day={day}
                            month={month}
                            year={year}
                            isToday={isToday}
                            noSchool={ns}
                            assignments={dayAssignments}
                            events={dayEvents}
                            onSelectDate={onSelectDate}
                            onAssignmentClick={onAssignmentClick}
                            onEventClick={onEventClick}
                            getClassColor={getClassColor}
                        />
                    );
                })}

                {Array.from({ length: remainingCells }).map((_, i) => (
                    <EmptyDay key={`empty-end-${i}`} />
                ))}
            </div>
        </div>
    );
};

export default CalendarGrid;
