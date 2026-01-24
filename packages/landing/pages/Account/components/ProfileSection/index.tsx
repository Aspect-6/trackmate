import React, { useState } from 'react'
import { useCurrentUser } from '@shared/hooks/useCurrentUser'
import { useAccount } from '@/app/hooks/useAccount'
import { AUTH } from '@/app/styles/colors'
import AvatarDisplay from './Content/AvatarDisplay'
import EmailRow from './Content/EmailRow'
import AccountIdRow from './Content/AccountIdRow'

const ProfileSection: React.FC = () => {
    const { user } = useCurrentUser()
    const { changeEmail, changeDisplayName } = useAccount()

    // Check linked providers
    const providers = user?.providerData.map(p => p.providerId) || []
    const hasPassword = providers.includes('password')

    // Display name state
    const [isEditingDisplayName, setIsEditingDisplayName] = useState(false)
    const [newDisplayName, setNewDisplayName] = useState('')
    const [displayNameError, setDisplayNameError] = useState('')
    const [displayNameSuccess, setDisplayNameSuccess] = useState('')

    // Email state
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [newEmail, setNewEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [emailSuccess, setEmailSuccess] = useState('')

    // Account ID state
    const [copied, setCopied] = useState(false)

    if (!user) return null

    const handleDisplayNameSave = async () => {
        setDisplayNameError('')
        setDisplayNameSuccess('')
        if (!newDisplayName.trim()) {
            setDisplayNameError('Display name cannot be empty')
            return
        }
        if (newDisplayName.length > 50) {
            setDisplayNameError('Display name must be 50 characters or less')
            return
        }
        const result = await changeDisplayName(newDisplayName.trim())
        if (result.success) {
            setIsEditingDisplayName(false)
            setNewDisplayName('')
        } else {
            setDisplayNameError(result.error?.message || 'Failed to update display name')
        }
    }

    const handleEmailSave = async () => {
        setEmailError('')
        setEmailSuccess('')
        if (!newEmail) {
            setEmailError('Please enter a new email')
            return
        }
        const result = await changeEmail(newEmail)
        if (result.success) {
            setEmailSuccess('Email updated successfully')
            setIsEditingEmail(false)
            setNewEmail('')
        } else {
            setEmailError(result.error?.message || 'Failed to update email')
        }
    }

    const handleCopyAccountId = () => {
        navigator.clipboard.writeText(user.uid)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>
                Profile
            </h2>
            <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                Your personal information
            </p>
            <AvatarDisplay
                user={user}
                isEditingDisplayName={isEditingDisplayName}
                newDisplayName={newDisplayName}
                displayNameError={displayNameError}
                displayNameSuccess={displayNameSuccess}
                onEditStart={() => {
                    setDisplayNameSuccess('')
                    setDisplayNameError('')
                    setNewDisplayName(user.displayName || '')
                    setIsEditingDisplayName(true)
                }}
                onEditCancel={() => {
                    setIsEditingDisplayName(false)
                    setNewDisplayName('')
                    setDisplayNameError('')
                }}
                onDisplayNameChange={setNewDisplayName}
                onDisplayNameSave={handleDisplayNameSave}
            />
            <EmailRow
                user={user}
                hasPassword={hasPassword}
                isEditing={isEditingEmail}
                newEmail={newEmail}
                error={emailError}
                success={emailSuccess}
                onEditStart={() => {
                    setEmailSuccess('')
                    setEmailError('')
                    setIsEditingEmail(true)
                }}
                onEditCancel={() => {
                    setIsEditingEmail(false)
                    setNewEmail('')
                    setEmailError('')
                }}
                onEmailChange={setNewEmail}
                onSave={handleEmailSave}
            />
            <AccountIdRow
                userId={user.uid}
                copied={copied}
                onCopy={handleCopyAccountId}
            />
        </div>
    )
}

export default ProfileSection
