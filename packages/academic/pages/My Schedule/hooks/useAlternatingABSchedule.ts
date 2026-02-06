import { useModal } from "@/app/contexts/ModalContext"
import { useClasses, useSchedules } from "@/app/hooks/entities"
import type { TermSchedule, SemesterScheduleData, DaySchedule, AlternatingABDayType } from "@/app/types"
import type { SemesterName, ScheduleDayType } from "@/pages/My Schedule/types"

// Constants
const createEmptyDay = (label: NonNullable<AlternatingABDayType>): DaySchedule => ({
    dayLabel: label,
    classes: [null, null, null, null]
})

const EMPTY_SEMESTER: SemesterScheduleData = {
    days: [createEmptyDay("A"), createEmptyDay("B")]
}

const EMPTY_TERM_SCHEDULE: TermSchedule = {
    Fall: { ...EMPTY_SEMESTER },
    Spring: { ...EMPTY_SEMESTER }
}

// Helpers
const getScheduleForTerm = (store: Record<string, TermSchedule>, termId: string | null): TermSchedule => {
    if (!termId) return EMPTY_TERM_SCHEDULE
    return store[termId] || EMPTY_TERM_SCHEDULE
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
export const useAlternatingABSchedule = (selectedTermId: string | null) => {
    const { schedules, updateTermSchedule } = useSchedules()
    const { openModal } = useModal()
    const { getClassById } = useClasses()

    // Get terms from the alternating-ab data
    const terms = schedules["alternating-ab"]?.terms || {}
    const currentSchedule = getScheduleForTerm(terms, selectedTermId)

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

        updateTermSchedule(selectedTermId, newSchedule)
    }

    const handleCellClick = (semester: SemesterName, dayType: ScheduleDayType, periodIndex: number) => {
        const otherSemester: SemesterName = semester === "Fall" ? "Spring" : "Fall"
        openModal("semester-class-selector", {
            semester,
            dayType,
            periodIndex,
            termId: selectedTermId,
            otherSemesterSchedule: currentSchedule[otherSemester],
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
        getScheduleForSemester,
        handleCellClick,
        handleRemove,
        getClassById
    }
}
