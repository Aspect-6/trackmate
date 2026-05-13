import { useCallback } from "react"
import { useFirestoreDoc } from "@/app/hooks/data/useFirestore"
import { todayString } from "@shared/lib"
import { calculateDayType } from "@/app/lib/schedule"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"
import type { Schedules, ScheduleType, TermSchedule, DaySchedule, AlternatingABDayType, AcademicTerm, NoSchoolPeriod, AlternatingABRotationConfig } from "@/app/types"

const DEFAULT_SCHEDULES: Schedules = {
    type: "alternating-ab",
    "alternating-ab": {
        termConfigs: {},
        terms: {}
    }
}

/**
 * Build an empty `DaySchedule` with `periodCount` null slots.
 */
export const createEmptyDay = (
    label: NonNullable<AlternatingABDayType>,
    periodCount: number
): DaySchedule => ({
    dayLabel: label,
    classes: Array.from({ length: periodCount }, () => null)
})

/**
 * Build an empty `TermSchedule` (Fall + Spring, A + B days) with `periodCount`
 * periods per day. The result includes the `periodCount` field on the term.
 */
export const createEmptyTermSchedule = (periodCount: number): TermSchedule => ({
    periodCount,
    Fall: { days: [createEmptyDay("A", periodCount), createEmptyDay("B", periodCount)] },
    Spring: { days: [createEmptyDay("A", periodCount), createEmptyDay("B", periodCount)] }
})

/**
 * Returns true if any class slot is filled in either semester of the term schedule.
 */
export const termScheduleHasClasses = (termSchedule: TermSchedule): boolean => {
    return [termSchedule.Fall, termSchedule.Spring].some(sem =>
        sem.days.some(day => day.classes.some(c => c !== null))
    )
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

    /**
     * Replaces the schedule for a single term with a fresh empty `TermSchedule`
     * at the given `periodCount`. Only the targeted term entry is touched;
     * all other terms in the document are preserved.
     */
    const resetTermSchedule = useCallback((termId: string, periodCount: number): void => {
        if (!termId) return
        setSchedules(prev => {
            const abData = prev["alternating-ab"]
            if (!abData) return prev
            return {
                ...prev,
                "alternating-ab": {
                    ...abData,
                    terms: {
                        ...abData.terms,
                        [termId]: createEmptyTermSchedule(periodCount)
                    }
                }
            }
        })
    }, [setSchedules])

    const setScheduleType = useCallback((type: ScheduleType): void => {
        setSchedules(prev => ({ ...prev, type }))
    }, [setSchedules])

    /**
     * Sets or overrides the day type for today within a specific term's config.
     * If the term has no existing config, one is initialized.
     */
    const setReferenceDayType = useCallback((type: NonNullable<AlternatingABDayType>, activeTermId: string): void => {
        if (!activeTermId) return
        const today = todayString()
        setSchedules(prev => {
            const abData = prev["alternating-ab"]
            if (!abData) return prev
            const existingConfig = abData.termConfigs[activeTermId] || { startDayType: type, overrides: {} }
            return {
                ...prev,
                "alternating-ab": {
                    ...abData,
                    termConfigs: {
                        ...abData.termConfigs,
                        [activeTermId]: {
                            ...existingConfig,
                            overrides: {
                                ...existingConfig.overrides,
                                [today]: type
                            }
                        }
                    }
                }
            }
        })
    }, [setSchedules])

    /**
     * Gets the rotation config for a specific term.
     */
    const getTermRotationConfig = useCallback((termId: string): AlternatingABRotationConfig | undefined => {
        const abData = schedules["alternating-ab"]
        if (!abData) return undefined
        return abData.termConfigs[termId]
    }, [schedules])

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
    ): AlternatingABDayType => {
        return calculateDayType(dateString, schedules, activeTerm, noSchoolPeriods)
    }, [schedules])

    return {
        // Raw data
        schedules,

        // Actions
        updateTermSchedule,
        resetTermSchedule,
        setScheduleType,
        setReferenceDayType,

        // Lookup
        getTermSchedule,
        getTermRotationConfig,
        getDayTypeForDate,
    }
}
