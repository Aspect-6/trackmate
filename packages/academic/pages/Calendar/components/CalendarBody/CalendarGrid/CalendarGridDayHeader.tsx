import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"

const CalendarGridDayHeader: React.FC<CalendarBody.Grid.HeaderProps> = ({ backgroundColor, textColor }) => {
	const bg = backgroundColor
	const txt = textColor
	const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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
