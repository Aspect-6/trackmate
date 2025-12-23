import React from 'react'
import type { ThemeSettings } from '@/pages/Settings/types'

const ThemeSettingsContent: React.FC<ThemeSettings.Content.Props> = ({ children }) => {
    return (
        <div className="theme-toggle">
            {children}
        </div>
    )
}

export default ThemeSettingsContent
