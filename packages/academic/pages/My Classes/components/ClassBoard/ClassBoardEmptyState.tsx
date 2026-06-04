import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { useClasses } from "@/app/hooks/entities"
import type { ClassBoard } from "@/pages/My Classes/types"
import { MY_CLASSES } from "@/app/styles/colors"

const ClassBoardEmptyState: React.FC<ClassBoard.EmptyStateProps> = ({ currentView, onAddClass }) => {
    const { isHovered, hoverProps } = useHover()
    const { classes } = useClasses()

    return (
        <div className="col-span-full text-center py-12">
            <p className="text-lg" style={{ color: MY_CLASSES.TEXT_SECONDARY }}>
                {classes.length === 0
                    ? currentView === "active"
                        ? "No classes added yet."
                        : "No archived classes."
                    : currentView === "active"
                        ? "No active classes."
                        : "No archived classes."
                }
            </p>
            {currentView === "active" && (    
                <button
                    onClick={onAddClass}
                    className="mt-4 font-medium transition-colors"
                    style={{ color: isHovered ? MY_CLASSES.CLASS_BUTTON_BG_HOVER : MY_CLASSES.CLASS_HEADING_TEXT }}
                    {...hoverProps}
                >
                    {classes.length === 0 ? "Add your first class" : "Add a new class"}
                </button>
            )}
        </div>
    )
}

export default ClassBoardEmptyState
