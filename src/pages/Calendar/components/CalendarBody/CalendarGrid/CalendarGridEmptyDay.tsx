import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const CalendarGridEmptyDay: React.FC<CalendarBody.Grid.EmptyDayProps> = () => (
	<div
		className="border-r border-b p-2"
		style={{ borderColor: CALENDAR.GRID_BORDER, color: CALENDAR.DAY_INACTIVE_TEXT, backgroundColor: CALENDAR.DAY_INACTIVE_BG }}
	/>
)

export default CalendarGridEmptyDay
