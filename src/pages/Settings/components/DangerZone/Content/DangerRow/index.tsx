import React from 'react'
import type { DangerZone } from '@/pages/Settings/types'

const DangerZoneRow: React.FC<DangerZone.Content.DangerRow.Props> = ({ children }) => {
    return (
        <div className="danger-row">
            {children}
        </div>
    )
}

export default DangerZoneRow
