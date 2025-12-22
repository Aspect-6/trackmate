import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'

const ClassCardContainer: React.FC<ClassBoard.Card.ContainerProps> = ({ children }) => {
    return (
        <div className="p-6 flex-grow">
            {children}
        </div>
    )
}

export default ClassCardContainer
