import React from "react"
import { useFixedWeeklySchedule } from "@/pages/My Schedule/hooks/useFixedWeeklySchedule"
import type { SemesterName } from "@/pages/My Schedule/types"
import type { ScheduleRendererProps } from "@/app/contexts/ScheduleComponentsContext"
import { DEFAULT_FIXED_WEEKLY_WEEKDAYS } from "@/app/lib/schedule"
import FixedWeeklySchedule, {
    ScheduleTable,
    ScheduleTableRow,
    FooterRow,
    EmptyCell,
    FilledCell,
} from "../FixedWeeklySchedule"

const SEMESTERS: SemesterName[] = ["Fall", "Spring"]

/**
 * Renderer for fixed weekly schedule (Mon–Fri columns, variable class rows).
 * Uses useFixedWeeklySchedule hook for operations.
 */
const FixedWeeklyRenderer: React.FC<ScheduleRendererProps> = ({ selectedTermId }) => {
    const {
        getScheduleForSemester,
        handleCellClick,
        handleRemove,
        handleAddRow,
        handleRemoveRow,
        rowCountForSemester,
        getClassById,
    } = useFixedWeeklySchedule(selectedTermId)

    const renderScheduleTable = (semester: SemesterName) => {
        const scheduleData = getScheduleForSemester(semester)
        const rowCount = rowCountForSemester(semester)
        const lastDayIndex = DEFAULT_FIXED_WEEKLY_WEEKDAYS.length - 1

        return (
            <ScheduleTable>
                {Array.from({ length: rowCount }, (_, rowIndex) => {
                    const isLastRow = rowIndex === rowCount - 1
                    return (
                        <ScheduleTableRow key={rowIndex}>
                            {DEFAULT_FIXED_WEEKLY_WEEKDAYS.map((day, dayIndex) => {
                                const daySchedule = scheduleData.days.find(d => d.dayLabel === day)
                                const classId = daySchedule?.classes[rowIndex] ?? null
                                const classData = classId ? getClassById(classId) : null

                                return classData ? (
                                    <FilledCell
                                        key={day}
                                        isLastRow={isLastRow}
                                        classData={classData}
                                        onRemove={() => handleRemove(semester, day, rowIndex)}
                                        showColumnDivider={dayIndex < lastDayIndex}
                                    />
                                ) : (
                                    <EmptyCell
                                        key={day}
                                        isLastRow={isLastRow}
                                        onClick={() => handleCellClick(semester, day, rowIndex)}
                                        showColumnDivider={dayIndex < lastDayIndex}
                                    />
                                )
                            })}
                        </ScheduleTableRow>
                    )
                })}
                <FooterRow
                    onAddRow={() => handleAddRow(semester)}
                    onRemoveLastRow={() => handleRemoveRow(semester, rowCount - 1)}
                    showRemoveLastRow={rowCount > 1}
                />
            </ScheduleTable>
        )
    }

    return (
        <>
            {SEMESTERS.map(semester => (
                <FixedWeeklySchedule key={semester} title={semester}>
                    {renderScheduleTable(semester)}
                </FixedWeeklySchedule>
            ))}
        </>
    )
}

export default FixedWeeklyRenderer
