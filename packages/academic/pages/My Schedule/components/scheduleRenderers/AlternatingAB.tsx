import React from "react"
import { useAlternatingABSchedule } from "@/pages/My Schedule/hooks/useAlternatingABSchedule"
import type { DayType } from "@/app/types"
import type { SemesterName } from "@/pages/My Schedule/types"
import type { ScheduleRendererProps } from "@/app/contexts/ScheduleComponentsContext"
import AlternatingDaysSchedule, { ScheduleTable, ScheduleTableRow, EmptyCell, FilledCell } from "../AlternatingDaysSchedule"

/**
 * Renderer for alternating A/B day schedule.
 * Uses useAlternatingABSchedule hook for operations.
 */
const AlternatingABRenderer: React.FC<ScheduleRendererProps> = ({ selectedTermId }) => {
    const {
        getScheduleForSemester,
        handleCellClick,
        handleRemove,
        getClassById
    } = useAlternatingABSchedule(selectedTermId)

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
        <>
            <AlternatingDaysSchedule title="Fall Semester">
                {renderScheduleTable("Fall")}
            </AlternatingDaysSchedule>
            <AlternatingDaysSchedule title="Spring Semester">
                {renderScheduleTable("Spring")}
            </AlternatingDaysSchedule>
        </>
    )
}

export default AlternatingABRenderer
