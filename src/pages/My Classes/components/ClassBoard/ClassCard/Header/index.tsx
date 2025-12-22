import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'

const ClassCardHeader: React.FC<ClassBoard.Card.Header.Props> = ({ children }) => {
    return (
        <div className="flex justify-between items-start mb-4">
            {children}
        </div>
    )
}

export default ClassCardHeader

export { default as ClassCardTitle } from './Title'
export { default as ClassCardButtons } from './Buttons'