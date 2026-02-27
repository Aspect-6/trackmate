import React from "react"
import { TRACKMATE } from "@shared/styles/colors"
import { useHover } from "@shared/hooks/ui/useHover"

interface TabProps {
    value: string
    isActive: boolean
    onClick: () => void
    children: React.ReactNode
}

const Tab: React.FC<TabProps> = ({
    value,
    isActive,
    onClick,
    children,
}) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type="button"
            className="tab-switcher-tab flex flex-1 justify-center items-center font-semibold text-sm transition-all duration-100 py-2.5"
            onClick={onClick}
            aria-selected={isActive}
            role="tab"
            data-value={value}
            style={{
                color: isActive
                    ? TRACKMATE.TEXT_PRIMARY
                    : isHovered
                        ? TRACKMATE.TEXT_PRIMARY
                        : TRACKMATE.TEXT_SECONDARY,
                background: isActive
                    ? TRACKMATE.BACKGROUND_QUATERNARY
                    : isHovered
                        ? TRACKMATE.BACKGROUND_QUATERNARY
                        : "transparent",
                borderBottom: `${(isActive || !isHovered) ? "3px" : "2px"} solid ${(isActive || isHovered) ? "currentColor" : "transparent"}`,
                marginBottom: "-1px",
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
            }}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default Tab