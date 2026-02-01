import React from 'react'
import type { DataSection } from '@/pages/Account/types'
import { ACCOUNT } from '@/app/styles/colors'

export const Container: React.FC<DataSection.Content.DeleteAccountCard.ContainerProps> = ({ children }) => (
    <div
        className="relative rounded-xl"
        style={{
            backgroundColor: ACCOUNT.DANGER_ZONE_BG,
            border: `1px solid ${ACCOUNT.DANGER_ZONE_BORDER}`,
        }}
    >
        <div
            className="absolute inset-0"
            style={{
                background: ACCOUNT.DANGER_ZONE_BG_PATTERN,
                backgroundSize: '10px 10px',
                opacity: 0.04,
            }}
        />
        <div className="relative p-6 sm:p-8">
            {children}
        </div>
    </div>
)
