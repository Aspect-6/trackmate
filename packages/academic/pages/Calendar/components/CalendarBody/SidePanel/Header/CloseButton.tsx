import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const CloseButton: React.FC<CalendarBody.SidePanel.Header.CloseButtonProps> = ({ onClick, children }) => {
    const { isHovered, hoverProps } = useHover()
    return (
        <button
            onClick={onClick}
            className="calendar-side-panel-close transition-colors"
            style={{ color: isHovered ? CALENDAR.TEXT_PRIMARY : CALENDAR.TEXT_TERTIARY }}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default CloseButton
