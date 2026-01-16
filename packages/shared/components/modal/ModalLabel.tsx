import React from 'react'

export interface ModalLabelProps {
    children: React.ReactNode
    className?: string
    htmlFor?: string
}

export const ModalLabel: React.FC<ModalLabelProps> = ({
    children,
    className = '',
    htmlFor,
}) => {
    return (
        <label
            className={`modal-label ${className}`.trim()}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    )
}
