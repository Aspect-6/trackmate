import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { ClassBoard } from "@/pages/My Classes/types"
import { ClassCardProvider } from "@/pages/My Classes/contexts/ClassCardContext"
import { MY_CLASSES } from "@/app/styles/colors"

const ClassCard: React.FC<ClassBoard.Card.Props> = ({ classInfo, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: classInfo.id })

    const { isHovered, hoverProps } = useHover()

    return (
        <ClassCardProvider value={{ attributes, listeners }}>
            <div
                ref={setNodeRef}
                className={`rounded-xl shadow-lg overflow-hidden flex flex-col transition-all group ${isDragging ? "dragging" : ""}`}
                style={{
                    backgroundColor: MY_CLASSES.BACKGROUND_PRIMARY,
                    border: `${isDragging ? "2px" : "1px"} ${isDragging ? "dashed" : "solid"} ${isHovered ? MY_CLASSES.FOCUS_COLOR_70 : MY_CLASSES.BORDER_PRIMARY}`,
                    transform: CSS.Transform.toString(transform),
                    transition: isDragging ? "none" : transition,
                    zIndex: isDragging ? 10 : 1,
                    opacity: isDragging ? 0.5 : 1,
                    willChange: "transform",
                }}
                {...hoverProps}
            >
                {children}
            </div>
        </ClassCardProvider>
    )
}

export default ClassCard
