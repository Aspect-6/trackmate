import { useMemo } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useClasses, useSchedules } from "@/app/hooks/entities"
import { createEmptyTermSchedule } from "@/app/hooks/entities/useSchedules"
import { useSettings } from "@/app/hooks/useSettings"
import type { TermSchedule, SemesterScheduleData, DaySchedule } from "@/app/types"
import type { SemesterName } from "@/pages/My Schedule/types"

const getScheduleForTerm = (
    store: Record<string, TermSchedule>,
    termId: string | null,
    emptyFallback: TermSchedule
): TermSchedule => {
    if (!termId) return emptyFallback
    return store[termId] || emptyFallback
}

/**
 * Hook for semester schedule operations.
 * Mirrors `useAlternatingABSchedule` but writes into the `"semester"` block,
 * and each semester has a single day row of classes (no A/B rotation).
 */
export const useSemesterSchedule = (selectedTermId: string | null) => {
    const { schedules, updateTermSchedule } = useSchedules()
    const { periodCount: settingsPeriodCount } = useSettings()
    const { openModal } = useModal()
    const { getClassById } = useClasses()

    const terms = schedules["semester"]?.terms || {}
    const emptyFallback = useMemo(() => {
        return createEmptyTermSchedule("semester", settingsPeriodCount)
    }, [settingsPeriodCount])
    const currentSchedule = getScheduleForTerm(terms, selectedTermId, emptyFallback)

    const getScheduleForSemester = (semester: SemesterName): SemesterScheduleData =>
        currentSchedule[semester]

    const updateCell = (
        semester: SemesterName,
        periodIndex: number,
        classId: string | null
    ) => {
        if (!selectedTermId) return

        const semesterData = currentSchedule[semester]
        const newDays: DaySchedule[] = semesterData.days.map(day => ({
            ...day,
            classes: day.classes.map((id, i) => (i === periodIndex ? classId : id))
        }))

        const newSchedule: TermSchedule = {
            ...currentSchedule,
            [semester]: { days: newDays }
        }

        updateTermSchedule(selectedTermId, newSchedule, "semester")
    }

    const handleCellClick = (semester: SemesterName, periodIndex: number) => {
        openModal("semester-class-selector", {
            semester,
            periodIndex,
            termId: selectedTermId,
            onSelect: (classId: string | null) => {
                updateCell(semester, periodIndex, classId)
            }
        })
    }

    const handleRemove = (semester: SemesterName, periodIndex: number) => {
        updateCell(semester, periodIndex, null)
    }

    return {
        periodCount: currentSchedule.periodCount,
        getScheduleForSemester,
        handleCellClick,
        handleRemove,
        getClassById
    }
}
