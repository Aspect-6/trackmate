import React from 'react'

export interface ModalSubmitButtonProps {
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    bgColor: string
    bgColorHover: string
    textColor: string
    inline?: boolean
    className?: string
    children: React.ReactNode
}

export const ModalSubmitButton: React.FC<ModalSubmitButtonProps> = ({
    type = 'button',
    onClick,
    bgColor,
    bgColorHover,
    textColor,
    inline = true,
    className = '',
    children,
}) => {
    const inlineClass = inline ? 'modal-btn-inline' : ''

    return (
        <button
            type={type}
            onClick={onClick}
            className={`modal-btn ${inlineClass} ${className}`.trim()}
            style={{
                '--modal-btn-bg': bgColor,
                '--modal-btn-bg-hover': bgColorHover,
                '--modal-btn-text': textColor,
            } as React.CSSProperties}
        >
            {children}
        </button>
    )
}

