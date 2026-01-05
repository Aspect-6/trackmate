import React from 'react'
import { useHover } from '@/app/hooks/useHover'
import type { ClassBoard } from '@/pages/My Classes/types'
import { Trash2, Edit2 } from 'lucide-react'
import { MY_CLASSES } from '@/app/styles/colors'

const ClassCardButtons: React.FC<ClassBoard.Card.Header.ButtonsProps> = ({ onEdit, onDelete }) => {
    const { isHovered: isEditHovered, hoverProps: editHoverProps } = useHover()
    const { isHovered: isDeleteHovered, hoverProps: deleteHoverProps } = useHover()

    return (
        <div className="flex space-x-2 ml-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
            <button
                onClick={onEdit}
                className="p-1 transition-colors"
                title="Edit Class"
                {...editHoverProps}
            >
                <Edit2
                    className="w-4 h-4"
                    style={{ color: isEditHovered ? MY_CLASSES.TEXT_PRIMARY : MY_CLASSES.TEXT_SECONDARY }}
                />
            </button>
            <button
                onClick={onDelete}
                className="p-1 transition-colors"
                title="Delete Class"
                {...deleteHoverProps}
            >
                <Trash2
                    className="w-4 h-4"
                    style={{ color: isDeleteHovered ? MY_CLASSES.DELETE_BUTTON_BG : MY_CLASSES.TEXT_SECONDARY }}
                />
            </button>
        </div>
    )
}

export default ClassCardButtons
