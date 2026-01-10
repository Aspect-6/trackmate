import React, { useCallback } from 'react'
import { X } from 'lucide-react'
import { useApp } from '@/app/contexts/AppContext'
import { useScheduleComponents } from '@/app/contexts/ScheduleComponentsContext'
import { useClasses } from '@/app/hooks/entities/useClasses'
import { useAssignments } from '@/app/hooks/entities/useAssignments'
import { useEvents } from '@/app/hooks/entities/useEvents'
import { useNoSchool } from '@/app/hooks/entities/useNoSchool'
import { useSelectedDate } from './hooks/useSelectedDate'
import { useCalendarNavigation } from './hooks/useCalendarNavigation'
import { useCalendarGrid } from './hooks/useCalendarGrid'
import { useSidePanel } from './hooks/useSidePanel'
import { CALENDAR } from '@/app/styles/colors'
import CalendarHeader, { PrevButton, NextButton, MonthTitle } from './components/CalendarHeader'
import CalendarBody from './components/CalendarBody'
import CalendarGrid, { CalendarGridDayHeader, CalendarDay, CalendarGridEmptyDay } from './components/CalendarBody/CalendarGrid'
import CalendarSidePanel, { DayType, AssignmentList, EventList, NoSchoolInfo, DayTypeDisplay, CalendarSidePanelHeader, CalendarSidePanelBody, DateDisplay, CloseButton } from './components/CalendarBody/SidePanel'
import ClassList from './components/CalendarBody/SidePanel/Body/ClassList'
import NoClassesScheduled from './components/CalendarBody/SidePanel/Body/ClassList/NoClassesScheduled'

import './index.css'

const Calendar: React.FC = () => {
    const { schedules } = useApp()
    const { getClassById } = useClasses()
    const { openEditAssignment } = useAssignments()
    const { useClassIdsForDate } = useScheduleComponents()
    const { openEditEvent } = useEvents()
    const { openEditNoSchool } = useNoSchool()
    const { selectedDate, setSelectedDate, clearSelection } = useSelectedDate()
    const { changeMonth, period, month, year } = useCalendarNavigation(clearSelection)
    const calendarCells = useCalendarGrid({ month, year })
    const sidePanelData = useSidePanel({ selectedDate })

    // Get class IDs for the selected date
    const { classIds, hasClasses } = useClassIdsForDate(sidePanelData?.dateString || '')

    const getClassColor = useCallback((classId: string) => {
        const classInfo = getClassById(classId)
        return classInfo?.color || '#888'
    }, [getClassById])

    // Determine what to render for classes section
    const renderClassesSection = () => {
        // No school day - show nothing (handled by DayType component)
        if (sidePanelData?.noSchoolDay) {
            return (
                <div>
                    <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.CLASS_HEADING_TEXT }}>Classes</h4>
                    <p className="text-sm italic" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                        No classes (no school)
                    </p>
                </div>
            )
        }

        // No classes scheduled
        if (!hasClasses) {
            return <NoClassesScheduled />
        }

        // Render class list
        return (
            <ClassList
                classes={classIds}
                getClassById={getClassById}
            />
        )
    }

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
                    <MonthTitle period={period} />
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
                                    onAssignmentClick={openEditAssignment}
                                    onEventClick={openEditEvent}
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
                            {schedules.type === 'alternating-ab' && (
                                <DayType noSchoolDay={sidePanelData?.noSchoolDay || undefined} dayType={sidePanelData?.dayType || null} onNoSchoolClick={openEditNoSchool}>
                                    <NoSchoolInfo noSchoolDay={sidePanelData?.noSchoolDay || undefined} />
                                    <DayTypeDisplay dayType={sidePanelData?.dayType || null} />
                                </DayType>
                            )}
                            {sidePanelData?.dateString && renderClassesSection()}
                            <AssignmentList assignments={sidePanelData?.dueAssignments || []} getClassById={getClassById} onAssignmentClick={openEditAssignment} />
                            <EventList events={sidePanelData?.dayEvents || []} onEventClick={openEditEvent} />
                        </CalendarSidePanelBody>
                    </CalendarSidePanel>
                </CalendarBody>
            </div>
        </div>
    )
}

export default Calendar
