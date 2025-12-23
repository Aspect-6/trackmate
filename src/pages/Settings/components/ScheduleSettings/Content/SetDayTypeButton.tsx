import React from 'react'
import type { ScheduleSettings } from '@/pages/Settings/types'

const SetDayTypeButton: React.FC<ScheduleSettings.Content.SetDayTypeButtonProps> = ({ dayType, onClick, children }) => {
    const className = `w-full sm:flex-1 py-2 px-4 text-white rounded-lg font-medium ${dayType === 'A' ? 'settings-button-a' : 'settings-button-b'
        }`

    return (
        <button
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    )
}

export default SetDayTypeButton
