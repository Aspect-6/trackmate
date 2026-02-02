import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { AUTH } from "@/app/styles/colors"

interface ProviderButtonProps {
    onClick: () => void
    disabled?: boolean
    children: React.ReactNode
}

const ProviderButton: React.FC<ProviderButtonProps> = ({ onClick, disabled, children }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="flex-1 py-3 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                filter: isHovered && !disabled ? "brightness(1.1)" : "none",
                transform: isHovered && !disabled ? "translateY(-0.65px)" : "none",
                willChange: "transform",
            }}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default ProviderButton
