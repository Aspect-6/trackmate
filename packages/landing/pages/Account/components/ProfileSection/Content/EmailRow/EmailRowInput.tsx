import React from 'react'
import type { ProfileSection } from '@/pages/Account/types'
import { Mail } from 'lucide-react'
import { ACCOUNT } from '@/app/styles/colors'

export const EmailRowInput: React.FC<ProfileSection.Content.EmailRow.InputProps> = ({
    value,
    onChange
}) => {
    return (
        <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
                className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY }}
            >
                <Mail size={20} style={{ color: ACCOUNT.GLOBAL_ACCENT }} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm pb-1" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Email</p>
                <input
                    type="email"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="New email"
                    className="px-3 py-2 rounded-lg text-sm outline-none w-full sm:max-w-xs"
                    style={{
                        backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                        border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
                        color: ACCOUNT.TEXT_PRIMARY,
                    }}
                    autoFocus
                />
            </div>
        </div>
    )
}
