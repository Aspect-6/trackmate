import React from 'react'
import type { TermSettings } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const TermItem: React.FC<TermSettings.Content.TermList.TermItem.Props> = ({ children }) => {
    return (
        <div
            className={'p-5 rounded-xl border transition-colors'}
            style={{
                backgroundColor: SETTINGS.BACKGROUND_SECONDARY,
                borderColor: SETTINGS.BORDER_PRIMARY,
                color: SETTINGS.TEXT_PRIMARY,
            }}
        >
            {children}
        </div>
    )
}

export default TermItem
