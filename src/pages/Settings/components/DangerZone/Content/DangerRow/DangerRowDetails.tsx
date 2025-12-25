import React from 'react'
import type { DangerZone } from '@/pages/Settings/types'

const DangerZoneRowDetails: React.FC<DangerZone.Content.DangerRow.DetailsProps> = ({ title, children }) => {
    return (
        <div className="flex flex-col gap-0.5">
            <p className="font-bold text-base" style={{ color: 'var(--settings-schedule-header)' }}>{title}</p>
            <p className="text-[0.95rem] leading-[1.35]" style={{ color: 'var(--settings-body-text)' }}>{children}</p>
        </div>
    )
}

export default DangerZoneRowDetails
