import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { TermSettings } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const NoTermsYetButton: React.FC<TermSettings.Content.NoTermsYetButtonProps> = ({ children }) => {
    const { openModal } = useApp()

    return (
        <button
            className="w-full text-center py-8 text-sm rounded-xl cursor-pointer transition-colors"
            style={{
                border: `1.5px dashed ${SETTINGS.HOVER_ZONE_BUTTON_BORDER}`,
                color: SETTINGS.TEXT_TERTIARY
            }}
            onClick={() => openModal('add-term')}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = SETTINGS.HOVER_ZONE_BUTTON_BORDER_HOVER}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = SETTINGS.HOVER_ZONE_BUTTON_BORDER}
        >
            {children}
        </button>
    )
}

export default NoTermsYetButton
