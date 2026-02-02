import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { ScheduleSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const SetDayTypeButton: React.FC<ScheduleSettings.Content.SetDayTypeButtonProps> = ({ dayType, onClick, children }) => {
    const { isHovered, hoverProps } = useHover()

    const bgDefault = dayType === "A" ? SETTINGS.TEXT_A_DAY : SETTINGS.TEXT_B_DAY
    const bgHover = dayType === "A" ? SETTINGS.TEXT_A_DAY_CONTRAST : SETTINGS.TEXT_B_DAY_CONTRAST

    return (
        <button
            className="w-full sm:flex-1 py-2 px-4 text-white rounded-lg font-medium transition-colors"
            style={{ backgroundColor: isHovered ? bgHover : bgDefault }}
            onClick={onClick}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default SetDayTypeButton
