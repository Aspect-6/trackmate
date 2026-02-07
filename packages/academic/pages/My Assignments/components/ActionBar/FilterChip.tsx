import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { ActionBar } from "@/pages/My Assignments/types"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const FilterChip: React.FC<ActionBar.FilterChipProps> = ({ label, isActive, onClick, color }) => {
    const { isHovered, hoverProps } = useHover()
    const backgroundColor = isActive ? (color || MY_ASSIGNMENTS.GLOBAL_ACCENT) : isHovered ? MY_ASSIGNMENTS.BACKGROUND_QUATERNARY : "transparent"

    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${isActive ? "scale-105" : ""}`.trim()}
            style={{ backgroundColor, color: isActive ? MY_ASSIGNMENTS.TEXT_WHITE : MY_ASSIGNMENTS.TEXT_SECONDARY }}
            {...hoverProps}
        >
            {label}
        </button>
    )
}

export default FilterChip
