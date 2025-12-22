import React, { useCallback } from 'react'
import { X } from 'lucide-react'
import { useApp } from '@/app/context/AppContext'
import { useCalendar } from './hooks/useCalendar'
import { CALENDAR } from '@/app/styles/colors'
import CalendarHeader, { PrevButton, NextButton, MonthTitle } from './components/CalendarHeader'
import CalendarBody from './components/CalendarBody'
import CalendarGrid, { CalendarGridDayHeader, CalendarDay, CalendarGridEmptyDay } from './components/CalendarBody/CalendarGrid'
import CalendarSidePanel, { DayType, ClassList, AssignmentList, EventList, NoSchoolInfo, DayTypeDisplay, CalendarSidePanelHeader, CalendarSidePanelBody, DateDisplay, CloseButton } from './components/CalendarBody/SidePanel'

import './index.css'

const Calendar: React.FC = () => {
    const { getClassById, openModal } = useApp()
    const {
        setSelectedDate,
        changeMonth,
        sidePanelData,
        calendarCells,
        monthName,
        month,
        year
    } = useCalendar()

    const getClassColor = useCallback((classId: string) => {
        const linkedClass = getClassById(classId)
        return linkedClass ? linkedClass.color : CALENDAR.DEFAULT_CLASS_COLOR
    }, [getClassById])

    return (
        <div className="calendar-page flex-1 min-h-0 flex flex-col">
            <div
                className="p-4 md:p-6 rounded-xl overflow-hidden flex flex-col h-full"
                style={{
                    backgroundColor: CALENDAR.BG_COLOR,
                    border: `1px solid ${CALENDAR.BORDER_COLOR} `,
                    boxShadow: CALENDAR.CONTAINER_SHADOW,
                }}
            >
                <CalendarHeader>
                    <PrevButton onClick={() => changeMonth(-1)} />
                    <MonthTitle monthName={monthName} />
                    <NextButton onClick={() => changeMonth(1)} />
                </CalendarHeader>

                <CalendarBody>
                    <CalendarGrid>
                        <CalendarGridDayHeader backgroundColor={CALENDAR.DAY_HEADER_BG} textColor={CALENDAR.DAY_HEADER_TEXT} />

                        {calendarCells.map((cell) => {
                            if (cell.type === 'empty') {
                                return <CalendarGridEmptyDay key={cell.key} />
                            }
                            return (
                                <CalendarDay
                                    key={cell.key}
                                    day={cell.day}
                                    month={month}
                                    year={year}
                                    isToday={cell.isToday}
                                    noSchool={cell.noSchool}
                                    assignments={cell.assignments}
                                    events={cell.events}
                                    onSelectDate={setSelectedDate}
                                    onAssignmentClick={(id) => openModal('edit-assignment', id)}
                                    onEventClick={(id) => openModal('edit-event', id)}
                                    getClassColor={getClassColor}
                                />
                            )
                        })}
                    </CalendarGrid>

                    <CalendarSidePanel date={sidePanelData?.date || null}>
                        <CalendarSidePanelHeader>
                            <DateDisplay>{sidePanelData?.formattedDate}</DateDisplay>
                            <CloseButton onClick={() => setSelectedDate(null)}>
                                <X className="w-6 h-6" />
                            </CloseButton>
                        </CalendarSidePanelHeader>

                        <CalendarSidePanelBody>
                            <DayType noSchoolDay={sidePanelData?.noSchoolDay || undefined} dayType={sidePanelData?.dayType || null} onNoSchoolClick={(id) => openModal('edit-no-school', id)}>
                                <NoSchoolInfo noSchoolDay={sidePanelData?.noSchoolDay || undefined} />
                                <DayTypeDisplay dayType={sidePanelData?.dayType || null} />
                            </DayType>
                            <ClassList classes={sidePanelData?.classes || []} noSchoolDay={sidePanelData?.noSchoolDay || undefined} getClassById={getClassById} />
                            <AssignmentList assignments={sidePanelData?.dueAssignments || []} getClassById={getClassById} onAssignmentClick={(id) => openModal('edit-assignment', id)} />
                            <EventList events={sidePanelData?.dayEvents || []} onEventClick={(id) => openModal('edit-event', id)} />
                        </CalendarSidePanelBody>
                    </CalendarSidePanel>
                </CalendarBody>
            </div>
        </div>
    )
}

export default Calendar
