import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { AssignmentTemplateSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const NoTemplatesYetButton: React.FC<AssignmentTemplateSettings.Content.NoTemplatesYetButtonProps> = ({ onClick, children }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            className="w-full text-center py-8 text-sm rounded-xl cursor-pointer transition-colors"
            style={{
                border: `1.5px dashed ${isHovered ? SETTINGS.HOVER_ZONE_BUTTON_BORDER_HOVER : SETTINGS.HOVER_ZONE_BUTTON_BORDER}`,
                color: SETTINGS.TEXT_TERTIARY
            }}
            onClick={onClick}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default NoTemplatesYetButton
