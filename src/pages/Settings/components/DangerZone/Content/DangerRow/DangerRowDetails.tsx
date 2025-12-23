import React from 'react'
import type { DangerZone } from '@/pages/Settings/types'

const DangerZoneRowDetails: React.FC<DangerZone.Content.DangerRow.DetailsProps> = ({ title, children }) => {
    return (
        <div className="danger-label">
            <p className="danger-title">{title}</p>
            <p className="danger-sub">{children}</p>
        </div>
    )
}

export default DangerZoneRowDetails
