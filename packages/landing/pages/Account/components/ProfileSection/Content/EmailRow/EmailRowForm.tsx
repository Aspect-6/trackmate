import React from 'react'
import type { ProfileSection } from '@/pages/Account/types'
import { Mail } from 'lucide-react'
import { EmailRowInput } from './EmailRowInput'
import { EmailRowActions } from './EmailRowActions'
import { ACCOUNT } from '@/app/styles/colors'

export const EmailRowForm: React.FC<ProfileSection.Content.EmailRow.FormProps> = ({
    newEmail,
    onEmailChange,
    onSave,
    onCancel,
    error,
    hasPassword
}) => {
    return (
        <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
                <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: ACCOUNT.BACKGROUND_QUATERNARY }}
                >
                    <Mail size={20} style={{ color: ACCOUNT.GLOBAL_ACCENT }} />
                </div>
                <div className="flex-1 min-w-0">
                    <EmailRowInput value={newEmail} onChange={onEmailChange} />
                    {hasPassword && (
                        <div className="mt-3">
                            <EmailRowActions onSave={onSave} onCancel={onCancel} />
                        </div>
                    )}
                    {error && <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_DANGER }}>{error}</p>}
                </div>
            </div>
        </div>
    )
}
