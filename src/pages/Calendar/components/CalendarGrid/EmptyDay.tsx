import React from 'react';
import { CALENDAR } from '@/app/styles/colors';

const EmptyDay: React.FC = () => (
	<div
		className="border-r border-b p-2"
		style={{ borderColor: CALENDAR.GRID_BORDER, color: CALENDAR.DAY_INACTIVE_TEXT, backgroundColor: CALENDAR.DAY_INACTIVE_BG }}
	/>
);

export default EmptyDay;
