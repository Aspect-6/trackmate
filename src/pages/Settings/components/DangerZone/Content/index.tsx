import React from 'react'
import type { DangerZone } from '@/pages/Settings/types'

const DangerZoneSettingsContent: React.FC<DangerZone.Content.Props> = ({ children }) => {
    return (
        <div className="danger-rows">
            {children}
        </div>
    )
}

export default DangerZoneSettingsContent
