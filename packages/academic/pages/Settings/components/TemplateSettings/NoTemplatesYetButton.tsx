import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { TemplateSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"
import { useAuth } from "@shared/contexts/AuthContext"
import { useModal } from "@/app/contexts/ModalContext"

const NoTemplatesYetButton: React.FC<TemplateSettings.NoTemplatesYetButtonProps> = ({ onClick, children }) => {
    const { isHovered, hoverProps } = useHover()
    const { isPremium } = useAuth()
    const { openModal } = useModal()

    const handleClick = () => {
        if (!isPremium) {
            openModal("premium-upgrade", { title: "Upgrade to Access Templates" })
            return
        }
        if (onClick) {
            onClick()
        }
    }

    return (
        <button
            className="w-full text-center py-8 text-sm rounded-xl cursor-pointer transition-colors"
            style={{
                border: `1.5px dashed ${isHovered ? SETTINGS.HOVER_ZONE_BUTTON_BORDER_HOVER : SETTINGS.HOVER_ZONE_BUTTON_BORDER}`,
                color: SETTINGS.TEXT_TERTIARY
            }}
            onClick={handleClick}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default NoTemplatesYetButton
