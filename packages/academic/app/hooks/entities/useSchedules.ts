import { useCallback } from "react"
import { useFirestoreDoc } from "@/app/hooks/data/useFirestore"
import { todayString } from "@shared/lib"
import { calculateDayType, DEFAULT_FIXED_WEEKLY_WEEKDAYS } from "@/app/lib/schedule"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"
import type { Schedules, ScheduleType, TermSchedule, DaySchedule, AlternatingABDayType, AcademicTerm, NoSchoolPeriod, AlternatingABRotationConfig } from "@/app/types"

const DEFAULT_SCHEDULES: Schedules = {
    "alternating-ab": {
        termConfigs: {},
        terms: {}
    },
    "semester": {
        terms: {}
    },
    "fixed-weekly": {
        terms: {}
    }
}

/**
 * Build an empty `DaySchedule` with `periodCount` null slots.
 */
export const createEmptyDay = (
    label: string,
    periodCount: number
): DaySchedule => ({
    dayLabel: label,
    classes: Array.from({ length: periodCount }, () => null)
})

/**
 * Build an empty `TermSchedule` for the given schedule format.
 * - alternating-ab: Fall + Spring, each with [A, B] day rows.
 * - semester:       Fall + Spring, each with a single "Daily" row.
 * - fixed-weekly:   Fall + Spring, columns Mon–Fri, independent of `periodCount`
 */
export const createEmptyTermSchedule = (
    scheduleType: ScheduleType,
    periodCount: number
): TermSchedule => {
    if (scheduleType === "alternating-ab") {
        return {
            periodCount,
            Fall: { days: [createEmptyDay("A", periodCount), createEmptyDay("B", periodCount)] },
            Spring: { days: [createEmptyDay("A", periodCount), createEmptyDay("B", periodCount)] }
        }
    }
    if (scheduleType === "fixed-weekly") {
        const rowCount = Math.max(1, periodCount)
        const list = DEFAULT_FIXED_WEEKLY_WEEKDAYS
        const days = list.map(w => createEmptyDay(w, rowCount))
        return {
            periodCount: rowCount,
            Fall: { days },
            Spring: { days: days.map(d => ({ ...d, classes: [...d.classes] })) }
        }
    }
    return {
        periodCount,
        Fall: { days: [createEmptyDay("Daily", periodCount)] },
        Spring: { days: [createEmptyDay("Daily", periodCount)] }
    }
}

/**
 * Returns true if any class slot is filled in either semester of the term schedule.
 */
export const termScheduleHasClasses = (termSchedule: TermSchedule): boolean => {
    return [termSchedule.Fall, termSchedule.Spring].some(sem =>
        sem.days.some(day => day.classes.some(c => c !== null))
    )
}

// Internal helper: merge a per-term update into the correct top-level format
// block, preserving any other terms (and sibling format blocks) untouched.
const writeTermInto = (
    prev: Schedules,
    scheduleType: ScheduleType,
    termId: string,
    newTermSchedule: TermSchedule
): Schedules => {
    if (scheduleType === "alternating-ab") {
        const block = prev["alternating-ab"] ?? { termConfigs: {}, terms: {} }
        return {
            ...prev,
            "alternating-ab": {
                ...block,
                terms: { ...block.terms, [termId]: newTermSchedule }
            }
        }
    }
    if (scheduleType === "fixed-weekly") {
        const block = prev["fixed-weekly"] ?? { terms: {} }
        return {
            ...prev,
            "fixed-weekly": {
                ...block,
                terms: { ...block.terms, [termId]: newTermSchedule }
            }
        }
    }
    const block = prev["semester"] ?? { terms: {} }
    return {
        ...prev,
        "semester": {
            ...block,
            terms: { ...block.terms, [termId]: newTermSchedule }
        }
    }
}

/**
 * Hook for accessing and working with schedule configuration.
 * Manages the schedule type, A/B day configuration, and per-term schedules.
 */
export const useSchedules = () => {
    const [schedules, setSchedulesRaw] = useFirestoreDoc<Schedules>(FIRESTORE_KEYS.SCHEDULES, DEFAULT_SCHEDULES)

    const setSchedules = useCallback((
        valueOrUpdater: Schedules | ((prev: Schedules) => Schedules)
    ) => {
        return setSchedulesRaw((prev: Schedules) =>
            typeof valueOrUpdater === "function"
                ? (valueOrUpdater as (p: Schedules) => Schedules)(prev)
                : valueOrUpdater
        )
    }, [setSchedulesRaw])

    // Actions
    const updateTermSchedule = useCallback((
        termId: string,
        newSchedule: TermSchedule,
        scheduleType: ScheduleType
    ): void => {
        setSchedules(prev => writeTermInto(prev, scheduleType, termId, newSchedule))
    }, [setSchedules])

    /**
     * Replaces the schedule for a single term with a fresh empty `TermSchedule`
     * at the given `periodCount` for the given `scheduleType`. Only the
     * targeted term entry under that format key is touched; all other terms
     * and the sibling format block are preserved.
     */
    const resetTermSchedule = useCallback((
        termId: string,
        periodCount: number,
        scheduleType: ScheduleType
    ): void => {
        if (!termId) return
        setSchedules(prev => writeTermInto(
            prev,
            scheduleType,
            termId,
            createEmptyTermSchedule(scheduleType, periodCount)
        ))
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
    const getTermSchedule = useCallback((
        termId: string,
        scheduleType: ScheduleType
    ): TermSchedule | undefined => {
        return schedules[scheduleType]?.terms[termId]
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
        setReferenceDayType,

        // Lookup
        getTermSchedule,
        getTermRotationConfig,
        getDayTypeForDate,
    }
}
