import React from 'react'

export interface ModalTabSwitcherProps {
    ariaLabel?: string
    children: React.ReactNode
}

export const ModalTabSwitcher: React.FC<ModalTabSwitcherProps> = ({
    ariaLabel = 'Form sections',
    children,
}) => {
    return (
        <div className="modal-tabs" role="tablist" aria-label={ariaLabel}>
            {children}
        </div>
    )
}
