import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'

const ClassCardInstructor: React.FC<ClassBoard.Card.Body.InstructorProps> = ({ teacherName }) => {
    return (
        <div className="flex items-center text-sm">
            <span className="w-24 class-detail-label">Instructor:</span>
            <span className="class-detail-value font-medium">{teacherName || 'N/A'}</span>
        </div>
    )
}

export default ClassCardInstructor
