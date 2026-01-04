import React, { useCallback } from 'react'
import { X } from 'lucide-react'
import { useApp } from '@/app/contexts/AppContext'
import { useCalendar } from './hooks/useCalendar'
import { CALENDAR } from '@/app/styles/colors'
import CalendarHeader, { PrevButton, NextButton, MonthTitle } from './components/CalendarHeader'
import CalendarBody from './components/CalendarBody'
import CalendarGrid, { CalendarGridDayHeader, CalendarDay, CalendarGridEmptyDay } from './components/CalendarBody/CalendarGrid'
import CalendarSidePanel, { DayType, /* ClassList, */ AssignmentList, EventList, NoSchoolInfo, DayTypeDisplay, CalendarSidePanelHeader, CalendarSidePanelBody, DateDisplay, CloseButton } from './components/CalendarBody/SidePanel'

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
        return getClassById(classId).color
    }, [getClassById])

    return (
        <div className="calendar-page flex-1 min-h-0 flex flex-col">
            <div
                className="p-4 md:p-6 rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
                style={{
                    backgroundColor: CALENDAR.BACKGROUND_PRIMARY,
                    border: `1px solid ${CALENDAR.BORDER_PRIMARY} `,
                }}
            >
                <CalendarHeader>
                    <PrevButton onClick={() => changeMonth(-1)} />
                    <MonthTitle monthName={monthName} />
                    <NextButton onClick={() => changeMonth(1)} />
                </CalendarHeader>

                <CalendarBody>
                    <CalendarGrid>
                        <CalendarGridDayHeader backgroundColor={CALENDAR.BACKGROUND_SECONDARY} textColor={CALENDAR.TEXT_SECONDARY} />

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
                            {/* Temporarily disabled: ClassList will be re-enabled with new Schedule viewer */}
                            {/* <ClassList classes={sidePanelData?.classes || []} noSchoolDay={sidePanelData?.noSchoolDay || undefined} getClassById={getClassById} /> */}
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
