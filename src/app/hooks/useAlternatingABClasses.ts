import { useApp } from '@/app/contexts/AppContext'
import { useAcademicTerms } from '@/app/hooks/entities'

/**
 * Gets classes for a given date from the alternating A/B schedule.
 * Determines the active term, semester, and day type to return the correct class list.
 */
export const useAlternatingABClasses = (date: string) => {
    const { schedules, getDayTypeForDate } = useApp()
    const { filteredAcademicTerms } = useAcademicTerms()

    // Find the active term for this date
    const activeTerm = filteredAcademicTerms.find(term => {
        const start = new Date(term.startDate)
        const end = new Date(term.endDate)
        const dateObj = new Date(date)
        return dateObj >= start && dateObj <= end
    })

    if (!activeTerm) return { classIds: [] }

    // Get the day type for this date
    const dayType = getDayTypeForDate(date)
    if (!dayType) return { classIds: [] }

    // Determine which semester we're in based on actual semester dates
    const dateObj = new Date(date)
    const fallSemester = activeTerm.semesters?.find(semester => semester.name === 'Fall')
    const springSemester = activeTerm.semesters?.find(semester => semester.name === 'Spring')

    let semester: 'Fall' | 'Spring' | null = null
    if (fallSemester) {
        const fallStart = new Date(fallSemester.startDate)
        const fallEnd = new Date(fallSemester.endDate)
        if (dateObj >= fallStart && dateObj <= fallEnd) {
            semester = 'Fall'
        }
    }
    if (!semester && springSemester) {
        const springStart = new Date(springSemester.startDate)
        const springEnd = new Date(springSemester.endDate)
        if (dateObj >= springStart && dateObj <= springEnd) {
            semester = 'Spring'
        }
    }

    // If date doesn't fall within either semester, return empty
    if (!semester) return { classIds: [] }

    // Get the schedule data for this term
    const terms = schedules['alternating-ab']?.terms || {}
    const termSchedule = terms[activeTerm.id]
    if (!termSchedule) return { classIds: [] }

    const semesterData = termSchedule[semester]
    if (!semesterData) return { classIds: [] }

    // Find the day schedule matching the day type
    const daySchedule = semesterData.days.find(day => day.dayLabel === dayType)
    if (!daySchedule) return { classIds: [] }

    return { classIds: daySchedule.classes }
}
