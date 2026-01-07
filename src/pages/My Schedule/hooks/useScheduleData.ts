import { useState, useEffect } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { TermSchedule, SemesterScheduleData, DaySchedule } from '@/app/types'
import type { SemesterName, ScheduleDayType } from '@/pages/My Schedule/types'
import { GLOBAL } from '@/app/styles/colors'

/**
 * Generates an SVG dropdown arrow with the given color
 */
const getArrowSvg = (color: string) => {
    const encodedColor = encodeURIComponent(color)
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${encodedColor}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`
}

const EMPTY_DAY: DaySchedule = { dayLabel: 'A', classes: [null, null, null, null] }

const EMPTY_SEMESTER: SemesterScheduleData = {
    days: [
        { dayLabel: 'A', classes: [null, null, null, null] },
        { dayLabel: 'B', classes: [null, null, null, null] }
    ]
}

const EMPTY_TERM_SCHEDULE: TermSchedule = {
    Fall: { ...EMPTY_SEMESTER },
    Spring: { ...EMPTY_SEMESTER }
}

/**
 * Gets schedule for a specific term from the store, or empty schedule if not found.
 */
const getScheduleForTerm = (store: Record<string, TermSchedule>, termId: string | null): TermSchedule => {
    if (!termId) return EMPTY_TERM_SCHEDULE
    return store[termId] || EMPTY_TERM_SCHEDULE
}

/**
 * Helper to find a day schedule by label
 */
const findDayByLabel = (semester: SemesterScheduleData, label: string): DaySchedule => {
    return semester.days.find(d => d.dayLabel === label) || EMPTY_DAY
}

/**
 * Custom hook for managing schedule data.
 */
export const useScheduleData = () => {
    const {
        getClassById,
        openModal,
        filteredAcademicTerms,
        schedules,
        updateTermSchedule
    } = useApp()

    // Get terms from the alternating-ab data
    const terms = schedules.type === 'alternating-ab'
        ? schedules['alternating-ab']?.terms || {}
        : {}

    // Currently selected term
    const [selectedTermId, setSelectedTermId] = useState<string | null>(null)

    // Auto-select the current term based on today's date
    useEffect(() => {
        if (selectedTermId !== null) return

        const today = new Date()
        const currentTerm = filteredAcademicTerms.find(term => {
            const start = new Date(term.startDate)
            const end = new Date(term.endDate)
            return today >= start && today <= end
        })

        if (currentTerm) {
            setSelectedTermId(currentTerm.id)
        }
    }, [filteredAcademicTerms, selectedTermId])

    // Arrow color for dropdown
    const [arrowColor, setArrowColor] = useState('')

    useEffect(() => {
        const updateColor = () => {
            const color = getComputedStyle(document.documentElement)
                .getPropertyValue(GLOBAL.SIDEBAR_ACTIVE_TAB_GREEN_BG.slice(4, -1))
                .trim()
            if (color) setArrowColor(color)
        }
        updateColor()

        const observer = new MutationObserver(updateColor)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    const arrowStyle = { backgroundImage: getArrowSvg(arrowColor) }

    // Current term's schedule data
    const currentSchedule = getScheduleForTerm(terms, selectedTermId)

    const setTermId = (termId: string | null) => {
        setSelectedTermId(termId)
    }

    /**
     * Updates a cell in the schedule
     */
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
            // Semester class: fill ALL days at this period
            newDays = semesterData.days.map(day => ({
                ...day,
                classes: day.classes.map((id, i) => i === periodIndex ? classId : id)
            }))
        } else {
            // Year-long class: only fill the specific day
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

    /**
     * Opens modal to select a class for a cell
     */
    const handleCellClick = (semester: SemesterName, dayType: ScheduleDayType, periodIndex: number) => {
        const otherSemester: SemesterName = semester === 'Fall' ? 'Spring' : 'Fall'
        openModal('semester-class-selector', {
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

    /**
     * Removes a class from a cell
     */
    const handleRemove = (semester: SemesterName, dayType: ScheduleDayType, periodIndex: number) => {
        const daySchedule = findDayByLabel(currentSchedule[semester], dayType)
        const classId = daySchedule.classes[periodIndex]
        const classData = classId ? getClassById(classId) : null
        const isSemesterClass = classData?.semesterId ? true : false

        updateCell(semester, dayType, periodIndex, null, isSemesterClass)
    }

    /**
     * Gets schedule data for a specific semester
     */
    const getScheduleForSemester = (semester: SemesterName): SemesterScheduleData => {
        return currentSchedule[semester]
    }

    return {
        selectedTermId,
        setTermId,
        academicTerms: filteredAcademicTerms,
        arrowStyle,
        handleCellClick,
        handleRemove,
        getScheduleForSemester,
        getClassById
    }
}
