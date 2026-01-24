import React from 'react'

interface SidebarContentProps {
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
}

const SidebarContent: React.FC<SidebarContentProps> = ({
    children,
    className,
    style
}) => {
    return (
        <div
            className={`flex-grow min-h-0 flex flex-col ${className || ''}`}
            style={style}
        >
            {children}
        </div>
    )
}

export default SidebarContent
