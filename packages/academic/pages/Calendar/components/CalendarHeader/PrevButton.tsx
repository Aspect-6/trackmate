import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { CalendarHeader } from "@/pages/Calendar/types"
import { ChevronLeft } from "lucide-react"
import { CALENDAR } from "@/app/styles/colors"

const PrevButton: React.FC<CalendarHeader.CalendarHeaderButtonProps> = ({ onClick }) => {
    const { isHovered, hoverProps } = useHover()
    return (
        <button
            onClick={onClick}
            className="calendar-header-btn p-3 md:p-2 rounded-full transition touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
            style={{ backgroundColor: isHovered ? CALENDAR.BACKGROUND_QUATERNARY : "transparent" }}
            aria-label="Previous Month"
            {...hoverProps}
        >
            <ChevronLeft className="w-7 h-7 md:w-6 md:h-6" style={{ color: CALENDAR.FOCUS_COLOR }} />
        </button>
    )
}

export default PrevButton
