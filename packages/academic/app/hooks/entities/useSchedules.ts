import { useCallback } from "react"
import { useFirestoreDoc } from "@/app/hooks/data/useFirestore"
import { todayString } from "@shared/lib"
import { calculateDayType } from "@/app/lib/schedule"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"
import type { Schedules, ScheduleType, TermSchedule, DayType, AcademicTerm, NoSchoolPeriod } from "@/app/types"

const DEFAULT_SCHEDULES: Schedules = {
    type: "alternating-ab",
    "alternating-ab": {
        startDate: "2025-09-02",
        startDayType: "A",
        dayTypeOverrides: {},
        terms: {}
    }
}

/**
 * Hook for accessing and working with schedule configuration.
 * Manages the schedule type, A/B day configuration, and per-term schedules.
 */
export const useSchedules = () => {
    const [schedules, setSchedules] = useFirestoreDoc<Schedules>(FIRESTORE_KEYS.SCHEDULES, DEFAULT_SCHEDULES)

    // Actions
    const updateTermSchedule = useCallback((termId: string, newSchedule: TermSchedule): void => {
        setSchedules(prev => {
            const abData = prev["alternating-ab"]
            if (!abData) return prev
            return {
                ...prev,
                "alternating-ab": {
                    ...abData,
                    terms: {
                        ...abData.terms,
                        [termId]: newSchedule
                    }
                }
            }
        })
    }, [setSchedules])

    const setScheduleType = useCallback((type: ScheduleType): void => {
        setSchedules(prev => ({ ...prev, type }))
    }, [setSchedules])

    const setReferenceDayType = useCallback((type: NonNullable<DayType>): void => {
        const today = todayString()
        setSchedules(prev => {
            const abData = prev["alternating-ab"]
            if (!abData) return prev
            return {
                ...prev,
                "alternating-ab": {
                    ...abData,
                    dayTypeOverrides: {
                        ...abData.dayTypeOverrides,
                        [today]: type
                    }
                }
            }
        })
    }, [setSchedules])

    // Getters for schedule data
    const getTermSchedule = useCallback((termId: string): TermSchedule | undefined => {
        return schedules["alternating-ab"]?.terms[termId]
    }, [schedules])

    /**
     * Calculates the A/B day type for a given date string.
     * Delegates to shared calculateDayType utility.
     */
    const getDayTypeForDate = useCallback((
        dateString: string,
        activeTerm: AcademicTerm | undefined,
        noSchoolPeriods: NoSchoolPeriod[]
    ): DayType => {
        return calculateDayType(dateString, schedules, activeTerm, noSchoolPeriods)
    }, [schedules])

    return {
        // Raw data
        schedules,

        // Actions
        updateTermSchedule,
        setScheduleType,
        setReferenceDayType,

        // Lookup
        getTermSchedule,
        getDayTypeForDate,
    }
}
