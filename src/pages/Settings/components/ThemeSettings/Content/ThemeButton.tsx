import React from 'react'
import type { ThemeSettings } from '@/pages/Settings/types'

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
            className="theme-toggle-option"
            data-active={active}
            aria-pressed={active}
            onClick={onClick}
        >
            <Icon className="w-5 h-5 mr-3" />
            <div className="text-left">
                <div className="font-semibold leading-tight">{label}</div>
                <div className="text-xs opacity-80">{description}</div>
            </div>
        </button>
    )
}

export default ThemeButton
