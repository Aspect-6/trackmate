import { useState, useEffect } from 'react'
import { useAcademicTerms } from '@/app/hooks/entities'
import { useArrowStyle } from './useArrowStyle'
import { getActiveTerm } from '@/app/lib/schedule'
import { todayString } from '@/app/lib/utils'

/**
 * Shared hook for schedule page — term selection and styling.
 */
export const useScheduleData = () => {
    const { filteredAcademicTerms } = useAcademicTerms()
    const arrowStyle = useArrowStyle()

    const [selectedTermId, setSelectedTermId] = useState<string | null>(null)

    // Auto-select term: when current selection is invalid or null, pick a valid one
    useEffect(() => {
        const isCurrentSelectionValid = selectedTermId !== null &&
            filteredAcademicTerms.some(term => term.id === selectedTermId)

        if (isCurrentSelectionValid) return

        const today = todayString()
        const currentTerm = getActiveTerm(today, filteredAcademicTerms)

        if (currentTerm) setSelectedTermId(currentTerm.id)
        else if (filteredAcademicTerms.length > 0 && filteredAcademicTerms[0]) {
            setSelectedTermId(filteredAcademicTerms[0].id)
        } else setSelectedTermId(null)
    }, [filteredAcademicTerms, selectedTermId])

    const setTermId = (termId: string | null) => { setSelectedTermId(termId) }

    return {
        selectedTermId,
        setTermId,
        filteredAcademicTerms,
        arrowStyle
    }
}
