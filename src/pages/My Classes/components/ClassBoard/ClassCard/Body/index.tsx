import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'

const ClassCardBody: React.FC<ClassBoard.Card.Body.Props> = ({ children }) => {
    return (
        <div className="space-y-3">
            {children}
        </div>
    )
}

export default ClassCardBody

export { default as ClassCardInstructor } from './Instructor'
export { default as ClassCardRoom } from './Room'
export { default as ClassCardColor } from './Color'
