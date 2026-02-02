import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const CalendarGridEmptyDay: React.FC<CalendarBody.Grid.EmptyDayProps> = () => (
	<div
		className="border-r border-b p-2"
		style={{
			backgroundColor: CALENDAR.BACKGROUND_SECONDARY,
			borderColor: CALENDAR.BORDER_PRIMARY,
		}}
	/>
)

export default CalendarGridEmptyDay
