import React from 'react'
import type { ThemeSettings } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const ThemeSettingsComponent: React.FC<ThemeSettings.Props> = ({ children }) => {
    return (
        <div
            className="p-6 rounded-xl mb-6"
            style={{
                backgroundColor: SETTINGS.MODULE_BG,
                border: `1px solid ${SETTINGS.MODULE_BORDER}`,
                boxShadow: SETTINGS.MODULE_SHADOW,
            }}
        >
            {children}
        </div>
    )
}

export default ThemeSettingsComponent

export { default as ThemeSettingsContent } from './Content'
export { default as ThemeButton } from './Content/ThemeButton'
