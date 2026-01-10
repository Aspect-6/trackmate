import { useState, useEffect } from 'react'
import { useAcademicTerms } from '@/app/hooks/entities'
import { useArrowStyle } from './useArrowStyle'

/**
 * Shared hook for schedule page — term selection and styling.
 * Type-specific operations live in their respective renderers.
 */
export const useScheduleData = () => {
    const { filteredAcademicTerms } = useAcademicTerms()
    const arrowStyle = useArrowStyle()

    // Currently selected term
    const [selectedTermId, setSelectedTermId] = useState<string | null>(null)

    // Auto-select term: when current selection is invalid or null, pick a valid one
    useEffect(() => {
        // Check if current selection is still valid
        const isCurrentSelectionValid = selectedTermId !== null &&
            filteredAcademicTerms.some(term => term.id === selectedTermId)

        if (isCurrentSelectionValid) return  // All good, keep current selection

        // Need to select a new term
        const today = new Date()

        // Prefer a term that contains today
        const currentTerm = filteredAcademicTerms.find(term => {
            const start = new Date(term.startDate)
            const end = new Date(term.endDate)
            return today >= start && today <= end
        })

        if (currentTerm) {
            setSelectedTermId(currentTerm.id)
        } else if (filteredAcademicTerms.length > 0 && filteredAcademicTerms[0]) {
            // No current term, select the first available
            setSelectedTermId(filteredAcademicTerms[0].id)
        } else {
            setSelectedTermId(null)
        }
    }, [filteredAcademicTerms, selectedTermId])

    const setTermId = (termId: string | null) => { setSelectedTermId(termId) }

    return {
        selectedTermId,
        setTermId,
        academicTerms: filteredAcademicTerms,
        arrowStyle
    }
}
