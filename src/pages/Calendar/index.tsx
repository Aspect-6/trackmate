import React, { useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { todayString, dateToLocalISOString, parseDateLocal } from '@/app/lib/utils';
import CalendarSidePanel from '@/pages/Calendar/components/CalendarSidePanel';
import CalendarHeader from '@/pages/Calendar/components/CalendarHeader';
import CalendarGrid from '@/pages/Calendar/components/CalendarGrid';
import { Assignment, Event, NoSchoolPeriod } from '@/app/types';
import { CALENDAR, GLOBAL } from '@/app/styles/colors';

import './index.css';

const Calendar: React.FC = () => {
    const { assignments, events, noSchool, getClassById, openModal } = useApp();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentDate(newDate);
        setSelectedDate(null); // Close side panel
    };

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const todayStr = todayString();

    // Prepare data maps
    const assignmentsByDate = assignments.reduce<Record<string, Assignment[]>>((acc, a) => {
        if (a.dueDate) {
            if (!acc[a.dueDate]) acc[a.dueDate] = [];
            acc[a.dueDate]!.push(a);
        }
        return acc;
    }, {});

    const eventsByDate = events.reduce<Record<string, Event[]>>((acc, e) => {
        if (e.date) {
            if (!acc[e.date]) acc[e.date] = [];
            acc[e.date]!.push(e);
        }
        return acc;
    }, {});

    const noSchoolByDate: Record<string, NoSchoolPeriod> = {};
    noSchool.forEach(ns => {
        const start = parseDateLocal(ns.startDate);
        const end = parseDateLocal(ns.endDate);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = dateToLocalISOString(d);
            noSchoolByDate[dateStr] = ns;
        }
    });

    const getClassColor = (classId: string) => {
        const linkedClass = getClassById(classId);
        return linkedClass ? linkedClass.color : CALENDAR.DEFAULT_CLASS_COLOR;
    };

    return (
        <div className="calendar-page flex-1 min-h-0 flex flex-col">
            <div
                className="p-4 md:p-6 rounded-xl overflow-hidden flex flex-col h-full"
                style={{
                    backgroundColor: GLOBAL.MODULE_BG,
                    border: '1px solid #30363d',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                }}
            >
                <CalendarHeader
                    monthName={monthName}
                    onPrevMonth={() => changeMonth(-1)}
                    onNextMonth={() => changeMonth(1)}
                />

                <div className="calendar-main-container flex flex-grow overflow-hidden relative">
                    <CalendarGrid
                        year={year}
                        month={month}
                        todayStr={todayStr}
                        assignmentsByDate={assignmentsByDate}
                        eventsByDate={eventsByDate}
                        noSchoolByDate={noSchoolByDate}
                        onSelectDate={setSelectedDate}
                        onAssignmentClick={(id) => openModal('edit-assignment', id)}
                        onEventClick={(id) => openModal('edit-event', id)}
                        getClassColor={getClassColor}
                    />

                    {selectedDate && (
                        <CalendarSidePanel date={selectedDate} onClose={() => setSelectedDate(null)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
