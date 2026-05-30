import { useSchedules, useAcademicTerms, useNoSchool } from "@/app/hooks/entities"
import {
    getActiveTerm,
    getActiveSemester,
    getNoSchoolPeriod,
    weekdayFromDateString,
} from "@/app/lib/schedule"
import type { Semester } from "@/app/types"

/**
 * Gets classes for a given date from the fixed weekly schedule.
 */
export const useFixedWeeklyClassIds = (date: string) => {
    const { schedules } = useSchedules()
    const { academicTerms } = useAcademicTerms()
    const { noSchoolPeriods } = useNoSchool()

    const activeTerm = getActiveTerm(date, academicTerms)
    if (!activeTerm || activeTerm.scheduleType !== "fixed-weekly") {
        return { classIds: [] as (string | null)[] }
    }

    const weekday = weekdayFromDateString(date)
    if (weekday == null) {
        return { classIds: [] as (string | null)[] }
    }

    if (getNoSchoolPeriod(date, noSchoolPeriods)) {
        return { classIds: [] as (string | null)[] }
    }

    const activeSemester = getActiveSemester(date, activeTerm)
    const semester = activeSemester?.name as Semester["name"] | undefined
    if (!semester) {
        return { classIds: [] as (string | null)[] }
    }

    const termSchedule = schedules["fixed-weekly"]?.terms[activeTerm.id]
    if (!termSchedule) {
        return { classIds: [] as (string | null)[] }
    }

    const semesterData = termSchedule[semester]
    const daySchedule = semesterData?.days.find(d => d.dayLabel === weekday)
    if (!daySchedule) {
        return { classIds: [] as (string | null)[] }
    }

    return { classIds: daySchedule.classes }
}
