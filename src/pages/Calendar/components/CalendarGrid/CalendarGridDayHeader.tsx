import React from 'react';
import { CalendarGridDayHeaderProps } from '@/pages/Calendar/types';

const CalendarGridDayHeader: React.FC<CalendarGridDayHeaderProps> = ({ day, backgroundColor, textColor }) => (
	<div
		className="h-auto text-center font-semibold px-2 py-1.5"
		style={{ backgroundColor, color: textColor }}
	>
		{day}
	</div>
);

export default CalendarGridDayHeader;
