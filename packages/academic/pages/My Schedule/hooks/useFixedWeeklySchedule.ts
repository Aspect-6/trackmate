import { useMemo } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useClasses, useSchedules } from "@/app/hooks/entities"
import { createEmptyTermSchedule } from "@/app/hooks/entities/useSchedules"
import { DEFAULT_FIXED_WEEKLY_WEEKDAYS } from "@/app/lib/schedule"
import type { TermSchedule, SemesterScheduleData, Weekday } from "@/app/types"
import type { SemesterName } from "@/pages/My Schedule/types"

const getScheduleForTerm = (
    store: Record<string, TermSchedule>,
    termId: string | null,
    emptyFallback: TermSchedule
): TermSchedule => {
    if (!termId) return emptyFallback
    return store[termId] || emptyFallback
}

const padDayClasses = (classes: (string | null)[], rowCount: number): (string | null)[] => {
    const next = [...classes]
    while (next.length < rowCount) next.push(null)
    return next.slice(0, rowCount)
}

/**
 * Mon–Fri columns, equal-length rows; `periodCount` mirrors row count for this format.
 */
export const normalizeFixedWeeklyTermSchedule = (schedule: TermSchedule): TermSchedule => {
    const fixSem = (sem: SemesterScheduleData): SemesterScheduleData => {
        const map = new Map(sem.days.map(d => [d.dayLabel, [...d.classes]]))
        const rowCount = Math.max(
            1,
            ...DEFAULT_FIXED_WEEKLY_WEEKDAYS.map(d => map.get(d)?.length ?? 0)
        )
        const days = DEFAULT_FIXED_WEEKLY_WEEKDAYS.map(day => ({
            dayLabel: day,
            classes: padDayClasses(map.get(day) ?? [], rowCount)
        }))
        return { days }
    }
    const Fall = fixSem(schedule.Fall)
    const Spring = fixSem(schedule.Spring)
    return {
        ...schedule,
        Fall,
        Spring,
        periodCount: Math.max(
            Fall.days[0]?.classes.length ?? 1,
            Spring.days[0]?.classes.length ?? 1
        )
    }
}

/**
 * Fixed weekly: college-style grid — columns Mon–Fri, rows = ordered class slots (not tied to settings period count).
 */
export const useFixedWeeklySchedule = (selectedTermId: string | null) => {
    const { schedules, updateTermSchedule } = useSchedules()
    const { openModal } = useModal()
    const { getClassById } = useClasses()

    const terms = schedules["fixed-weekly"]?.terms || {}
    const emptyFallback = useMemo(() => createEmptyTermSchedule("fixed-weekly", 1), [])
    const rawSchedule = getScheduleForTerm(terms, selectedTermId, emptyFallback)
    const currentSchedule = useMemo(
        () => normalizeFixedWeeklyTermSchedule(rawSchedule),
        [rawSchedule]
    )

    const persist = (next: TermSchedule) => {
        if (!selectedTermId) return
        updateTermSchedule(selectedTermId, normalizeFixedWeeklyTermSchedule(next), "fixed-weekly")
    }

    const getScheduleForSemester = (semester: SemesterName): SemesterScheduleData =>
        currentSchedule[semester]

    const updateCell = (
        semester: SemesterName,
        weekday: Weekday,
        rowIndex: number,
        classId: string | null
    ) => {
        const semesterData = currentSchedule[semester]
        const newDays = semesterData.days.map(day =>
            day.dayLabel === weekday
                ? {
                    ...day,
                    classes: day.classes.map((id, i) => (i === rowIndex ? classId : id))
                }
                : day
        )
        persist({
            ...currentSchedule,
            [semester]: { days: newDays }
        })
    }

    const handleCellClick = (semester: SemesterName, weekday: Weekday, rowIndex: number) => {
        openModal("class-selector", {
            scheduleType: "fixed-weekly",
            semester,
            periodIndex: rowIndex,
            termId: selectedTermId,
            dayLabel: weekday,
            onSelect: (classId: string | null) => {
                updateCell(semester, weekday, rowIndex, classId)
            }
        })
    }

    const handleRemove = (semester: SemesterName, weekday: Weekday, rowIndex: number) => {
        updateCell(semester, weekday, rowIndex, null)
    }

    const handleAddRow = (semester: SemesterName) => {
        const semesterData = currentSchedule[semester]
        const newDays = semesterData.days.map(day => ({
            ...day,
            classes: [...day.classes, null]
        }))
        persist({
            ...currentSchedule,
            [semester]: { days: newDays }
        })
    }

    const handleRemoveRow = (semester: SemesterName, rowIndex: number) => {
        const semesterData = currentSchedule[semester]
        const rowCount = semesterData.days[0]?.classes.length ?? 1
        if (rowCount <= 1) return
        const newDays = semesterData.days.map(day => ({
            ...day,
            classes: day.classes.filter((_, i) => i !== rowIndex)
        }))
        persist({
            ...currentSchedule,
            [semester]: { days: newDays }
        })
    }

    return {
        rowCountForSemester: (semester: SemesterName) =>
            currentSchedule[semester].days[0]?.classes.length ?? 1,
        getScheduleForSemester,
        handleCellClick,
        handleRemove,
        handleAddRow,
        handleRemoveRow,
        getClassById
    }
}
