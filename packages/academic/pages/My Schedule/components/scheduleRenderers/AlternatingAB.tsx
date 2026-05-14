import React from "react"
import { useAlternatingABSchedule } from "@/pages/My Schedule/hooks/useAlternatingABSchedule"
import { useSettings } from "@/app/hooks/useSettings"
import type { AlternatingABDayType } from "@/app/types"
import type { SemesterName } from "@/pages/My Schedule/types"
import type { ScheduleRendererProps } from "@/app/contexts/ScheduleComponentsContext"
import { Info } from "lucide-react"
import AlternatingDaysSchedule, { ScheduleTable, ScheduleTableRow, EmptyCell, FilledCell } from "../AlternatingDaysSchedule"
import { MY_SCHEDULE } from "@/app/styles/colors"

/**
 * Renderer for alternating A/B day schedule.
 * Uses useAlternatingABSchedule hook for operations.
 */
const AlternatingABRenderer: React.FC<ScheduleRendererProps> = ({ selectedTermId }) => {
    const {
        periodCount,
        getScheduleForSemester,
        handleCellClick,
        handleRemove,
        getClassById
    } = useAlternatingABSchedule(selectedTermId)
    const { periodCount: settingsPeriodCount } = useSettings()
    const hasPeriodMismatch = periodCount !== settingsPeriodCount

    const renderScheduleTable = (semester: SemesterName) => {
        const scheduleData = getScheduleForSemester(semester)

        return (
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
            {hasPeriodMismatch && (
                <div
                    className="flex items-center gap-2 text-sm rounded-lg px-4 py-3 mb-6"
                    style={{
                        color: MY_SCHEDULE.PRIORITY_MEDIUM_TEXT,
                        backgroundColor: MY_SCHEDULE.PRIORITY_MEDIUM_BG,
                        border: `1px solid ${MY_SCHEDULE.PRIORITY_MEDIUM_BORDER}`,
                    }}
                >
                    <Info className="w-4 h-4 shrink-0" />
                    <span>
                        This schedule was created with {periodCount} period{periodCount === 1 ? "" : "s"}, and your current setting is {settingsPeriodCount} period{settingsPeriodCount === 1 ? "" : "s"}.
                        Updating the number of periods will still work identically.
                    </span>
                </div>
            )}
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
