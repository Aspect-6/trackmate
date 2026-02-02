import { useMemo, useCallback } from "react"
import { useLocalStorage } from "@/app/hooks/data/useLocalStorage"
import { generateId, parseDateLocal, dateToLocalISOString } from "@shared/lib"
import { STORAGE_KEYS } from "@/app/config/storageKeys"
import type { NoSchoolPeriod } from "@/app/types"

const DEFAULT_NO_SCHOOL: NoSchoolPeriod[] = []

/**
 * Hook for accessing and working with no-school periods.
 * Provides filtered views, lookup functions, and CRUD operations.
 */
export const useNoSchool = () => {
    const [noSchoolPeriods, setNoSchoolPeriods] = useLocalStorage<NoSchoolPeriod[]>(STORAGE_KEYS.NO_SCHOOL, DEFAULT_NO_SCHOOL)

    // Indexed by date (expands date ranges into individual dates)
    const noSchoolByDate = useMemo(() => noSchoolPeriods.reduce<Record<string, NoSchoolPeriod>>((acc, period) => {
        const start = parseDateLocal(period.startDate)
        const end = parseDateLocal(period.endDate)
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const dateStr = dateToLocalISOString(date)
            acc[dateStr] = period
        }
        return acc
    }, {}), [noSchoolPeriods])

    // Lookup functions
    const getNoSchoolById = useCallback((id: string) => {
        return noSchoolPeriods.find(period => period.id === id) ?? null
    }, [noSchoolPeriods])

    const getNoSchoolStatusForDate = useCallback((date: string) => {
        return noSchoolByDate[date] ?? null
    }, [noSchoolByDate])

    // CRUD Actions
    const addNoSchool = useCallback((period: Omit<NoSchoolPeriod, "id" | "createdAt">): void => {
        setNoSchoolPeriods(prev => [...prev, { ...period, id: generateId(), createdAt: new Date().toISOString() }])
    }, [setNoSchoolPeriods])

    const updateNoSchool = useCallback((id: string, updates: Partial<NoSchoolPeriod>): void => {
        setNoSchoolPeriods(prev => prev.map(ns => ns.id === id ? { ...ns, ...updates } : ns))
    }, [setNoSchoolPeriods])

    const deleteNoSchool = useCallback((id: string): void => {
        setNoSchoolPeriods(prev => prev.filter(ns => ns.id !== id))
    }, [setNoSchoolPeriods])

    return {
        // Raw data
        noSchoolPeriods,

        // Indexed data
        noSchoolByDate,

        // Lookup functions
        getNoSchoolById,
        getNoSchoolStatusForDate,

        // Actions
        addNoSchool,
        updateNoSchool,
        deleteNoSchool,
    }
}
