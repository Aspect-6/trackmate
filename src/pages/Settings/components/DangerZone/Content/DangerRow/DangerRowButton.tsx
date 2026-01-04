import React from 'react'
import type { DangerZone } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const DangerZoneRowButton: React.FC<DangerZone.Content.DangerRow.ButtonProps> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="w-[180px] max-sm:w-full py-2.5 px-3.5 rounded-lg font-bold transition-colors inline-flex items-center justify-center"
            style={{
                backgroundColor: 'transparent',
                color: SETTINGS.TEXT_DANGER,
                border: `1px solid ${SETTINGS.DELETE_BUTTON_BG}`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = SETTINGS.DELETE_BUTTON_BG
                e.currentTarget.style.color = SETTINGS.DELETE_BUTTON_TEXT
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = SETTINGS.TEXT_DANGER
            }}
        >
            {children}
        </button>
    )
}

export default DangerZoneRowButton
