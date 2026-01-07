import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { useHover } from '@/app/hooks/useHover'
import { useFocus } from '@/app/hooks/useFocus'
import { useScheduleData } from './hooks/useScheduleData'
import type { DayType } from '@/app/types'
import type { SemesterName } from '@/pages/My Schedule/types'
import SemesterSchedule, { ScheduleTable, ScheduleTableRow, EmptyCell, FilledCell } from './components/SemesterSchedule'
import { MY_SCHEDULE } from '@/app/styles/colors'

import './index.css'

const MySchedule: React.FC = () => {
    const { schedules } = useApp()

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

    const { isHovered, hoverProps } = useHover()
    const { isFocused, focusProps } = useFocus()

    const renderScheduleTable = (semester: SemesterName) => {
        const scheduleData = getScheduleForSemester(semester)

        return (
            <ScheduleTable>
                {scheduleData.days.map((daySchedule, dayIndex) => {
                    const isLastRow = dayIndex === scheduleData.days.length - 1
                    const dayType = daySchedule.dayLabel as NonNullable<DayType>
                    return (
                        <ScheduleTableRow
                            key={daySchedule.dayLabel}
                            isLastRow={isLastRow}
                            dayType={dayType}
                        >
                            {daySchedule.classes.map((classId: string | null, periodIndex: number) => {
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
                    )
                })}
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
                    <h2 className="text-xl font-bold flex flex-wrap items-baseline gap-2" style={{ color: MY_SCHEDULE.TEXT_PRIMARY }}>
                        <span>Schedule for</span>
                        <select
                            value={selectedTermId || ''}
                            onChange={(e) => setTermId(e.target.value || null)}
                            className="bg-right max-w-full text-ellipsis appearance-none outline-none bg-no-repeat cursor-pointer"
                            style={{
                                ...arrowStyle,
                                color: MY_SCHEDULE.SIDEBAR_ACTIVE_TAB_GREEN_BG,
                                borderBottom: `2px ${(isHovered || isFocused) ? 'solid' : 'dashed'} ${isFocused ? MY_SCHEDULE.SIDEBAR_ACTIVE_TAB_GREEN_BG : MY_SCHEDULE.BORDER_PRIMARY}`,
                                backgroundSize: '1em 1em',
                                padding: '0 1.25rem 0.125rem 0',
                            }}
                            {...hoverProps}
                            {...focusProps}
                        >
                            {academicTerms.length === 0 && <option value="">no terms available</option>}
                            {academicTerms.length > 0 && academicTerms.map(term => (
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

                {schedules.type === 'alternating-ab'
                    ? selectedTermId
                        ? (
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
                        )
                    : null
                }
            </div>
        </div>
    )
}

export default MySchedule
