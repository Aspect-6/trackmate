import React from 'react'
import type { DangerZone } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const DangerZoneBadge: React.FC<DangerZone.BadgeProps> = ({ children }) => {
    return (
        <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{
                backgroundColor: 'rgba(248, 113, 113, 0.12)',
                color: SETTINGS.TEXT_DANGER,
                border: '1px solid rgba(248, 113, 113, 0.35)'
            }}
        >
            {children}
        </span>
    )
}

export default DangerZoneBadge
