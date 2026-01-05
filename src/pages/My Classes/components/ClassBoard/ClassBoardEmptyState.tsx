import React from 'react'
import { useHover } from '@/app/hooks/useHover'
import type { ClassBoard } from '@/pages/My Classes/types'
import { MY_CLASSES } from '@/app/styles/colors'

const ClassBoardEmptyState: React.FC<ClassBoard.EmptyStateProps> = ({ onAddClass }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <div className="col-span-full text-center py-12">
            <p className="text-lg" style={{ color: MY_CLASSES.TEXT_SECONDARY }}>No classes added yet.</p>
            <button
                onClick={onAddClass}
                className="mt-4 font-medium transition-colors"
                style={{ color: isHovered ? MY_CLASSES.CLASS_BUTTON_BG_HOVER : MY_CLASSES.CLASS_HEADING_TEXT }}
                {...hoverProps}
            >
                Add your first class
            </button>
        </div>
    )
}

export default ClassBoardEmptyState
