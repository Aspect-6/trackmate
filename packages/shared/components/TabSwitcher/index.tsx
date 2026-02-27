import React from "react"

interface TabSwitcherProps {
    ariaLabel?: string
    children: React.ReactNode
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
    ariaLabel = "Tab sections",
    children,
}) => {
    return (
        <div
            className="tab-switcher flex gap-1 w-full"
            role="tablist"
            aria-label={ariaLabel}
            style={{
                borderBottom: "1px solid var(--border-secondary)",
            }}
        >
            {children}
        </div>
    )
}

export { default as Tab } from "./Tab"
