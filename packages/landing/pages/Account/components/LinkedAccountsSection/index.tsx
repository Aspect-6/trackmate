import React, { useState } from 'react'
import { useAuth } from '@shared/contexts/AuthContext'
import { useAccount } from '@/app/hooks/useAccount'
import { Mail, Lock } from 'lucide-react'
import { Button } from '@/app/components/Button'
import GoogleIconColored from '@/app/assets/google-icon.svg?react'
import GoogleIconMono from '@/app/assets/google-icon-mono.svg?react'
import FacebookIconColored from '@/app/assets/facebook-icon.svg?react'
import FacebookIconMono from '@/app/assets/facebook-icon-mono.svg?react'
import MicrosoftIcon from '@/app/assets/microsoft-icon.svg?react'
import ProviderRow from './Content/ProviderRow'
import ComingSoonRow from './Content/ComingSoonRow'
import { ACCOUNT } from '@/app/styles/colors'

const LinkedAccountsSection: React.FC = () => {
    const { user } = useAuth()
    const { linkGoogle, unlinkGoogle, linkFacebook, unlinkFacebook, loading } = useAccount()

    // Check linked providers
    const providers = user?.providerData.map(p => p.providerId) || []
    const hasGoogle = providers.includes('google.com')
    const hasFacebook = providers.includes('facebook.com')
    const hasPassword = providers.includes('password')
    const canUnlinkGoogle = hasGoogle && (hasPassword || providers.length > 1)
    const canUnlinkFacebook = hasFacebook && (hasPassword || providers.length > 1)

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
            const code = result.error.code || ''
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

    const handleLinkFacebook = async () => {
        setLinkError('')
        setLinkSuccess('')
        const result = await linkFacebook()
        if (result.success) {
            setLinkSuccess('Facebook account linked successfully')
        } else {
            const code = result.error.code || ''
            if (code === 'auth/popup-closed-by-user') {
                setLinkError('Popup was closed')
            } else {
                setLinkError('Failed to link Facebook account')
            }
        }
    }

    const handleUnlinkFacebook = async () => {
        setLinkError('')
        setLinkSuccess('')
        const result = await unlinkFacebook()
        if (result.success) {
            setLinkSuccess('Facebook account unlinked')
        } else {
            setLinkError('Failed to unlink Facebook account')
        }
    }

    return (
        <div>
            <div className="mb-8 pb-4" style={{ borderBottom: `1px solid ${ACCOUNT.BORDER_PRIMARY}` }}>
                <h2 className="text-2xl font-bold mb-1" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                    Linked Accounts
                </h2>
                <p style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    Manage your connected sign-in methods
                </p>
            </div>
            {hasPassword && (
                <ProviderRow
                    title="Email & Password"
                    description={hasPassword ? 'Connected' : 'Not set up'}
                    icon={<Mail size={20} style={{ color: hasPassword ? ACCOUNT.GLOBAL_ACCENT : ACCOUNT.TEXT_SECONDARY }} />}
                    iconBackgroundColor={ACCOUNT.BACKGROUND_QUATERNARY}
                    action={
                        <div
                            className="select-none"
                            title="Primary authentication method cannot be removed"
                        >
                            <Button
                                variant="secondary"
                                disabled
                                className="px-4 py-2"
                            >
                                <Lock size={12} />
                                <span>Primary</span>
                            </Button>
                        </div>
                    }
                />
            )}
            <ProviderRow
                title="Google"
                description={hasGoogle ? 'Connected' : 'Not connected'}
                icon={hasGoogle ? <GoogleIconColored className="w-5 h-5" /> : <GoogleIconMono className="w-5 h-5" style={{ color: ACCOUNT.TEXT_SECONDARY }} />}
                iconBackgroundColor={hasGoogle ? ACCOUNT.GLOBAL_ACCENT_25 : ACCOUNT.BACKGROUND_QUATERNARY}
                action={
                    hasGoogle ? (
                        <Button
                            variant="secondary"
                            onClick={handleUnlinkGoogle}
                            disabled={loading || !canUnlinkGoogle}
                            isLoading={loading}
                            className="px-4 py-2"
                            title={!canUnlinkGoogle ? 'You need at least one sign-in method' : undefined}
                        >
                            Disconnect
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleLinkGoogle}
                            disabled={loading}
                            isLoading={loading}
                            className="px-4 py-2"
                        >
                            Connect
                        </Button>
                    )
                }
            />
            <ProviderRow
                title="Facebook"
                description={hasFacebook ? 'Connected' : 'Not connected'}
                icon={hasFacebook ? <FacebookIconColored className="w-5 h-5" /> : <FacebookIconMono className="w-5 h-5" style={{ color: ACCOUNT.TEXT_SECONDARY }} />}
                iconBackgroundColor={hasFacebook ? ACCOUNT.GLOBAL_ACCENT_25 : ACCOUNT.BACKGROUND_QUATERNARY}
                action={
                    hasFacebook ? (
                        <Button
                            variant="secondary"
                            onClick={handleUnlinkFacebook}
                            disabled={true}
                            isLoading={loading}
                            className="px-4 py-2"
                            title={!canUnlinkFacebook ? 'You need at least one sign-in method' : undefined}
                        >
                            Disconnect
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleLinkFacebook}
                            disabled={true}
                            isLoading={loading}
                            className="px-4 py-2"
                        >
                            Connect
                        </Button>
                    )
                }
            />
            <ComingSoonRow providerName="Microsoft" Icon={MicrosoftIcon} />

            {linkError && (
                <p className="text-sm mt-4" style={{ color: ACCOUNT.TEXT_DANGER }}>{linkError}</p>
            )}
            {linkSuccess && (
                <p className="text-sm mt-4" style={{ color: ACCOUNT.TEXT_SUCCESS }}>{linkSuccess}</p>
            )}
        </div>
    )
}

export default LinkedAccountsSection
