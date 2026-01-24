import React, { useState } from 'react'
import { useCurrentUser } from '@shared/hooks/useCurrentUser'
import { useAccount } from '@/app/hooks/useAccount'
import { sendUserEmailVerification } from '@/app/lib/auth'
import { AUTH } from '@/app/styles/colors'
import EmailVerificationRow from './Content/EmailVerificationRow'
import PasswordRow from './Content/PasswordRow'

const SecuritySection: React.FC = () => {
    const { user } = useCurrentUser()
    const { changePassword, loading } = useAccount()

    // Check linked providers
    const providers = user?.providerData.map(p => p.providerId) || []
    const hasPassword = providers.includes('password')

    // Email verification state
    const [verificationSent, setVerificationSent] = useState(false)
    const [verificationError, setVerificationError] = useState('')

    // Password state
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordSuccess, setPasswordSuccess] = useState('')

    if (!user) return null

    const handleResendVerification = async () => {
        setVerificationError('')
        setVerificationSent(false)
        try {
            await sendUserEmailVerification()
            setVerificationSent(true)
        } catch (error: any) {
            if (error.code === 'auth/too-many-requests') {
                setVerificationError('Too many requests. Please try again later.')
            } else {
                setVerificationError('Failed to send verification email.')
            }
        }
    }

    const handlePasswordSave = async () => {
        setPasswordError('')
        setPasswordSuccess('')
        if (!currentPassword) {
            setPasswordError('Please enter your current password')
            return
        }
        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters')
            return
        }
        if (!/[A-Z]/.test(newPassword)) {
            setPasswordError('Password must contain at least 1 uppercase letter')
            return
        }
        if (!/[0-9]/.test(newPassword)) {
            setPasswordError('Password must contain at least 1 number')
            return
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            setPasswordError('Password must contain at least 1 special character')
            return
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }
        const result = await changePassword(currentPassword, newPassword)
        if (result.success) {
            setPasswordSuccess('Password updated successfully')
            setIsEditingPassword(false)
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } else {
            const code = result.error?.code || ''
            if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
                setPasswordError('Current password is incorrect')
            } else {
                setPasswordError(result.error?.message || 'Failed to update password')
            }
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>
                Security
            </h2>
            <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                Manage your password and security settings
            </p>
            <EmailVerificationRow
                isVerified={user.emailVerified}
                verificationSent={verificationSent}
                verificationError={verificationError}
                onResend={handleResendVerification}
            />
            <PasswordRow
                hasPassword={hasPassword}
                isEditing={isEditingPassword}
                currentPassword={currentPassword}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                error={passwordError}
                success={passwordSuccess}
                loading={loading}
                onEditStart={() => setIsEditingPassword(true)}
                onEditCancel={() => {
                    setIsEditingPassword(false)
                    setCurrentPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                    setPasswordError('')
                }}
                onCurrentPasswordChange={setCurrentPassword}
                onNewPasswordChange={setNewPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onSave={handlePasswordSave}
            />
        </div>
    )
}

export default SecuritySection
