import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const CalendarGridDayHeader: React.FC<CalendarBody.Grid.HeaderProps> = ({ backgroundColor, textColor }) => {
	const bg = backgroundColor ?? CALENDAR.DAY_HEADER_BG
	const txt = textColor ?? CALENDAR.DAY_HEADER_TEXT
	const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

	return (
		<>
			{weekdayNames.map(d => (
				<div key={d} className="h-auto text-center font-semibold px-2 py-1.5" style={{ backgroundColor: bg, color: txt }}>
					{d}
				</div>
			))}
		</>
	)
}

export default CalendarGridDayHeader
