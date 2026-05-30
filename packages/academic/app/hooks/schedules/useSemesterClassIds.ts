import { useSchedules, useAcademicTerms, useNoSchool } from "@/app/hooks/entities"
import {
    getActiveTerm,
    getActiveSemester,
    getNoSchoolPeriod,
    isWeekend
} from "@/app/lib/schedule"
import type { Semester } from "@/app/types"

/**
 * Gets classes for a given date from the semester schedule
 */
export const useSemesterClassIds = (date: string) => {
    const { schedules } = useSchedules()
    const { academicTerms } = useAcademicTerms()
    const { noSchoolPeriods } = useNoSchool()

    const activeTerm = getActiveTerm(date, academicTerms)
    if (!activeTerm) return { classIds: [] }

    if (isWeekend(date)) return { classIds: [] }
    if (getNoSchoolPeriod(date, noSchoolPeriods)) return { classIds: [] }

    const activeSemester = getActiveSemester(date, activeTerm)
    const semester = activeSemester?.name as Semester["name"] | undefined
    if (!semester) return { classIds: [] }

    const termSchedule = schedules["semester"]?.terms[activeTerm.id]
    if (!termSchedule) return { classIds: [] }

    const semesterData = termSchedule[semester]
    const daySchedule = semesterData?.days[0]
    if (!daySchedule) return { classIds: [] }

    return { classIds: daySchedule.classes }
}
