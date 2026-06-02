import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { PlansSection } from "@/pages/Account/types"
import { ACCOUNT } from "@/app/styles/colors"

const Footer: React.FC<PlansSection.Content.FooterProps> = ({ isPremium, accentColor, accentColorHover, onClick }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <div className="pt-6 mt-auto" style={{ borderTop: `1px solid ${ACCOUNT.BORDER_PRIMARY}` }}>
            {!isPremium ? (
                <button
                    {...hoverProps}
                    onClick={onClick}
                    className="w-full px-6 py-2.5 rounded-lg font-medium transition-all"
                    style={{
                        backgroundColor: isHovered ? accentColorHover : accentColor,
                        color: ACCOUNT.TEXT_WHITE,
                    }}
                >
                    Upgrade to Premium
                </button>
            ) : (
                <p style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    You currently have access to all Premium features in TrackMate Academic.
                </p>
            )}
        </div>
    )
}

export default Footer
