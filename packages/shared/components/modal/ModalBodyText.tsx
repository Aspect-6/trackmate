import React from 'react'
import { TRACKMATE_MODALS } from '../../styles/colors'

export interface ModalBodyTextProps {
    children: React.ReactNode
    className?: string
    color?: string
}

export const ModalBodyText: React.FC<ModalBodyTextProps> = ({
    children,
    className = '',
    color,
}) => {
    return (
        <p
            className={`text-gray-300 mb-4 ${className}`.trim()}
            style={{ color: color ?? TRACKMATE_MODALS.BASE.DELETE_BODY }}
        >
            {children}
        </p>
    )
}
