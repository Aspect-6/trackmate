import React from 'react'
import type { DangerZone } from '@/pages/Settings/types'

const DangerZoneSettingsContent: React.FC<DangerZone.Content.Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-2">
            {children}
        </div>
    )
}

export default DangerZoneSettingsContent
