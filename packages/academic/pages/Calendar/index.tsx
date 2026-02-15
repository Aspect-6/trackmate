import React, { useCallback, useMemo, useState } from "react"
import { X } from "lucide-react"
import { useModal } from "@/app/contexts/ModalContext"
import { useScheduleComponents } from "@/app/contexts/ScheduleComponentsContext"
import { useClasses } from "@/app/hooks/entities"
import { useSelectedDate } from "./hooks/useSelectedDate"
import { useCalendarNavigation } from "./hooks/useCalendarNavigation"
import { useCalendarGrid } from "./hooks/useCalendarGrid"
import { useSidePanel } from "./hooks/useSidePanel"
import { CALENDAR } from "@/app/styles/colors"
import CalendarHeader, { PrevButton, NextButton, MonthTitle, CalendarSearchInput } from "./components/CalendarHeader"
import CalendarSearchResults from "./components/CalendarSearchResults"
import CalendarBody from "./components/CalendarBody"
import CalendarGrid, { CalendarGridDayHeader, CalendarDay, CalendarGridEmptyDay } from "./components/CalendarBody/CalendarGrid"
import CalendarSidePanel, { DayType, AssignmentList, EventList, NoSchoolInfo, DayTypeDisplay, CalendarSidePanelHeader, CalendarSidePanelBody, DateDisplay, CloseButton } from "./components/CalendarBody/SidePanel"
import ClassList from "./components/CalendarBody/SidePanel/Body/ClassList"
import NoClassesScheduled from "./components/CalendarBody/SidePanel/Body/ClassList/NoClassesScheduled"

import "./index.css"

const Calendar: React.FC = () => {
    const { openModal } = useModal()
    const { getClassById } = useClasses()
    const { useClassIdsForDate } = useScheduleComponents()

    const [searchQuery, setSearchQuery] = useState("")
    const [showMobileResults, setShowMobileResults] = useState(false)

    const openEditAssignment = useCallback((id: string) => openModal("edit-assignment", id), [openModal])
    const openEditEvent = useCallback((id: string) => openModal("edit-event", id), [openModal])
    const openEditNoSchool = useCallback((id: string) => openModal("edit-no-school", id), [openModal])
    const { selectedDate, setSelectedDate, clearSelection } = useSelectedDate()
    const { changeMonth, period, month, year, jumpToDate } = useCalendarNavigation(clearSelection)
    const calendarCells = useCalendarGrid({ month, year })
    const sidePanelData = useSidePanel({ selectedDate })

    // When clicking a result, go to date but keep search query (hide results view)
    const handleMobileSearchResultClick = useCallback((date: Date) => {
        jumpToDate(date)
        setSelectedDate(date)
        setShowMobileResults(false)
    }, [jumpToDate, setSelectedDate])

    // Show results when typing
    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value)
        if (value.trim()) {
            setShowMobileResults(true)
        }
    }, [])

    const { classIds, hasClasses } = useClassIdsForDate(sidePanelData?.dateString || "")

    const filteredCalendarCells = useMemo(() => {
        if (!searchQuery.trim()) return calendarCells

        const query = searchQuery.toLowerCase().trim()
        const isAssignmentSearch = query === "assignment" || query === "assignments"
        const isEventSearch = query === "event" || query === "events"

        return calendarCells.map(cell => {
            if (cell.type === "empty") return cell

            const filteredAssignments = cell.assignments.filter(assignment => {
                if (isAssignmentSearch) return true
                if (isEventSearch) return false

                const className = getClassById(assignment.classId)?.name || ""
                return (
                    assignment.title.toLowerCase().includes(query) ||
                    assignment.type.toLowerCase().includes(query) ||
                    className.toLowerCase().includes(query) ||
                    (assignment.description?.toLowerCase().includes(query) ?? false)
                )
            })

            const filteredEvents = cell.events.filter(event => {
                if (isEventSearch) return true
                if (isAssignmentSearch) return false

                return (
                    event.title.toLowerCase().includes(query) ||
                    (event.description?.toLowerCase().includes(query) ?? false)
                )
            })

            return {
                ...cell,
                assignments: filteredAssignments,
                events: filteredEvents
            }
        })
    }, [calendarCells, searchQuery, getClassById])

    const renderClassesSection = () => {
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

        if (!hasClasses) return <NoClassesScheduled />
        return <ClassList classes={classIds} getClassById={getClassById} />
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
                <div className="md:hidden mb-4 w-full">
                    <CalendarSearchInput
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => {
                            if (searchQuery.trim()) setShowMobileResults(true)
                        }}
                        fullWidth
                    />
                </div>

                <div className={`md:hidden flex-1 overflow-hidden ${showMobileResults && searchQuery.trim() ? "block" : "hidden"}`}>
                    <CalendarSearchResults
                        searchQuery={searchQuery}
                        onSelectDate={handleMobileSearchResultClick}
                        month={month}
                        year={year}
                    />
                </div>

                <div className={`flex-col flex-1 overflow-hidden ${showMobileResults && searchQuery.trim() ? "hidden md:flex" : "flex"}`}>
                    <CalendarHeader>
                        <div className="flex items-center gap-2 justify-self-start">
                            <PrevButton onClick={() => changeMonth(-1)} />
                        </div>
                        <MonthTitle period={period} />
                        <div className="flex items-center gap-2 justify-self-end">
                            <div className="hidden md:block">
                                <CalendarSearchInput value={searchQuery} onChange={setSearchQuery} />
                            </div>
                            <NextButton onClick={() => changeMonth(1)} />
                        </div>
                    </CalendarHeader>

                    <CalendarBody>
                        <CalendarGrid>
                            <CalendarGridDayHeader backgroundColor={CALENDAR.BACKGROUND_SECONDARY} textColor={CALENDAR.TEXT_SECONDARY} />

                            {filteredCalendarCells.map((cell) => {
                                if (cell.type === "empty") {
                                    return <CalendarGridEmptyDay key={cell.key} />
                                }
                                return (
                                    <CalendarDay
                                        key={cell.key}
                                        day={cell.day}
                                        month={month}
                                        year={year}
                                        isToday={cell.isToday}
                                        isSelected={selectedDate?.getFullYear() === year && selectedDate?.getMonth() === month && selectedDate?.getDate() === cell.day}
                                        noSchool={cell.noSchool}
                                        assignments={cell.assignments}
                                        events={cell.events}
                                        onSelectDate={setSelectedDate}
                                        onAssignmentClick={openEditAssignment}
                                        onEventClick={openEditEvent}
                                        getClassColor={(classId: string) => getClassById(classId)?.color}
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
                                {sidePanelData?.scheduleType === "alternating-ab" && (
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
        </div>
    )
}

export default Calendar
