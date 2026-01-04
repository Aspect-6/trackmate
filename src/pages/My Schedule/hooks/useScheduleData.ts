import { useState, useEffect } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { TermSchedule } from '@/app/types'
import type { SemesterScheduleData, SemesterName, ScheduleDayType } from '@/pages/My Schedule/types'
import { GLOBAL } from '@/app/styles/colors'

/**
 * Generates an SVG dropdown arrow with the given color
 */
const getArrowSvg = (color: string) => {
    const encodedColor = encodeURIComponent(color)
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${encodedColor}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`
}

const EMPTY_SEMESTER: SemesterScheduleData = {
    aDay: [null, null, null, null],
    bDay: [null, null, null, null]
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
 * Custom hook for managing schedule data.
 * Now uses termSchedules from AppContext instead of its own localStorage.
 */
export const useScheduleData = () => {
    const {
        getClassById,
        openModal,
        filteredAcademicTerms,
        scheduleStore,
        updateTermSchedule
    } = useApp()

    // Currently selected term
    const [selectedTermId, setSelectedTermId] = useState<string | null>(null)

    // Auto-select the current term based on today's date
    useEffect(() => {
        if (selectedTermId !== null) return // Don't override if already set

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

    // Arrow color for dropdown (reads from CSS)
    const [arrowColor, setArrowColor] = useState('')

    // Read the accent color from CSS on mount and theme change
    useEffect(() => {
        const updateColor = () => {
            const color = getComputedStyle(document.documentElement)
                .getPropertyValue(GLOBAL.SIDEBAR_ACTIVE_TAB_GREEN_BG.slice(4, -1))
                .trim()
            if (color) setArrowColor(color)
        }
        updateColor()

        // Watch for theme changes
        const observer = new MutationObserver(updateColor)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    const arrowStyle = { backgroundImage: getArrowSvg(arrowColor) }

    // Current term's schedule data from context
    const currentSchedule = getScheduleForTerm(scheduleStore.terms, selectedTermId)

    const setTermId = (termId: string | null) => {
        setSelectedTermId(termId)
    }

    /**
     * Updates a cell in the schedule (for both semester and year-long classes)
     */
    const updateCell = (
        semester: SemesterName,
        dayType: ScheduleDayType,
        periodIndex: number,
        classId: string | null,
        isSemesterClass: boolean
    ) => {
        if (!selectedTermId) return

        let newSchedule: TermSchedule

        if (isSemesterClass) {
            // Semester class: fill BOTH A and B days at this period
            newSchedule = {
                ...currentSchedule,
                [semester]: {
                    aDay: currentSchedule[semester].aDay.map((id, i) => i === periodIndex ? classId : id),
                    bDay: currentSchedule[semester].bDay.map((id, i) => i === periodIndex ? classId : id)
                }
            }
        } else {
            // Year-long class: only fill the specific slot that was clicked
            const dayKey = dayType === 'A' ? 'aDay' : 'bDay'
            newSchedule = {
                ...currentSchedule,
                [semester]: {
                    ...currentSchedule[semester],
                    [dayKey]: currentSchedule[semester][dayKey].map(
                        (id, i) => i === periodIndex ? classId : id
                    )
                }
            }
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
     * Removes a class from a cell (handles semester vs year-long logic)
     */
    const handleRemove = (semester: SemesterName, dayType: ScheduleDayType, periodIndex: number) => {
        const dayKey = dayType === 'A' ? 'aDay' : 'bDay'
        const classId = currentSchedule[semester][dayKey][periodIndex]
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
