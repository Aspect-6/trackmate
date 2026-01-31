import React from 'react'
import { useHover } from '@shared/hooks/ui/useHover'
import { TRACKMATE_MODALS } from '@shared/styles/colors'

export interface ModalDeleteButtonProps {
    onClick: () => void
    children?: React.ReactNode
    inline?: boolean
    className?: string
}

export const ModalDeleteButton: React.FC<ModalDeleteButtonProps> = ({
    onClick,
    children = 'Delete',
    inline = true,
    className = '',
}) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type="button"
            onClick={onClick}
            className={`modal-btn ${className}`.trim()}
            style={{
                backgroundColor: isHovered ? TRACKMATE_MODALS.BASE.DELETE_BG_HOVER : TRACKMATE_MODALS.BASE.DELETE_BG,
                color: TRACKMATE_MODALS.BASE.DELETE_TEXT,
                width: inline ? 'auto' : undefined,
            }}
            {...hoverProps}
        >
            {children}
        </button>
    )
}
