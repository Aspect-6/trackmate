import React from 'react'
import type { ScheduleSettings } from '@/pages/Settings/types'

const SetDayTypeButton: React.FC<ScheduleSettings.Content.SetDayTypeButtonProps> = ({ dayType, onClick, children }) => {
    const bgDefault = dayType === 'A' ? 'var(--settings-button-a-bg)' : 'var(--settings-button-b-bg)'
    const bgHover = dayType === 'A' ? 'var(--settings-button-a-bg-hover)' : 'var(--settings-button-b-bg-hover)'

    return (
        <button
            onClick={onClick}
            className="w-full sm:flex-1 py-2 px-4 text-white rounded-lg font-medium transition-colors"
            style={{ backgroundColor: bgDefault }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = bgHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgDefault)}
        >
            {children}
        </button>
    )
}

export default SetDayTypeButton
