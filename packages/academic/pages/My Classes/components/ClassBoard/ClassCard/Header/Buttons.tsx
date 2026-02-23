import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { ClassBoard } from "@/pages/My Classes/types"
import { Trash2, Edit2 } from "lucide-react"
import { MY_CLASSES } from "@/app/styles/colors"
import { useClassCard } from "@/pages/My Classes/hooks/useClassCard"

const ClassCardButtons: React.FC<ClassBoard.Card.Header.ButtonsProps> = ({ onEdit, onDelete }) => {
    const { isHovered: isEditHovered, hoverProps: editHoverProps } = useHover()
    const { isHovered: isDeleteHovered, hoverProps: deleteHoverProps } = useHover()
    const { isHovered: isCardHovered } = useClassCard()

    return (
        <div className={`flex space-x-2 ml-4 transition-opacity opacity-100 ${isCardHovered ? 'xl:opacity-100' : 'xl:opacity-0'}`}>
            <button
                onClick={onEdit}
                className="p-1"
                title="Edit Class"
                {...editHoverProps}
            >
                <Edit2
                    className="w-4 h-4 transition-colors duration-100"
                    style={{ color: isEditHovered ? MY_CLASSES.TEXT_PRIMARY : MY_CLASSES.TEXT_SECONDARY }}
                />
            </button>
            <button
                onClick={onDelete}
                className="p-1"
                title="Delete Class"
                {...deleteHoverProps}
            >
                <Trash2
                    className="w-4 h-4 transition-colors duration-100"
                    style={{ color: isDeleteHovered ? MY_CLASSES.DELETE_BUTTON_BG : MY_CLASSES.TEXT_SECONDARY }}
                />
            </button>
        </div>
    )
}

export default ClassCardButtons
