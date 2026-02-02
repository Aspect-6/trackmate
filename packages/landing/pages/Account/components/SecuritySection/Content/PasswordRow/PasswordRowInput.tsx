import React from 'react'
import type { SecuritySection } from '@/pages/Account/types'
import { Lock } from 'lucide-react'
import { ACCOUNT } from '@/app/styles/colors'

export const PasswordRowInput: React.FC<SecuritySection.Content.PasswordRow.InputProps> = ({
    children
}) => {
    return (
        <div className="flex items-start gap-4 flex-1 min-w-0">
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY }}
            >
                <Lock size={20} style={{ color: ACCOUNT.GLOBAL_ACCENT }} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm pb-1" style={{ color: ACCOUNT.TEXT_SECONDARY }}>Password</p>
                {children}
            </div>
        </div>
    )
}
