import React from "react"
import { TRACKMATE_MODALS } from "@shared/styles/colors"

export interface ModalContainerProps {
    children: React.ReactNode
    bgColor?: string
    className?: string
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
    children,
    bgColor = TRACKMATE_MODALS.BASE.BG,
    className = "",
}) => {
    return (
        <div
            className={`modal-container ${className}`.trim()}
            style={{ backgroundColor: bgColor }}
        >
            {children}
        </div>
    )
}
