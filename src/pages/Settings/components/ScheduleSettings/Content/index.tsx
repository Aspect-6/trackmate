import React from 'react'
import type { ScheduleSettings } from '@/pages/Settings/types'

const ScheduleSettingsContent: React.FC<ScheduleSettings.Content.Props> = ({ children }) => {
    return (
        <div className="space-y-4">
            {children}
        </div>
    )
}

export default ScheduleSettingsContent
