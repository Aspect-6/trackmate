import React from 'react'
import { useAcademicTerms } from '@/app/hooks/entities'
import type { ClassBoard } from '@/pages/My Classes/types'
import { MY_CLASSES } from '@/app/styles/colors'

const ClassCardTerm: React.FC<ClassBoard.Card.Body.TermProps> = ({ termId, semesterId }) => {
    const { getTermDisplay } = useAcademicTerms()

    return (
        <div className="flex items-center text-sm">
            <span className="w-24" style={{ color: MY_CLASSES.TEXT_SECONDARY }}>Term:</span>
            <span className="font-medium" style={{ color: MY_CLASSES.TEXT_PRIMARY }}>{getTermDisplay(termId, semesterId)}</span>
        </div>
    )
}

export default ClassCardTerm

