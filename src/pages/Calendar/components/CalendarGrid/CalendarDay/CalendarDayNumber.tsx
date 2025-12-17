import React from 'react';
import { CALENDAR } from '@/app/styles/colors';
import { CalendarDayNumberProps } from '@/pages/Calendar/types';

const CalendarDayNumber: React.FC<CalendarDayNumberProps> = ({ day, noSchool }) => (
    <span className="font-bold block mb-1" style={{ color: noSchool ? CALENDAR.NO_SCHOOL_TEXT : CALENDAR.DAY_NUMBER_TEXT }}>{day}</span>
);

export default React.memo(CalendarDayNumber);
