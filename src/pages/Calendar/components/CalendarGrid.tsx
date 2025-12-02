import React from 'react';
import { CalendarGridProps } from '@/pages/Calendar/types';
import CalendarDay from '@/pages/Calendar/components/CalendarDay';
import { CALENDAR } from '@/app/styles/colors';

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

    const renderDays = () => {
        const days = [];

        // Leading empty days
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="border-r border-b border-[#30363d] p-2" style={{ color: CALENDAR.DAY_INACTIVE_TEXT, backgroundColor: CALENDAR.DAY_INACTIVE_BG }}></div>);
        }

        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateString === todayStr;
            const ns = noSchoolByDate[dateString];

            const dayAssignments = assignmentsByDate[dateString] || [];
            const dayEvents = (eventsByDate[dateString] || []).sort((a, b) => {
                if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
                if (a.startTime) return -1;
                if (b.startTime) return 1;
                return 0;
            });

            days.push(
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
        }

        // Trailing empty days
        const totalCells = firstDayOfMonth + daysInMonth;
        const remainingCells = 42 - totalCells; // 6 rows * 7 cols
        for (let i = 0; i < remainingCells; i++) {
            days.push(<div key={`empty-end-${i}`} className="border-r border-b border-[#30363d] p-2" style={{ color: CALENDAR.DAY_INACTIVE_TEXT, backgroundColor: CALENDAR.DAY_INACTIVE_BG }}></div>);
        }

        return days;
    };

    return (
        <div id="calendar-grid-container" className="calendar-container flex-grow overflow-hidden transition-all duration-300">
            <div id="calendar-grid" className="h-full">
                {/* Days of the week headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="h-auto text-center font-semibold px-2 py-1.5" style={{ backgroundColor: CALENDAR.DAY_HEADER_BG, color: CALENDAR.DAY_HEADER_TEXT }}>
                        {day}
                    </div>
                ))}
                {/* Calendar Days */}
                {renderDays()}
            </div>
        </div>
    );
};

export default CalendarGrid;
