import React from "react"
import { TRACKMATE } from "@shared/styles/colors"

interface TabSwitcherProps {
    ariaLabel?: string
    children: React.ReactNode
}

interface TabProps {
    value: string
    isActive: boolean
    onClick: () => void
    children: React.ReactNode
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
    ariaLabel = "Tab sections",
    children,
}) => {
    return (
        <div className="tab-switcher" role="tablist" aria-label={ariaLabel}>
            {children}
        </div>
    )
}

export const Tab: React.FC<TabProps> = ({
    value,
    isActive,
    onClick,
    children,
}) => {
    return (
        <button
            type="button"
            className={`tab-switcher-tab ${isActive ? "active" : ""}`}
            onClick={onClick}
            aria-selected={isActive}
            role="tab"
            data-value={value}
            style={{ color: isActive ? TRACKMATE.TEXT_PRIMARY : undefined }}
        >
            {children}
        </button>
    )
}
