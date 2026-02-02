import { useMemo, useCallback } from "react"
import { useLocalStorage } from "@/app/hooks/data/useLocalStorage"
import { generateId } from "@shared/lib"
import { STORAGE_KEYS } from "@/app/config/storageKeys"
import type { AcademicTerm, Semester, TermMode } from "@/app/types"

const DEFAULT_TERMS: AcademicTerm[] = []

/**
 * Hook for accessing and working with academic terms.
 * Provides filtered views, lookup functions, and CRUD operations.
 */
export const useAcademicTerms = (termMode: TermMode = "Semesters Only") => {
    const [academicTerms, setAcademicTerms] = useLocalStorage<AcademicTerm[]>(STORAGE_KEYS.TERMS, DEFAULT_TERMS)

    // Computed: filter terms by current termMode
    const filteredAcademicTerms = useMemo(() =>
        academicTerms.filter(term => term.termType === termMode)
        , [academicTerms, termMode])

    // Counts
    const totalNum = academicTerms.length
    const filteredNum = filteredAcademicTerms.length

    // Indexed by id for quick lookups
    const termsById = useMemo(() => academicTerms.reduce<Record<string, AcademicTerm>>((acc, term) => {
        acc[term.id] = term
        return acc
    }, {}), [academicTerms])

    // Lookup functions
    const getTermById = useCallback((id: string): AcademicTerm | undefined => {
        return academicTerms.find(term => term.id === id)
    }, [academicTerms])

    const getSemesterById = useCallback((termId: string, semesterId: string): Semester | undefined => {
        const term = academicTerms.find(t => t.id === termId)
        return term?.semesters.find(s => s.id === semesterId)
    }, [academicTerms])

    const getTermDisplay = useCallback((termId: string | undefined, semesterId?: string): string => {
        if (!termId) return "Not Assigned"

        const term = academicTerms.find(t => t.id === termId)
        if (!term) return "Not Assigned"

        if (semesterId) {
            const semester = term.semesters.find(s => s.id === semesterId)
            if (semester) {
                return `${term.name} – ${semester.name}`
            }
        }

        return term.name
    }, [academicTerms])

    // Date utilities
    const getActiveTermForDate = useCallback((date: string): AcademicTerm | undefined => {
        const dateObj = new Date(date)
        return academicTerms.find(term => {
            const start = new Date(term.startDate)
            const end = new Date(term.endDate)
            return dateObj >= start && dateObj <= end
        })
    }, [academicTerms])

    const getActiveSemesterForDate = useCallback((date: string, term: AcademicTerm): Semester | undefined => {
        const dateObj = new Date(date)
        return term.semesters.find(semester => {
            const start = new Date(semester.startDate)
            const end = new Date(semester.endDate)
            return dateObj >= start && dateObj <= end
        })
    }, [])

    // Actions
    const addAcademicTerm = useCallback((term: Omit<AcademicTerm, "id">): void => {
        setAcademicTerms(prev => [...prev, { ...term, id: generateId() }])
    }, [setAcademicTerms])

    const updateAcademicTerm = useCallback((id: string, updates: Partial<AcademicTerm>): void => {
        setAcademicTerms(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
    }, [setAcademicTerms])

    const deleteAcademicTerm = useCallback((id: string): void => {
        setAcademicTerms(prev => prev.filter(t => t.id !== id))
    }, [setAcademicTerms])

    return {
        // Raw data
        academicTerms,
        filteredAcademicTerms,

        // Counts
        totalNum,
        filteredNum,

        // Indexed data
        termsById,

        // Lookup functions
        getTermById,
        getSemesterById,
        getTermDisplay,

        // Date utilities
        getActiveTermForDate,
        getActiveSemesterForDate,

        // Actions
        addAcademicTerm,
        updateAcademicTerm,
        deleteAcademicTerm,
    }
}
