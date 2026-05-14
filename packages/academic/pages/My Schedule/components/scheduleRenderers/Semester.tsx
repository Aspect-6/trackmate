import React from "react"
import { useSemesterSchedule } from "@/pages/My Schedule/hooks/useSemesterSchedule"
import { useSettings } from "@/app/hooks/useSettings"
import type { SemesterName } from "@/pages/My Schedule/types"
import type { ScheduleRendererProps } from "@/app/contexts/ScheduleComponentsContext"
import { Info } from "lucide-react"
import SemesterSchedule, { ScheduleTable, ScheduleTableRow, EmptyCell, FilledCell } from "../SemesterSchedule"
import { MY_SCHEDULE } from "@/app/styles/colors"

const SEMESTERS: SemesterName[] = ["Fall", "Spring"]

/**
 * Renderer for the semester schedule.
 * Shows one combined table with two rows (Fall, Spring) under a shared period
 * header. Each row's classes apply every weekday of that semester.
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
    const hasPeriodMismatch = periodCount !== settingsPeriodCount

    return (
        <SemesterSchedule>
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
                        Updating the number of periods still work identically.
                    </span>
                </div>
            )}
            <ScheduleTable periodCount={periodCount}>
                {SEMESTERS.map((semester, semesterIndex) => {
                    const scheduleData = getScheduleForSemester(semester)
                    // Semester format always has exactly one day row per semester.
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
