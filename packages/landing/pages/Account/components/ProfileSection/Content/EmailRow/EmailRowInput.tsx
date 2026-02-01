import React from 'react'
import { Mail } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import type { ProfileSection } from '@/pages/Account/types'

export const EmailRowInput: React.FC<ProfileSection.Content.EmailRow.InputProps> = ({
    value,
    onChange
}) => {
    return (
        <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
                className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: AUTH.BACKGROUND_QUATERNARY }}
            >
                <Mail size={20} style={{ color: AUTH.GLOBAL_ACCENT }} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm pb-1" style={{ color: AUTH.TEXT_SECONDARY }}>Email</p>
                <input
                    type="email"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="New email"
                    className="px-3 py-2 rounded-lg text-sm outline-none w-full sm:max-w-xs"
                    style={{
                        backgroundColor: AUTH.BACKGROUND_TERTIARY,
                        border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                        color: AUTH.TEXT_PRIMARY,
                    }}
                    autoFocus
                />
            </div>
        </div>
    )
}
