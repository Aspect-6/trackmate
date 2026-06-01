import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { dateToLocalISOString } from "@shared/lib"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const DayType: React.FC<CalendarBody.SidePanel.Body.DayType.Props> = ({ noSchoolDay, dayType, onNoSchoolClick, onDayTypeClick, date, children }) => {
    const { isHovered, hoverProps } = useHover()
    if (!noSchoolDay && !dayType) return null

    const handleClick = () => {
        if (noSchoolDay) onNoSchoolClick?.(noSchoolDay.id)
        else if (dayType && date) onDayTypeClick?.(dayType, dateToLocalISOString(date))
    }

    return (
        <div
            id="day-type-info"
            className={`mb-4 p-3 rounded-lg cursor-pointer transition-colors relative group`}
            style={{
                border: `1px solid ${CALENDAR.BORDER_PRIMARY}`,
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG
            }}
            onClick={() => handleClick()}
            {...hoverProps}
        >
            {children}
        </div>
    )
}

export default DayType
