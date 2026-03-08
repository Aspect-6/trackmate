import React from "react"
import { TRACKMATE_MODALS } from "@shared/styles/colors"

export interface ModalContainerProps {
    className?: string
    children: React.ReactNode
}

export const ModalContainer: React.FC<ModalContainerProps> = ({ className = "", children }) => {
    return (
        <div
            className={`modal-container ${className}`.trim()}
            style={{ backgroundColor: TRACKMATE_MODALS.BASE.BG }}
            data-modal-content
        >
            {children}
        </div>
    )
}
