import { useMemo, useCallback } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { AcademicTerm, Semester } from '@/app/types'

/**
 * Hook for accessing and working with academic terms.
 * Provides lookup functions, date utilities, and CRUD operations.
 */
export const useAcademicTerms = () => {
    const {
        academicTerms,
        filteredAcademicTerms,
        termMode,
        setTermMode,
        addAcademicTerm,
        updateAcademicTerm,
        deleteAcademicTerm,
        openModal
    } = useApp()

    // Counts
    const totalNum = academicTerms.length
    const filteredNum = filteredAcademicTerms.length

    // Lookup functions
    const getTermById = useCallback((id: string): AcademicTerm | undefined => {
        return academicTerms.find(term => term.id === id)
    }, [academicTerms])

    const getSemesterById = useCallback((termId: string, semesterId: string): Semester | undefined => {
        const term = academicTerms.find(t => t.id === termId)
        return term?.semesters.find(s => s.id === semesterId)
    }, [academicTerms])

    const getTermDisplay = useCallback((termId: string | undefined, semesterId?: string): string => {
        if (!termId) return 'Not Assigned'

        const term = academicTerms.find(t => t.id === termId)
        if (!term) return 'Not Assigned'

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
        return filteredAcademicTerms.find(term => {
            const start = new Date(term.startDate)
            const end = new Date(term.endDate)
            return dateObj >= start && dateObj <= end
        })
    }, [filteredAcademicTerms])

    const getActiveSemesterForDate = useCallback((date: string, term: AcademicTerm): Semester | undefined => {
        const dateObj = new Date(date)
        return term.semesters.find(semester => {
            const start = new Date(semester.startDate)
            const end = new Date(semester.endDate)
            return dateObj >= start && dateObj <= end
        })
    }, [])

    // Indexed by id for quick lookups
    const termsById = useMemo(() => academicTerms.reduce<Record<string, AcademicTerm>>((acc, term) => {
        acc[term.id] = term
        return acc
    }, {}), [academicTerms])

    // Modal actions
    const openAddTerm = useCallback(() => openModal('add-term'), [openModal])
    const openEditTerm = useCallback((id: string) => openModal('edit-term', id), [openModal])

    return {
        // Raw data
        academicTerms,

        // Filtered data
        filteredAcademicTerms,

        // The active term type selected in settings
        termMode,

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

        // CRUD actions
        addAcademicTerm,
        updateAcademicTerm,
        deleteAcademicTerm,
        setTermMode,

        // Modal actions
        openAddTerm,
        openEditTerm,
    }
}
