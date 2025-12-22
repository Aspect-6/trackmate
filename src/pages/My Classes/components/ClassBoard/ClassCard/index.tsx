import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ClassCardProvider } from '@/pages/My Classes/contexts/ClassCardContext'

const ClassCard: React.FC<ClassBoard.Card.Props> = ({ classInfo, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: classInfo.id })

    return (
        <ClassCardProvider value={{ attributes, listeners }}>
            <div
                ref={setNodeRef}
                style={{
                    transform: CSS.Transform.toString(transform),
                    transition: isDragging ? 'none' : transition,
                    zIndex: isDragging ? 10 : 1,
                    opacity: isDragging ? 0.5 : 1,
                    willChange: 'transform',
                }}
                className={`sortable-class-card rounded-xl overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-lg group ${isDragging ? 'dragging' : ''}`}
            >
                {children}
            </div>
        </ClassCardProvider>
    )
}

export default ClassCard
