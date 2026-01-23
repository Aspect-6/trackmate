import React, { useState } from 'react'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { useAccount } from '@/app/hooks/useAccount'
import { AUTH } from '@/app/styles/colors'
import MicrosoftIcon from '@/app/assets/microsoft-icon.svg?react'
import FacebookIcon from '@/app/assets/facebook-icon.svg?react'
import GoogleProviderRow from './Content/GoogleProviderRow'
import EmailPasswordRow from './Content/EmailPasswordRow'
import ComingSoonRow from './Content/ComingSoonRow'

const LinkedAccountsSection: React.FC = () => {
    const { user } = useCurrentUser()
    const { linkGoogle, unlinkGoogle, loading } = useAccount()

    // Check linked providers
    const providers = user?.providerData.map(p => p.providerId) || []
    const hasGoogle = providers.includes('google.com')
    const hasPassword = providers.includes('password')
    const canUnlinkGoogle = hasGoogle && (hasPassword || providers.length > 1)

    // Feedback state
    const [linkError, setLinkError] = useState('')
    const [linkSuccess, setLinkSuccess] = useState('')

    if (!user) return null

    const handleLinkGoogle = async () => {
        setLinkError('')
        setLinkSuccess('')
        const result = await linkGoogle()
        if (result.success) {
            setLinkSuccess('Google account linked successfully')
        } else {
            const code = result.error?.code || ''
            if (code === 'auth/popup-closed-by-user') {
                setLinkError('Popup was closed')
            } else {
                setLinkError('Failed to link Google account')
            }
        }
    }

    const handleUnlinkGoogle = async () => {
        setLinkError('')
        setLinkSuccess('')
        const result = await unlinkGoogle()
        if (result.success) {
            setLinkSuccess('Google account unlinked')
        } else {
            setLinkError('Failed to unlink Google account')
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>
                Linked Accounts
            </h2>
            <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                Manage your connected sign-in methods
            </p>
            {hasPassword && (
                <EmailPasswordRow
                    isActive={hasPassword}
                    email={user.email}
                />
            )}
            <GoogleProviderRow
                isLinked={hasGoogle}
                canUnlink={canUnlinkGoogle}
                loading={loading}
                onLink={handleLinkGoogle}
                onUnlink={handleUnlinkGoogle}
            />
            <ComingSoonRow providerName="Microsoft" Icon={MicrosoftIcon} />
            <ComingSoonRow providerName="Facebook" Icon={FacebookIcon} />
            {!hasPassword && (
                <EmailPasswordRow
                    isActive={hasPassword}
                    email={user.email}
                />
            )}
            {linkError && (
                <p className="text-sm mt-4" style={{ color: AUTH.TEXT_DANGER }}>{linkError}</p>
            )}
            {linkSuccess && (
                <p className="text-sm mt-4" style={{ color: '#22c55e' }}>{linkSuccess}</p>
            )}
        </div>
    )
}

export default LinkedAccountsSection
