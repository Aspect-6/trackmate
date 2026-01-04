import React, { useState } from 'react'
import { MY_SCHEDULE } from '@/app/styles/colors'
import { useScheduleData } from './hooks/useScheduleData'
import type { SemesterName } from './types'
import SemesterSchedule from './components/SemesterSchedule'
import ScheduleTable from './components/SemesterSchedule/ScheduleTable'
import ScheduleTableRow from './components/SemesterSchedule/ScheduleTable/Row'
import EmptyCell from './components/SemesterSchedule/ScheduleTable/Row/EmptyCell'
import FilledCell from './components/SemesterSchedule/ScheduleTable/Row/FilledCell'
import './index.css'
import { DayType } from '@/app/types'

const MySchedule: React.FC = () => {
    const {
        selectedTermId,
        setTermId,
        academicTerms,
        arrowStyle,
        handleCellClick,
        handleRemove,
        getScheduleForSemester,
        getClassById
    } = useScheduleData()

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const renderScheduleTable = (semester: SemesterName) => {
        const scheduleData = getScheduleForSemester(semester)

        const dayTypes: NonNullable<DayType>[] = ['A', 'B']
        const dayTypeToScheduleData = {
            A: scheduleData.aDay,
            B: scheduleData.bDay
        }

        return (
            <ScheduleTable>
                {dayTypes.map(dayType => {
                    const isLastRow = dayType === dayTypes[dayTypes.length - 1]
                    return (
                        <ScheduleTableRow
                            key={dayType}
                            isLastRow={isLastRow}
                            dayType={dayType}
                        >
                        {dayTypeToScheduleData[dayType].map((classId, periodIndex) => {
                            const classData = classId ? getClassById(classId) : null
                            return classData ? (
                                <FilledCell
                                    key={periodIndex}
                                    isLastRow={isLastRow}
                                    classData={classData}
                                    onRemove={() => handleRemove(semester, dayType, periodIndex)}
                                />
                            ) : (
                                <EmptyCell
                                    key={periodIndex}
                                    isLastRow={isLastRow}
                                    onClick={() => handleCellClick(semester, dayType, periodIndex)}
                                />
                            )
                        })}
                    </ScheduleTableRow>
                )})}
            </ScheduleTable>
        )
    }

    return (
        <div className="my-schedule-page flex-1 min-h-0 flex flex-col">
            <div
                className="overflow-x-hidden p-6 rounded-xl shadow-md flex-1 flex flex-col transition-colors overflow-auto"
                style={{
                    border: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                    backgroundColor: MY_SCHEDULE.BACKGROUND_PRIMARY,
                }}
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                    <h2 className="text-xl font-bold flex flex-wrap items-baseline gap-2" style={{ color: 'var(--text-primary)' }}>
                        <span>Schedule for</span>
                        <select
                            value={selectedTermId || ''}
                            onChange={(e) => setTermId(e.target.value || null)}
                            className="bg-right max-w-full text-ellipsis appearance-none bg-no-repeat cursor-pointer"
                            style={{
                                ...arrowStyle,
                                color: MY_SCHEDULE.SIDEBAR_ACTIVE_TAB_GREEN_BG,
                                borderBottom: `2px ${(isHovered || isFocused) ? 'solid' : 'dashed'} ${isFocused ? MY_SCHEDULE.SIDEBAR_ACTIVE_TAB_GREEN_BG : MY_SCHEDULE.BORDER_PRIMARY}`,
                                backgroundSize: '1em 1em',
                                padding: '0 1.25rem 0.125rem 0',
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        >
                            <option value="">select term</option>
                            {academicTerms.map(term => (
                                <option key={term.id} value={term.id}>
                                    {term.name}
                                </option>
                            ))}
                        </select>
                    </h2>
                </div>

                <div
                    className="-mx-6 mb-6"
                    style={{ borderBottom: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}` }}
                />

                {selectedTermId ? (
                    <>
                        <SemesterSchedule title="Fall Semester">
                            {renderScheduleTable('Fall')}
                        </SemesterSchedule>
                        <SemesterSchedule title="Spring Semester">
                            {renderScheduleTable('Spring')}
                        </SemesterSchedule>
                    </>
                ) : (
                    <div
                        className="text-center py-12"
                        style={{ color: MY_SCHEDULE.TEXT_TERTIARY }}
                    >
                        <p className="text-lg">Select an academic term to view and edit your schedule.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MySchedule
