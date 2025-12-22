import React from 'react'
import { useClassCard } from '@/pages/My Classes/hooks/useClassCard'
import type { ClassBoard } from '@/pages/My Classes/types'
import { GripVertical } from 'lucide-react'

const ClassCardTitle: React.FC<ClassBoard.Card.Header.TitleProps> = ({ name }) => {
    const { attributes, listeners } = useClassCard()

    return (
        <div className="flex items-center gap-2">
            <div {...attributes} {...listeners} className="cursor-grab touch-none p-1 rounded grip-container">
                <GripVertical className="w-5 h-5 class-card-icon" />
            </div>
            <h2 className="text-xl font-bold class-header-title">{name}</h2>
        </div>
    )
}

export default ClassCardTitle
