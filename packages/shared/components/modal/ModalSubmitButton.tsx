import React from 'react'
import { useHover } from '@shared/hooks/ui/useHover'

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
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type={type}
            onClick={onClick}
            className={`modal-btn ${className}`.trim()}
            style={{
                backgroundColor: isHovered ? bgColorHover : bgColor,
                color: textColor,
                width: inline ? 'auto' : undefined,
            }}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

