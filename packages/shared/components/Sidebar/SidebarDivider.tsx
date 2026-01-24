import React from 'react'

interface SidebarDividerProps {
    isMobile?: boolean
    borderColor?: string
    className?: string
    style?: React.CSSProperties
}

const SidebarDivider: React.FC<SidebarDividerProps> = ({
    isMobile = false,
    borderColor,
    className,
    style
}) => {
    if (isMobile) return null

    return (
        <div
            className={`px-4 flex-shrink-0 ${className || ''}`}
            style={style}
        >
            <div
                className="border-t mb-3"
                style={{ borderColor: borderColor }}
            ></div>
        </div>
    )
}

export default SidebarDivider
