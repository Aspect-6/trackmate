import React from 'react'
import type { ProfileSection } from '@/pages/Account/types'
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
        <React.Fragment>
            <div className="flex flex-row items-center justify-between gap-4">
                <EmailRowInput value={newEmail} onChange={onEmailChange} />

                {hasPassword && (
                    <EmailRowActions onSave={onSave} onCancel={onCancel} variant="desktop" />
                )}
            </div>

            {error && <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_DANGER }}>{error}</p>}

            {hasPassword && (
                <EmailRowActions onSave={onSave} onCancel={onCancel} variant="mobile" />
            )}
        </React.Fragment>
    )
}
