import React from "react"

export interface ModalTabProps {
    value: string
    isActive: boolean
    onClick: () => void
    children: React.ReactNode
}

export const ModalTab: React.FC<ModalTabProps> = ({
    value,
    isActive,
    onClick,
    children,
}) => {
    return (
        <button
            type="button"
            className={`modal-tab ${isActive ? "active" : ""}`}
            onClick={onClick}
            aria-selected={isActive}
            role="tab"
            data-value={value}
        >
            {children}
        </button>
    )
}
