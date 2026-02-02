import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const CalendarDayContainer: React.FC<CalendarBody.Grid.Day.ContainerProps> = ({ year, month, day, isToday, noSchool, onSelectDate, children }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <div
            onClick={() => onSelectDate(new Date(year, month, day))}
            className="border-r border-b p-2 overflow-y-auto relative cursor-pointer transition-colors"
            style={{
                borderColor: CALENDAR.BORDER_PRIMARY,
                backgroundColor: isHovered ? CALENDAR.BACKGROUND_TERTIARY : (noSchool ? CALENDAR.NO_SCHOOL_BG : undefined),
                backgroundImage: noSchool ? CALENDAR.NO_SCHOOL_PATTERN : undefined,
                boxShadow: isToday ? `inset 0 0 0 2px ${CALENDAR.GLOBAL_ACCENT}` : undefined
            }}
            {...hoverProps}
        >
            {children}
        </div>
    )
}

export default React.memo(CalendarDayContainer)
