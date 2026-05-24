import { useMemo } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useClasses, useSchedules } from "@/app/hooks/entities"
import { createEmptyTermSchedule } from "@/app/hooks/entities/useSchedules"
import { useSettings } from "@/app/hooks/useSettings"
import type { TermSchedule, SemesterScheduleData, DaySchedule } from "@/app/types"
import type { ScheduleDayType } from "@/pages/My Schedule/types"

const getScheduleForTerm = (
    store: Record<string, TermSchedule>,
    termId: string | null,
    emptyFallback: TermSchedule
): TermSchedule => {
    if (!termId) return emptyFallback
    return store[termId] || emptyFallback
}

/**
 * Hook for the year-long-only alternating A/B schedule.
 * Reads from Fall as the canonical source but both semesters are identical.
 */
export const useAlternatingABYearLongSchedule = (selectedTermId: string | null) => {
    const { schedules, updateTermSchedule } = useSchedules()
    const { periodCount: settingsPeriodCount } = useSettings()
    const { openModal } = useModal()
    const { getClassById } = useClasses()

    const terms = schedules["alternating-ab"]?.terms || {}
    const emptyFallback = useMemo(() => {
        return createEmptyTermSchedule("alternating-ab", settingsPeriodCount)
    }, [settingsPeriodCount])
    const currentSchedule = getScheduleForTerm(terms, selectedTermId, emptyFallback)

    // Read from Fall as the canonical source
    const getScheduleData = (): SemesterScheduleData => currentSchedule.Fall

    const updateCell = (
        dayType: ScheduleDayType,
        periodIndex: number,
        classId: string | null,
    ) => {
        if (!selectedTermId) return

        const buildNewDays = (semesterData: SemesterScheduleData): DaySchedule[] => {
            return semesterData.days.map(day =>
                day.dayLabel === dayType
                    ? { ...day, classes: day.classes.map((id, i) => i === periodIndex ? classId : id) }
                    : day
            )
        }

        // Mirror write to both semesters
        const newSchedule: TermSchedule = {
            ...currentSchedule,
            Fall: { days: buildNewDays(currentSchedule.Fall) },
            Spring: { days: buildNewDays(currentSchedule.Spring) }
        }

        updateTermSchedule(selectedTermId, newSchedule, "alternating-ab")
    }

    const handleCellClick = (dayType: ScheduleDayType, periodIndex: number) => {
        openModal("class-selector", {
            scheduleType: "alternating-ab",
            semester: "Fall",
            periodIndex,
            termId: selectedTermId,
            dayLabel: dayType === "A" ? "A-Day" : "B-Day",
            onSelect: (classId: string | null) => {
                updateCell(dayType, periodIndex, classId)
            }
        })
    }

    const handleRemove = (dayType: ScheduleDayType, periodIndex: number) => {
        updateCell(dayType, periodIndex, null)
    }

    return {
        periodCount: currentSchedule.periodCount,
        getScheduleData,
        handleCellClick,
        handleRemove,
        getClassById
    }
}
