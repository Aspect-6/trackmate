import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { useClassCard } from "@/pages/My Classes/hooks/useClassCard"
import type { ClassBoard } from "@/pages/My Classes/types"
import { GripVertical } from "lucide-react"
import { MY_CLASSES } from "@/app/styles/colors"

const ClassCardTitle: React.FC<ClassBoard.Card.Header.TitleProps> = ({ name }) => {
    const { attributes, listeners } = useClassCard()
    const { isHovered: isGripHovered, hoverProps: gripHoverProps } = useHover()
    const { isHovered: isTitleHovered, hoverProps: titleHoverProps } = useHover()

    return (
        <div className="flex items-center gap-2">
            <div
                {...attributes}
                {...listeners}
                {...gripHoverProps}
                className="cursor-grab touch-none p-1 rounded transition-colors grip-container"
            >
                <GripVertical
                    className="w-5 h-5"
                    style={{ color: isGripHovered ? MY_CLASSES.TEXT_PRIMARY : MY_CLASSES.TEXT_SECONDARY }}
                />
            </div>
            <h2
                className="text-xl font-bold transition-colors class-header-title"
                style={{ color: isTitleHovered ? MY_CLASSES.FOCUS_COLOR : MY_CLASSES.TEXT_PRIMARY }}
                {...titleHoverProps}
            >
                {name}
            </h2>
        </div>
    )
}

export default ClassCardTitle
