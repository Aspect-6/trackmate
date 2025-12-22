import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { ThemeSettingsProps } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ currentTheme, onChangeTheme }) => {
    const options: Array<{ key: 'light' | 'dark'; label: string; description: string; Icon: typeof Sun }> = [
        { key: 'light', label: 'Light Mode', description: 'Bright, paper-like interface', Icon: Sun },
        { key: 'dark', label: 'Dark Mode', description: 'Soft glow for relaxed eyes.', Icon: Moon },
    ]

    return (
        <div
            className="p-6 rounded-xl mb-6"
            style={{
                backgroundColor: SETTINGS.MODULE_BG,
                border: `1px solid ${SETTINGS.MODULE_BORDER}`,
                boxShadow: SETTINGS.MODULE_SHADOW,
            }}
        >
            <h2 className="text-xl font-bold mb-4" style={{ color: SETTINGS.SCHEDULE_SETTINGS_HEADER }}>Theme</h2>
            <p className="text-sm mb-4" style={{ color: SETTINGS.BODY_TEXT }}>
                Choose the color theme TrackMate should use across the entire app.
            </p>

            <div className="theme-toggle">
                {options.map(({ key, label, description, Icon }) => {
                    const active = currentTheme === key
                    return (
                        <button
                            key={key}
                            type="button"
                            className="theme-toggle-option"
                            data-active={active}
                            aria-pressed={active}
                            onClick={() => onChangeTheme(key)}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            <div className="text-left">
                                <div className="font-semibold leading-tight">{label}</div>
                                <div className="text-xs opacity-80">{description}</div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ThemeSettings
