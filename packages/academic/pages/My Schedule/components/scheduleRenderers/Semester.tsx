import React from "react"
import { useSemesterSchedule } from "@/pages/My Schedule/hooks/useSemesterSchedule"
import { useSettings } from "@/app/hooks/useSettings"
import type { SemesterName } from "@/pages/My Schedule/types"
import type { ScheduleRendererProps } from "@/app/contexts/ScheduleComponentsContext"
import SemesterSchedule, { ScheduleTable, ScheduleTableRow, EmptyCell, FilledCell } from "../SemesterSchedule"
import PeriodMismatchWarning from "../PeriodMismatchWarning"

const SEMESTERS: SemesterName[] = ["Fall", "Spring"]

/**
 * Renderer for the semester schedule.
 * Shows one combined table with two rows (Fall, Spring) under a shared period
 * header. Each row's classes apply every day of that semester.
 */
const SemesterRenderer: React.FC<ScheduleRendererProps> = ({ selectedTermId }) => {
    const {
        periodCount,
        getScheduleForSemester,
        handleCellClick,
        handleRemove,
        getClassById
    } = useSemesterSchedule(selectedTermId)
    const { periodCount: settingsPeriodCount } = useSettings()

    return (
        <SemesterSchedule>
            <PeriodMismatchWarning
                schedulePeriodCount={periodCount}
                settingsPeriodCount={settingsPeriodCount}
            />
            <ScheduleTable periodCount={periodCount}>
                {SEMESTERS.map((semester, semesterIndex) => {
                    const scheduleData = getScheduleForSemester(semester)
                    const daySchedule = scheduleData.days[0]
                    if (!daySchedule) return null

                    const isLastRow = semesterIndex === SEMESTERS.length - 1

                    return (
                        <ScheduleTableRow
                            key={semester}
                            isLastRow={isLastRow}
                            semester={semester}
                        >
                            {daySchedule.classes.map((classId: string | null, periodIndex: number) => {
                                const classData = classId ? getClassById(classId) : null
                                return classData ? (
                                    <FilledCell
                                        key={periodIndex}
                                        isLastRow={isLastRow}
                                        classData={classData}
                                        onRemove={() => handleRemove(semester, periodIndex)}
                                    />
                                ) : (
                                    <EmptyCell
                                        key={periodIndex}
                                        isLastRow={isLastRow}
                                        onClick={() => handleCellClick(semester, periodIndex)}
                                    />
                                )
                            })}
                        </ScheduleTableRow>
                    )
                })}
            </ScheduleTable>
        </SemesterSchedule>
    )
}

export default SemesterRenderer
