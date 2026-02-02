import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { DangerZone } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const DangerZoneRowButton: React.FC<DangerZone.Content.DangerRow.ButtonProps> = ({ onClick, children }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            onClick={onClick}
            className="w-[180px] max-sm:w-full py-2.5 px-3.5 rounded-lg font-bold transition-colors inline-flex items-center justify-center"
            style={{
                backgroundColor: isHovered ? SETTINGS.DELETE_BUTTON_BG : "transparent",
                color: isHovered ? SETTINGS.DELETE_BUTTON_TEXT : SETTINGS.TEXT_DANGER,
                border: `1px solid ${SETTINGS.DELETE_BUTTON_BG}`,
            }}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default DangerZoneRowButton
