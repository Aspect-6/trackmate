import React from 'react'
import type { ClassBoard } from '@/pages/My Classes/types'
import { GLOBAL, MY_CLASSES } from '@/app/styles/colors'

const ClassBoardEmptyState: React.FC<ClassBoard.EmptyStateProps> = ({ onAddClass }) => {
    return (
        <div className="col-span-full text-center py-12">
            <p className="text-lg" style={{ color: GLOBAL.TEXT_SECONDARY }}>No classes added yet.</p>
            <button
                onClick={onAddClass}
                className="mt-4 font-medium transition-colors"
                style={{ color: MY_CLASSES.CLASS_HEADING_TEXT }}
                onMouseEnter={(e) => e.currentTarget.style.color = MY_CLASSES.CLASS_BUTTON_BG_HOVER}
                onMouseLeave={(e) => e.currentTarget.style.color = MY_CLASSES.CLASS_HEADING_TEXT}
            >
                Add your first class
            </button>
        </div>
    )
}

export default ClassBoardEmptyState
