import { useState, useEffect, useRef } from "react"
import { useAcademicTerms } from "@/app/hooks/entities"
import { todayString } from "@shared/lib"
import { getActiveTerm } from "@/app/lib/schedule"

/**
 * Hook for term selection.
 */
export const useScheduleData = () => {
    const { academicTerms } = useAcademicTerms()

    const [selectedTermId, setSelectedTermId] = useState<string | null>(null)
    const selectedTermRef = useRef(selectedTermId)

    // Keep the ref in sync
    useEffect(() => {
        selectedTermRef.current = selectedTermId
    }, [selectedTermId])

    // Make sure a valid term is always selected when the list of terms changes
    useEffect(() => {
        const isCurrentSelectionValid = selectedTermRef.current !== null &&
            academicTerms.some(term => term.id === selectedTermRef.current)

        if (isCurrentSelectionValid) return

        const currentTerm = getActiveTerm(todayString(), academicTerms)

        if (currentTerm) {
            setSelectedTermId(currentTerm.id)
        } else if (academicTerms.length > 0 && academicTerms[0]) {
            setSelectedTermId(academicTerms[0].id)
        } else {
            setSelectedTermId(null)
        }
    }, [academicTerms])

    const setTermId = (termId: string | null) => { setSelectedTermId(termId) }

    return {
        selectedTermId,
        setTermId,
        academicTerms
    }
}
