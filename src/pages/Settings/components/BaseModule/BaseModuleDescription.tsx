import React from 'react'
import type { BaseSettingsModule } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const SettingsModuleDescription: React.FC<BaseSettingsModule.DescriptionProps> = ({ children }) => {
    return (
        <p
            className="text-sm sm:text-base mb-3"
            style={{ color: SETTINGS.BODY_TEXT }}
        >
            {children}
        </p>
    )
}

export default SettingsModuleDescription
