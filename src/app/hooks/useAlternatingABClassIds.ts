import { useSchedules, useAcademicTerms, useNoSchool } from '@/app/hooks/entities'
import { getActiveTerm, getActiveSemester } from '@/app/lib/schedule'
import type { Semester } from '@/app/types'

/**
 * Gets classes for a given date from the alternating A/B schedule.
 * Determines the active term, semester, and day type to return the correct class list.
 */
export const useAlternatingABClassIds = (date: string) => {
    const { schedules, getDayTypeForDate } = useSchedules()
    const { filteredAcademicTerms } = useAcademicTerms()

    // Find the active term for this date
    const activeTerm = getActiveTerm(date, filteredAcademicTerms)

    if (!activeTerm) return { classIds: [] }

    // Get the day type for this date
    const dayType = getDayTypeForDate(date, activeTerm, useNoSchool().noSchoolPeriods)
    if (!dayType) return { classIds: [] }

    // Determine which semester we're in based on actual semester dates
    const activeSemester = getActiveSemester(date, activeTerm)
    const semester = activeSemester?.name as Semester['name'] | undefined

    if (!semester) return { classIds: [] }

    // Get the schedule data for this term
    const termSchedule = schedules['alternating-ab']?.terms[activeTerm.id]
    if (!termSchedule) return { classIds: [] }

    const semesterData = termSchedule[semester]
    if (!semesterData) return { classIds: [] }

    const daySchedule = semesterData.days.find(day => day.dayLabel === dayType)
    if (!daySchedule) return { classIds: [] }

    return { classIds: daySchedule.classes }
}
