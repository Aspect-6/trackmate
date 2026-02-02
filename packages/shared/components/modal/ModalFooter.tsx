import React from "react"

export interface ModalFooterProps {
    children: React.ReactNode
    className?: string
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
    children,
    className = "",
}) => {
    return (
        <div className={`flex justify-end gap-2 mt-6 ${className}`.trim()}>
            {children}
        </div>
    )
}
