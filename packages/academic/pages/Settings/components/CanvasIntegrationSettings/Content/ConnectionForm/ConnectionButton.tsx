import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const ConnectionButton: React.FC<CanvasIntegrationSettings.Content.ConnectionForm.ButtonProps> = ({ onClick, disabled, isAnalyzing, children }) => {
    const { isHovered, hoverProps } = useHover()
    
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || isAnalyzing}
            className="w-full sm:w-auto sm:self-end inline-flex items-center justify-center mt-1 px-4 py-2 rounded-lg font-medium text-sm transition-all"
            style={{
                backgroundColor: isHovered ? SETTINGS.ADDITEM_BUTTON_BG_HOVER : SETTINGS.ADDITEM_BUTTON_BG,
                color: SETTINGS.TEXT_WHITE
            }}
            {...hoverProps}
        >
            {isAnalyzing ? "Analyzing Feed..." : children}
        </button>
    )
}

export default ConnectionButton
