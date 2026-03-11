import { useState, useEffect, useRef } from "react"
import { useAcademicTerms } from "@/app/hooks/entities"
import { todayString } from "@shared/lib"
import { getActiveTerm } from "@/app/lib/schedule"

/**
 * Hook for term selection.
 */
export const useScheduleData = () => {
    const { filteredAcademicTerms } = useAcademicTerms()

    const [selectedTermId, setSelectedTermId] = useState<string | null>(null)
    const selectedTermRef = useRef(selectedTermId)
    selectedTermRef.current = selectedTermId

    // Make sure a valid term is always selected when the list of terms changes
    useEffect(() => {
        const isCurrentSelectionValid = selectedTermRef.current !== null &&
            filteredAcademicTerms.some(term => term.id === selectedTermRef.current)

        if (isCurrentSelectionValid) return

        const currentTerm = getActiveTerm(todayString(), filteredAcademicTerms)

        if (currentTerm) {
            setSelectedTermId(currentTerm.id)
        } else if (filteredAcademicTerms.length > 0 && filteredAcademicTerms[0]) {
            setSelectedTermId(filteredAcademicTerms[0].id)
        } else {
            setSelectedTermId(null)
        }
    }, [filteredAcademicTerms])

    const setTermId = (termId: string | null) => { setSelectedTermId(termId) }

    return {
        selectedTermId,
        setTermId,
        filteredAcademicTerms
    }
}
