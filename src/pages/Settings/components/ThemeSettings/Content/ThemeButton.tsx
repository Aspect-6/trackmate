import React from 'react'
import type { ThemeSettings } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const ThemeButton: React.FC<ThemeSettings.Content.ThemeButtonProps> = ({
    label,
    description,
    Icon,
    active,
    onClick
}) => {
    return (
        <button
            type="button"
            className="flex items-center py-3.5 px-4 rounded-xl transition-all duration-300"
            style={{
                color: active ? SETTINGS.TEXT_WHITE : SETTINGS.TEXT_PRIMARY,
                border: `1px solid ${active ? SETTINGS.SIDEBAR_ACTIVE_TAB_GREEN_BG : SETTINGS.BORDER_PRIMARY}`,
                backgroundColor: active ? SETTINGS.SIDEBAR_ACTIVE_TAB_GREEN_BG : SETTINGS.BACKGROUND_SECONDARY
            }}
            onMouseEnter={(e) => {
                !active && (e.currentTarget.style.borderColor = SETTINGS.SIDEBAR_ACTIVE_TAB_GREEN_BG)
                !active && (e.currentTarget.style.backgroundColor = SETTINGS.BACKGROUND_QUATERNARY)
            }}
            onMouseLeave={(e) => {
                !active && (e.currentTarget.style.borderColor = SETTINGS.BORDER_PRIMARY)
                !active && (e.currentTarget.style.backgroundColor = SETTINGS.BACKGROUND_SECONDARY)
            }}
            // data-active={active}
            // aria-pressed={active}
            onClick={onClick}
        >
            <Icon 
                className="w-5 h-5 mr-3 transition-colors duration-300"
                style={{ color: active ? SETTINGS.TEXT_WHITE : SETTINGS.SIDEBAR_ACTIVE_TAB_GREEN_BG }}    
            />
            <div className="text-left">
                <div className="font-semibold leading-tight">{label}</div>
                <div className="text-xs opacity-90">{description}</div>
            </div>
        </button>
    )
}

export default ThemeButton
