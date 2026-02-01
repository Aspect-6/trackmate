import React, { useState } from 'react'
import { useAccount } from '@/app/hooks/useAccount'
import type { UserInfo } from 'firebase/auth'
import type { ProfileSection } from '@/pages/Account/types'
import { EmailRowDisplay } from './EmailRowDisplay'
import { EmailRowForm } from './EmailRowForm'
import { ACCOUNT } from '@/app/styles/colors'

const EmailRow: React.FC<ProfileSection.Content.EmailRow.Props> = ({
    user,
}) => {
    const { changeEmail } = useAccount()
    const [isEditing, setIsEditing] = useState(false)
    const [newEmail, setNewEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const hasPassword = user.providerData.some((p: UserInfo) => p.providerId === 'password')

    const handleSave = async () => {
        setError('')
        setSuccess('')
        if (!newEmail) {
            setError('Please enter a new email')
            return
        }
        if (newEmail.toLowerCase() === user.email?.toLowerCase()) {
            setError('Email address cannot be the same as the current email address')
            return
        }

        const result = await changeEmail(newEmail)
        if (result.success) {
            setSuccess('Verification email sent to new address')
            setIsEditing(false)
            setNewEmail('')
        } else {
            const code = result.error.code || ''
            console.log(result.error)
            switch (code) {
                case 'auth/invalid-new-email':
                    setError('Please enter a valid email address')
                    break
                case 'auth/email-already-in-use':
                    setError('This email is already in use by another account')
                    break
                case 'auth/requires-recent-login':
                    setError('Please sign out and sign back in to change your email')
                    break
                case 'auth/too-many-requests':
                    setError('Too many attempts. Please try again later')
                    break
                case 'auth/operation-not-allowed':
                    setError('Email change is not allowed. Please contact support')
                    break
                default:
                    setError('Failed to update email. Please try again')
            }
        }
    }

    const handleEditStart = () => {
        setSuccess('')
        setError('')
        setIsEditing(true)
    }

    const handleEditCancel = () => {
        setIsEditing(false)
        setNewEmail('')
        setError('')
    }

    return (
        <div
            className="p-5 rounded-xl mb-4 relative"
            style={{
                backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
            }}
        >
            {!isEditing ? (
                <EmailRowDisplay
                    user={user}
                    hasPassword={hasPassword}
                    onEditStart={handleEditStart}
                />
            ) : (
                <EmailRowForm
                    newEmail={newEmail}
                    onEmailChange={setNewEmail}
                    onSave={handleSave}
                    onCancel={handleEditCancel}
                    error={error}
                    hasPassword={hasPassword}
                />
            )}
            {success && <p className="text-sm mt-3" style={{ color: ACCOUNT.TEXT_SUCCESS }}>{success}</p>}
        </div>
    )
}

export default EmailRow
