import React, { useMemo } from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import CalendarDayContainer from "./CalendarDayContainer"
import CalendarDayNumber from "./CalendarDayNumber"
import CalendarDayMobileDots from "./CalendarDayMobileDots"
import AssignmentList from "./AssignmentList"
import EventList from "./EventList"

const CalendarDay: React.FC<CalendarBody.Grid.Day.Props> = ({
    day,
    month,
    year,
    isToday,
    isSelected,
    noSchool,
    assignments,
    events,
    onSelectDate,
    onAssignmentClick,
    onEventClick,
    getClassColor
}) => {
    const sortedAssignments = useMemo(() => {
        return assignments.toSorted((a, b) => (a.dueTime).localeCompare(b.dueTime))
    }, [assignments])

    const mobileDots = [
        ...sortedAssignments.map(a => ({ id: `assignment-${a.id}`, color: getClassColor(a.classId) })),
        ...events.map(e => ({ id: `event-${e.id}`, color: e.color }))
    ]

    return (
        <CalendarDayContainer year={year} month={month} day={day} isToday={isToday} isSelected={isSelected} noSchool={noSchool} onSelectDate={onSelectDate}>
            <CalendarDayNumber day={day} noSchool={noSchool} />

            <CalendarDayMobileDots dots={mobileDots} />

            <div className="space-y-1 overflow-hidden hidden md:block">
                <AssignmentList assignments={sortedAssignments} getClassColor={getClassColor} onAssignmentClick={onAssignmentClick} />
                {events.length > 0 && sortedAssignments.length > 0 && <div className="h-0.5"></div>}
                <EventList events={events} onEventClick={onEventClick} />
            </div>
        </CalendarDayContainer>
    )
}

export default React.memo(CalendarDay)

