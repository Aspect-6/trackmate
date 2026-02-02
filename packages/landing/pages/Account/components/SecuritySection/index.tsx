import React, { useState } from 'react'
import { useAuth } from '@shared/contexts/AuthContext'
import { sendUserEmailVerification } from '@/app/lib/auth'
import EmailVerificationRow from './Content/EmailVerificationRow'
import PasswordRow from './Content/PasswordRow'
import { ACCOUNT } from '@/app/styles/colors'

const SecuritySection: React.FC = () => {
    const { user } = useAuth()
    const [verificationSent, setVerificationSent] = useState(false)
    const [verificationError, setVerificationError] = useState('')

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

    return (
        <div>
            <div className="mb-8 pb-4" style={{ borderBottom: `1px solid ${ACCOUNT.BORDER_PRIMARY}` }}>
                <h2 className="text-2xl font-bold mb-1" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                    Security
                </h2>
                <p style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    Manage your password and security settings
                </p>
            </div>
            <EmailVerificationRow
                isVerified={user.emailVerified}
                verificationSent={verificationSent}
                verificationError={verificationError}
                onResend={handleResendVerification}
            />
            <PasswordRow user={user} />
        </div>
    )
}

export default SecuritySection
