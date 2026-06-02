import React from "react"
import { useToast } from "@shared/contexts/ToastContext"
import { GLOBAL } from "@/app/styles/colors"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalBodyText,
    ModalCancelButton,
    ModalSubmitButton,
} from "@shared/components/modal"
import { UpgradeBenefit } from "./UpgradeBenefit"

interface PremiumUpgradeModalProps {
    onClose: () => void
    title?: string
}

export const PremiumUpgradeModal: React.FC<PremiumUpgradeModalProps> = ({ 
    onClose, 
    title = "Upgrade to Premium" 
}) => {
    const { showToast } = useToast()

    const handleUpgrade = () => {
        showToast("Upgrading...", "success")
    }

    return (
        <ModalContainer>
            <ModalHeader color={GLOBAL.GLOBAL_ACCENT}>
                {title}
            </ModalHeader>
            <ModalBodyText color={GLOBAL.TEXT_WHITE} className="mb-3">
                Unlock all features of TrackMate Academic with Premium. By upgrading, you get:
            </ModalBodyText>
            <ul className="flex flex-col gap-3 mb-6 px-1" style={{ color: GLOBAL.TEXT_WHITE }}>
                <UpgradeBenefit benefit="Access to Templates that allow you to create preset assignments and events with a just a few clicks" />
                <UpgradeBenefit benefit="The ability to add multiple subtasks to assignments to make it easier to track your progress" />
                <UpgradeBenefit benefit="The ability to sync your Canvas calendar so you never have to manually create assignments again" />
            </ul>
            <ModalFooter>
                <ModalCancelButton onClick={onClose}>Cancel</ModalCancelButton>
                <ModalSubmitButton
                    type="button"
                    onClick={handleUpgrade}
                    bgColor={GLOBAL.GLOBAL_ACCENT}
                    bgColorHover={GLOBAL.GLOBAL_ACCENT}
                    textColor={GLOBAL.TEXT_WHITE}
                >
                    Upgrade
                </ModalSubmitButton>
            </ModalFooter>
        </ModalContainer>
    )
}
