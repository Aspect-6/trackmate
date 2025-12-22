import React from 'react'
import type { CalendarHeader } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const MonthTitle: React.FC<CalendarHeader.MonthTitleProps> = ({ monthName }) => (
    <h2 className="text-xl md:text-2xl font-bold px-2 flex-shrink-0" style={{ color: CALENDAR.HEADER_TEXT }}>{monthName}</h2>
)

export default MonthTitle
