import React from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useHover } from "@shared/hooks/ui/useHover"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const DisconnectButton: React.FC<CanvasIntegrationSettings.Content.DisconnectButtonProps> = ({ onDisconnect }) => {
    const { openModal } = useModal()
    const { isHovered, hoverProps } = useHover()

    const handleDisconnectClick = () => {
        openModal("delete-confirmation", {
            title: "Disconnect Canvas Integration",
            entityName: "Canvas Integration",
            message: "Are you sure you want to disconnect? Existing synced assignments will remain, but automatic updates will stop.",
            buttonText: "Disconnect",
            onDelete: async () => {
                onDisconnect()
            }
        })
    }

    return (
        <div className="w-full sm:w-auto sm:self-end inline-flex">
            <button
                type="button"
                onClick={handleDisconnectClick}
                className="w-auto max-sm:w-full py-2 px-4 rounded-lg transition-colors items-center justify-center text-sm"
                style={{
                    backgroundColor: isHovered ? SETTINGS.DELETE_BUTTON_BG : "transparent",
                    color: isHovered ? SETTINGS.DELETE_BUTTON_TEXT : SETTINGS.TEXT_DANGER,
                    border: `1px solid ${SETTINGS.DELETE_BUTTON_BG}`,
                }}
                {...hoverProps}
            >
                Disconnect Canvas Integration
            </button>
        </div>
    )
}

export default DisconnectButton
