import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const CalendarDayNumber: React.FC<CalendarBody.Grid.Day.NumberProps> = ({ day, noSchool }) => (
    <span className="font-bold block mb-1" style={{ color: noSchool ? CALENDAR.NO_SCHOOL_TEXT : CALENDAR.DAY_NUMBER_TEXT }}>{day}</span>
)

export default React.memo(CalendarDayNumber)
