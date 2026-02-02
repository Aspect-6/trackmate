import React from 'react'
import type { ProfileSection } from '@/pages/Account/types'
import { ACCOUNT } from '@/app/styles/colors'

export const EmailRowInput: React.FC<ProfileSection.Content.EmailRow.InputProps> = ({
    value,
    onChange,
}) => {
    return (
        <>
            <p className="text-sm pb-1" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Email</p>
            <input
                type="email"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="New email"
                className="px-3 py-2 rounded-lg text-sm outline-none w-full block max-w-sm"
                style={{
                    backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                    border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
                    color: ACCOUNT.TEXT_PRIMARY,
                }}
                autoFocus
            />
        </>
    )
}
