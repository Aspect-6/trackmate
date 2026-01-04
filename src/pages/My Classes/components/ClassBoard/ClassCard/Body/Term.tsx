import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { ClassBoard } from '@/pages/My Classes/types'
import { MY_CLASSES } from '@/app/styles/colors'

const ClassCardTerm: React.FC<ClassBoard.Card.Body.TermProps> = ({ termId, semesterId }) => {
    const { academicTerms } = useApp()

    const getTermDisplay = (): string => {
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
    }

    return (
        <div className="flex items-center text-sm">
            <span className="w-24" style={{ color: MY_CLASSES.TEXT_SECONDARY }}>Term:</span>
            <span className="font-medium" style={{ color: MY_CLASSES.TEXT_PRIMARY }}>{getTermDisplay()}</span>
        </div>
    )
}

export default ClassCardTerm
