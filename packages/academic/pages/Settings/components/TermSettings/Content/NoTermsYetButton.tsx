import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { useModal } from "@/app/contexts/ModalContext"
import type { TermSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const NoTermsYetButton: React.FC<TermSettings.Content.NoTermsYetButtonProps> = ({ children }) => {
    const { openModal } = useModal()
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            className="w-full text-center py-8 text-sm rounded-xl cursor-pointer transition-colors"
            style={{
                border: `1.5px dashed ${isHovered ? SETTINGS.HOVER_ZONE_BUTTON_BORDER_HOVER : SETTINGS.HOVER_ZONE_BUTTON_BORDER}`,
                color: SETTINGS.TEXT_TERTIARY
            }}
            onClick={() => openModal("add-term")}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default NoTermsYetButton
