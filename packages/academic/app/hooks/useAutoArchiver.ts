import { useEffect, useRef, useState } from "react"
import { useAcademicTerms } from "./entities/useAcademicTerms"
import { useClasses } from "./entities/useClasses"
import { useModal } from "@/app/contexts/ModalContext"
import { useSettings } from "@/app/hooks/useSettings"

export const useAutoArchiver = () => {
    const { academicTerms, updateAcademicTerm } = useAcademicTerms()
    const { classesByTerm, updateClasses } = useClasses()
    const { openModal, activeModal } = useModal()
    const { loading } = useSettings()
    
    const [modalQueue, setModalQueue] = useState<string[]>([])
    
    const hasRun = useRef(false)

    useEffect(() => {
        if (loading || hasRun.current || academicTerms.length === 0) return

        hasRun.current = true
        const now = new Date()

        const termsToNotify: string[] = []

        academicTerms.forEach(term => {
            if (!term.hasAutoArchived && new Date(term.endDate) < now) {
                const classesInTerm = classesByTerm[term.id] || []
                const activeClasses = classesInTerm.filter(c => !c.isArchived)
                
                updateAcademicTerm(term.id, { hasAutoArchived: true })

                if (activeClasses.length > 0) {
                    const classUpdates = activeClasses.map(c => ({
                        id: c.id,
                        updates: { isArchived: true }
                    }))
                    updateClasses(classUpdates)
                }

                termsToNotify.push(term.name)
            }
        })

        if (termsToNotify.length > 0) {
            setModalQueue(termsToNotify)
        }
    }, [academicTerms, classesByTerm, loading, updateAcademicTerm, updateClasses])

    useEffect(() => {
        if (modalQueue.length > 0 && !activeModal) {
            const nextTerm = modalQueue[0]
            
            const timeoutId = setTimeout(() => {
                openModal("auto-archive-notification", { termName: nextTerm })
                setModalQueue(prev => prev.slice(1))
            }, 1000)

            return () => clearTimeout(timeoutId)
        }
    }, [modalQueue, activeModal, openModal])
}
