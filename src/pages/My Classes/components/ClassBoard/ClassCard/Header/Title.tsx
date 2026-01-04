import React from 'react'
import { useClassCard } from '@/pages/My Classes/hooks/useClassCard'
import type { ClassBoard } from '@/pages/My Classes/types'
import { GripVertical } from 'lucide-react'
import { MY_CLASSES } from '@/app/styles/colors'

const ClassCardTitle: React.FC<ClassBoard.Card.Header.TitleProps> = ({ name }) => {
    const { attributes, listeners } = useClassCard()

    return (
        <div className="flex items-center gap-2">
            <div {...attributes} {...listeners} className="cursor-grab touch-none p-1 rounded transition-colors grip-container">
                <GripVertical
                    className="w-5 h-5"
                    style={{ color: MY_CLASSES.TEXT_SECONDARY }}
                    onMouseEnter={(e) => e.currentTarget.style.color = MY_CLASSES.TEXT_PRIMARY}
                    onMouseLeave={(e) => e.currentTarget.style.color = MY_CLASSES.TEXT_SECONDARY}
                />
            </div>
            <h2
                className="text-xl font-bold transition-colors class-header-title"
                style={{ color: MY_CLASSES.TEXT_PRIMARY }}
                onMouseEnter={(e) => e.currentTarget.style.color = MY_CLASSES.FOCUS_COLOR}
                onMouseLeave={(e) => e.currentTarget.style.color = MY_CLASSES.TEXT_PRIMARY}
            >
                {name}
            </h2>
        </div>
    )
}

export default ClassCardTitle
