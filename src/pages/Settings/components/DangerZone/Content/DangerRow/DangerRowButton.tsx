import React from 'react'
import type { DangerZone } from '@/pages/Settings/types'

const DangerZoneRowButton: React.FC<DangerZone.Content.DangerRow.ButtonProps> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="danger-btn settings-button-danger"
        >
            {children}
        </button>
    )
}

export default DangerZoneRowButton
