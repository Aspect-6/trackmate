import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { UpgradeBenefit } from "@/app/components/modals/PremiumUpgradeModal/UpgradeBenefit"
import { GLOBAL } from "@/app/styles/colors"

interface PremiumStepProps {
    onNext: (isUpgrading: boolean) => void
}

export const PremiumStep: React.FC<PremiumStepProps> = ({ onNext }) => {
    const { isHovered: hoverDecline, hoverProps: declineProps } = useHover()
    const { isHovered: hoverUpgrade, hoverProps: upgradeProps } = useHover()

    const handleUpgrade = () => {
        onNext(true)
    }

    const handleDecline = () => {
        onNext(false)
    }

    return (
        <div className="flex flex-col animate-slide-up-fade">
            <h1 className="text-3xl font-bold mb-2" style={{ color: GLOBAL.GLOBAL_ACCENT }}>
                Upgrade to Premium
            </h1>
            <p className="text-lg mb-8" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                Unlock all features of TrackMate Academic starting now with Premium. By upgrading, you get:
            </p>

            <div className="p-8 rounded-2xl border mb-8" style={{ backgroundColor: GLOBAL.BACKGROUND_SECONDARY, borderColor: GLOBAL.BORDER_PRIMARY }}>
                <ul className="flex flex-col gap-5" style={{ color: GLOBAL.TEXT_PRIMARY }}>
                    <UpgradeBenefit benefit="Access to Templates that allow you to create preset assignments and events with a just a few clicks" />
                    <UpgradeBenefit benefit="The ability to add multiple subtasks to assignments to make it easier to track your progress" />
                    <UpgradeBenefit benefit="The ability to sync your Canvas calendar so you never have to manually create assignments again" />
                </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={handleDecline}
                    className="py-4 px-6 rounded-xl font-medium text-lg transition-colors"
                    style={{ 
                        backgroundColor: hoverDecline ? GLOBAL.CANCEL_BUTTON_BG_HOVER : GLOBAL.CANCEL_BUTTON_BG,
                        color: GLOBAL.CANCEL_BUTTON_TEXT,
                        border: `2px solid ${GLOBAL.CANCEL_BUTTON_BORDER}`
                    }}
                    {...declineProps}
                >
                    No Thanks
                </button>
                <button
                    onClick={handleUpgrade}
                    className="py-4 px-6 rounded-xl font-medium text-lg transition-colors duration-200 shadow-md"
                    style={{ 
                        backgroundColor: hoverUpgrade ? GLOBAL.ADDITEM_BUTTON_BG_HOVER : GLOBAL.ADDITEM_BUTTON_BG,
                        color: GLOBAL.TEXT_WHITE
                    }}
                    {...upgradeProps}
                >
                    Upgrade Now
                </button>
            </div>
        </div>
    )
}
