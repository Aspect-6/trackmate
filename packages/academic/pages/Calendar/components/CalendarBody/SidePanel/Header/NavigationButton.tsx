import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const NavigationButton: React.FC<CalendarBody.SidePanel.Header.NavigationButtonProps> = ({ onClick, icon }) => {
    const { isHovered, hoverProps } = useHover()
    return (
        <button
            onClick={onClick}
            className="p-1 rounded-full transition-colors flex items-center justify-center"
            style={{ 
                color: isHovered ? CALENDAR.TEXT_PRIMARY : CALENDAR.TEXT_TERTIARY,
                backgroundColor: isHovered ? CALENDAR.BACKGROUND_SECONDARY : "transparent" 
            }}
            {...hoverProps}
        >
            {icon}
        </button>
    )
}

export default NavigationButton
