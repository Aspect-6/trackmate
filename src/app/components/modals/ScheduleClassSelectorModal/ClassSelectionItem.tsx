import React from 'react'
import { Class } from '@/app/types'
import { MY_CLASSES } from '@/app/styles/colors'

interface ClassSelectionItemProps {
    classItem: Class
    onSelect: (classId: string) => void
}

export const ClassSelectionItem: React.FC<ClassSelectionItemProps> = ({ classItem, onSelect }) => {
    return (
        <button
            onClick={() => onSelect(classItem.id)}
            className="w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3"
            style={{
                backgroundColor: MY_CLASSES.CLASS_CARD_BG,
                border: `1px solid ${MY_CLASSES.BORDER}`,
                boxShadow: MY_CLASSES.SHADOW
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = MY_CLASSES.HOVER_BORDER
                e.currentTarget.style.backgroundColor = MY_CLASSES.CARD_HOVER_BG
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = MY_CLASSES.BORDER
                e.currentTarget.style.backgroundColor = MY_CLASSES.CLASS_CARD_BG
            }}
        >
            <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: classItem.color }}
            ></div>
            <div className="flex-grow">
                <div className="font-medium" style={{ color: MY_CLASSES.TEXT_HEADER }}>{classItem.name}</div>
                <div className="text-sm" style={{ color: MY_CLASSES.TEXT_LABEL }}>
                    {classItem.teacherName || 'No instructor'} • {classItem.roomNumber || 'No room'}
                </div>
            </div>
        </button>
    )
}
