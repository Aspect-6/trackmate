import React from "react"
import { useAlternatingABYearLongSchedule } from "@/pages/My Schedule/hooks/useAlternatingABYearLongSchedule"
import { useSettings } from "@/app/hooks/useSettings"
import type { AlternatingABDayType } from "@/app/types"
import type { ScheduleRendererProps } from "@/app/contexts/ScheduleComponentsContext"
import AlternatingDaysSchedule, { ScheduleTable, ScheduleTableRow, EmptyCell, FilledCell } from "../AlternatingDaysSchedule"
import PeriodMismatchWarning from "../PeriodMismatchWarning"

/**
 * Renderer for the year-long-only alternating A/B day schedule.
 * Shows a single A/B table since both semesters are always identical.
 */
const AlternatingABYearLongRenderer: React.FC<ScheduleRendererProps> = ({ selectedTermId }) => {
    const {
        periodCount,
        getScheduleData,
        handleCellClick,
        handleRemove,
        getClassById
    } = useAlternatingABYearLongSchedule(selectedTermId)
    const { periodCount: settingsPeriodCount } = useSettings()

    const scheduleData = getScheduleData()

    return (
        <>
            <PeriodMismatchWarning
                schedulePeriodCount={periodCount}
                settingsPeriodCount={settingsPeriodCount}
            />
            <AlternatingDaysSchedule title="A/B Schedule">
                <ScheduleTable periodCount={periodCount}>
                    {scheduleData.days.map((daySchedule, dayIndex) => {
                        const isLastRow = dayIndex === scheduleData.days.length - 1
                        const dayType = daySchedule.dayLabel as NonNullable<AlternatingABDayType>
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
                                            onRemove={() => handleRemove(dayType, periodIndex)}
                                        />
                                    ) : (
                                        <EmptyCell
                                            key={periodIndex}
                                            isLastRow={isLastRow}
                                            onClick={() => handleCellClick(dayType, periodIndex)}
                                        />
                                    )
                                })}
                            </ScheduleTableRow>
                        )
                    })}
                </ScheduleTable>
            </AlternatingDaysSchedule>
        </>
    )
}

export default AlternatingABYearLongRenderer
