import React, { useState } from 'react'
import type { SecuritySection } from '@/pages/Account/types'
import { useAccount } from '@/app/hooks/useAccount'
import { PasswordRowDisplay } from './PasswordRowDisplay'
import { PasswordRowForm } from './PasswordRowForm'
import { ACCOUNT } from '@/app/styles/colors'

const PasswordRow: React.FC<SecuritySection.Content.PasswordRow.Props> = ({
    user,
}) => {
    const { changePassword, loading } = useAccount()

    // State
    const [isEditing, setIsEditing] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const providers = user?.providerData.map(p => p.providerId) || []
    const hasPassword = providers.includes('password')

    const handleEditStart = () => {
        setSuccess('')
        setError('')
        setIsEditing(true)
    }

    const handleEditCancel = () => {
        setIsEditing(false)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setError('')
    }

    const handleSave = async () => {
        setError('')
        setSuccess('')
        if (!currentPassword) {
            setError('Please enter your current password')
            return
        }
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }
        if (!/[A-Z]/.test(newPassword)) {
            setError('Password must contain at least 1 uppercase letter')
            return
        }
        if (!/[0-9]/.test(newPassword)) {
            setError('Password must contain at least 1 number')
            return
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            setError('Password must contain at least 1 special character')
            return
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        const result = await changePassword(currentPassword, newPassword)
        if (result.success) {
            setSuccess('Password updated successfully')
            setIsEditing(false)
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } else {
            const code = result.error.code || ''
            if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
                setError('Current password is incorrect')
            } else {
                setError(result.error.message || 'Failed to update password')
            }
        }
    }

    return (
        <div
            className="p-5 rounded-xl"
            style={{
                backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
            }}
        >
            {!isEditing ? (
                <PasswordRowDisplay
                    hasPassword={hasPassword}
                    onEditStart={handleEditStart}
                />
            ) : (
                <PasswordRowForm
                    currentPassword={currentPassword}
                    newPassword={newPassword}
                    confirmPassword={confirmPassword}
                    error={error}
                    success={success}
                    loading={loading}
                    onCurrentPasswordChange={setCurrentPassword}
                    onNewPasswordChange={setNewPassword}
                    onConfirmPasswordChange={setConfirmPassword}
                    onSave={handleSave}
                    onCancel={handleEditCancel}
                />
            )}
        </div>
    )
}

export default PasswordRow
