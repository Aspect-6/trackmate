import { parseDateLocal, dateToLocalISOString } from "@shared/lib"
import type { Schedules, DayType, AcademicTerm, NoSchoolPeriod } from "@/app/types"


export const isWeekend = (dateString: string): boolean => {
    const date = parseDateLocal(dateString)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
}

export const isWithinPeriod = (date: Date, period: { startDate: string, endDate: string }) => {
    const start = parseDateLocal(period.startDate)
    const end = parseDateLocal(period.endDate)
    return date >= start && date <= end
}

export const getNoSchoolPeriod = (dateString: string, noSchoolPeriods: NoSchoolPeriod[]): NoSchoolPeriod | undefined => {
    const date = parseDateLocal(dateString)
    return noSchoolPeriods.find(period => isWithinPeriod(date, period))
}

export const getActiveTerm = (dateString: string, terms: AcademicTerm[]): AcademicTerm | undefined => {
    const date = parseDateLocal(dateString)
    return terms.find(term => isWithinPeriod(date, term))
}

export const getActiveSemester = (dateString: string, activeTerm: AcademicTerm) => {
    const date = parseDateLocal(dateString)
    return activeTerm.semesters.find(semester => isWithinPeriod(date, semester))
}

export const getActiveQuarter = (dateString: string, activeTerm: AcademicTerm) => {
    const date = parseDateLocal(dateString)
    return activeTerm.semesters
        .flatMap(semester => semester.quarters || [])
        .find(quarter => isWithinPeriod(date, quarter))
}

/**
 * Calculates the A/B day type for a given date string.
 * Pure function independent of React hooks.
 * 
 * @param dateString - Date in YYYY-MM-DD format
 * @param schedules - The full schedules data object (containing type and A/B config)
 * @param activeTerm - The academic term active for this date (if any)
 * @param noSchoolPeriods - List of all no-school periods (holidays, breaks)
 * @returns "A", "B", or null (for weekends, no-school days, or non-alternating schedules)
 */
export const calculateDayType = (
    dateString: string,
    schedules: Schedules,
    activeTerm: AcademicTerm | undefined,
    noSchoolPeriods: NoSchoolPeriod[]
): DayType => {
    if (schedules.type !== "alternating-ab") return null
    if (!activeTerm) return null

    const abData = schedules["alternating-ab"]
    if (!abData) return null

    if (isWeekend(dateString)) return null
    if (getNoSchoolPeriod(dateString, noSchoolPeriods)) return null

    if (!getActiveSemester(dateString, activeTerm)) return null
    if (activeTerm.termType === "Semesters With Quarters" && !getActiveQuarter(dateString, activeTerm)) return null

    // Find the most recent override ON OR BEFORE this target date to use as reference
    if (abData.dayTypeOverrides[dateString]) return abData.dayTypeOverrides[dateString]
    const overrideDates = Object.keys(abData.dayTypeOverrides).sort()
    const lastValidOverride = overrideDates.filter(date => date <= dateString).pop()

    const refDate = lastValidOverride || activeTerm.startDate
    const refType = lastValidOverride ? abData.dayTypeOverrides[lastValidOverride]! : abData.startDayType

    // Count school days from reference point
    const current = parseDateLocal(refDate)
    const target = parseDateLocal(dateString)

    if (target < current) return null

    let count = 0
    while (current < target) {
        const currentStr = dateToLocalISOString(current)
        if (!isWeekend(currentStr) && !getNoSchoolPeriod(currentStr, noSchoolPeriods)) {
            count++
        }
        current.setDate(current.getDate() + 1)
    }

    const isEven = count % 2 === 0
    return isEven ? refType : (refType === "A" ? "B" : "A")
}
