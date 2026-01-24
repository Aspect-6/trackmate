import React from 'react'
import { TRACKMATE_MODALS } from '@shared/styles/colors'

export interface ModalCancelButtonProps {
    onClick: () => void
    children?: React.ReactNode
    className?: string
}

export const ModalCancelButton: React.FC<ModalCancelButtonProps> = ({
    onClick,
    children = 'Cancel',
    className = '',
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`modal-btn modal-btn-cancel modal-btn-inline ${className}`.trim()}
            style={{
                '--modal-btn-bg': TRACKMATE_MODALS.BASE.CANCEL_BG,
                '--modal-btn-bg-hover': TRACKMATE_MODALS.BASE.CANCEL_BG_HOVER,
                '--modal-btn-text': TRACKMATE_MODALS.BASE.CANCEL_TEXT,
                '--modal-btn-border': TRACKMATE_MODALS.BASE.CANCEL_BORDER,
            } as React.CSSProperties}
        >
            {children}
        </button>
    )
}
