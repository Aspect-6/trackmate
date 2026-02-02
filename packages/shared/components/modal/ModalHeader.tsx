import React from "react"

export interface ModalHeaderProps {
    children: React.ReactNode
    color: string
    className?: string
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
    children,
    color,
    className = "",
}) => {
    return (
        <h2
            className={`text-xl font-bold mb-4 ${className}`.trim()}
            style={{ color }}
        >
            {children}
        </h2>
    )
}
