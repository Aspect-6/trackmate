import { useMemo } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useClasses, useSchedules } from "@/app/hooks/entities"
import { createEmptyTermSchedule } from "@/app/hooks/entities/useSchedules"
import { useSettings } from "@/app/hooks/useSettings"
import type { ScheduleType, TermSchedule, SemesterScheduleData, DaySchedule } from "@/app/types"
import type { SemesterName, ScheduleDayType } from "@/pages/My Schedule/types"

// Helpers
const getScheduleForTerm = (
    store: Record<string, TermSchedule>,
    termId: string | null,
    emptyFallback: TermSchedule
): TermSchedule => {
    if (!termId) return emptyFallback
    return store[termId] || emptyFallback
}

const findDayByLabel = (semester: SemesterScheduleData, label: string): DaySchedule => {
    const day = semester.days.find(day => day.dayLabel === label)
    if (!day) throw new Error(`Day ${label} not found in schedule`)
    return day
}

/**
 * Hook for alternating A/B schedule operations.
 * Provides schedule data access and cell manipulation functions.
 */
export const useAlternatingABSchedule = (selectedTermId: string | null, scheduleType: ScheduleType) => {
    const { schedules, updateTermSchedule } = useSchedules()
    const { periodCount: settingsPeriodCount } = useSettings()
    const { openModal } = useModal()
    const { getClassById } = useClasses()

    const storageKey = scheduleType as "alternating-ab" | "alternating-ab-semester"
    const terms = schedules[storageKey]?.terms || {}
    const emptyFallback = useMemo(() => {
        return createEmptyTermSchedule(scheduleType, settingsPeriodCount)
    }, [scheduleType, settingsPeriodCount])
    const currentSchedule = getScheduleForTerm(terms, selectedTermId, emptyFallback)

    const getScheduleForSemester = (semester: SemesterName): SemesterScheduleData => currentSchedule[semester]

    const updateCell = (
        semester: SemesterName,
        dayType: ScheduleDayType,
        periodIndex: number,
        classId: string | null,
        isSemesterClass: boolean
    ) => {
        if (!selectedTermId) return

        const semesterData = currentSchedule[semester]
        let newDays: DaySchedule[]

        if (isSemesterClass) {
            newDays = semesterData.days.map(day => ({
                ...day,
                classes: day.classes.map((id, i) => i === periodIndex ? classId : id)
            }))
        } else {
            newDays = semesterData.days.map(day =>
                day.dayLabel === dayType
                    ? { ...day, classes: day.classes.map((id, i) => i === periodIndex ? classId : id) }
                    : day
            )
        }

        const newSchedule: TermSchedule = {
            ...currentSchedule,
            [semester]: { days: newDays }
        }

        updateTermSchedule(selectedTermId, newSchedule, scheduleType)
    }

    const handleCellClick = (semester: SemesterName, dayType: ScheduleDayType, periodIndex: number) => {
        openModal("class-selector", {
            scheduleType,
            semester,
            periodIndex,
            termId: selectedTermId,
            dayLabel: dayType === "A" ? "A-Day" : "B-Day",
            onSelect: (classId: string | null, isSemesterClass: boolean) => {
                updateCell(semester, dayType, periodIndex, classId, isSemesterClass)
            }
        })
    }

    const handleRemove = (semester: SemesterName, dayType: ScheduleDayType, periodIndex: number) => {
        const daySchedule = findDayByLabel(currentSchedule[semester], dayType)
        const classId = daySchedule.classes[periodIndex]
        const classData = classId ? getClassById(classId) : null
        const isSemesterClass = classData?.semesterId ? true : false

        updateCell(semester, dayType, periodIndex, null, isSemesterClass)
    }

    return {
        periodCount: currentSchedule.periodCount,
        getScheduleForSemester,
        handleCellClick,
        handleRemove,
        getClassById
    }
}
