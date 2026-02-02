import React from "react"

interface SidebarContainerProps {
    isMobile: boolean
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
    backgroundColor?: string
    borderColor?: string
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({
    isMobile,
    children,
    className,
    style,
    backgroundColor,
    borderColor
}) => {
    return (
        <nav
            className={`flex flex-col ${isMobile
                ? "fixed inset-0 z-50"
                : "sidebar w-64 flex-shrink-0 border-r sticky top-0 h-screen py-8 hidden lg:flex"
                } ${className || ""}`}
            style={{
                backgroundColor: backgroundColor,
                ...(isMobile ? {} : { borderColor: borderColor }),
                ...style
            }}
        >
            {children}
        </nav>
    )
}

export default SidebarContainer
