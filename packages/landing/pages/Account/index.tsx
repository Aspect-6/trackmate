import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '@/app/hooks/useCurrentUser'
import { useAccount } from '@/app/hooks/useAccount'
import { signOutUser, sendUserEmailVerification } from '@/app/lib/auth'
import { ArrowLeft, User, Mail, Lock, Trash2, LogOut, Check, X, Link2, Copy, Hash, ShieldCheck } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'
import MicrosoftIcon from '@/app/assets/microsoft-icon.svg?react'
import FacebookIcon from '@/app/assets/facebook-icon.svg?react'

type ActiveSection = 'profile' | 'linked' | 'security' | 'danger'

const Account: React.FC = () => {
    const { user, loading: userLoading } = useCurrentUser()
    const { changePassword, changeEmail, deleteAccount, linkGoogle, unlinkGoogle, loading: accountLoading } = useAccount()
    const navigate = useNavigate()

    const [activeSection, setActiveSection] = useState<ActiveSection>('profile')

    // Edit modes
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)

    // Form state
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Feedback state
    const [emailError, setEmailError] = useState('')
    const [emailSuccess, setEmailSuccess] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordSuccess, setPasswordSuccess] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [linkError, setLinkError] = useState('')
    const [linkSuccess, setLinkSuccess] = useState('')
    const [copied, setCopied] = useState(false)
    const [verificationSent, setVerificationSent] = useState(false)
    const [verificationError, setVerificationError] = useState('')

    useEffect(() => {
        if (!userLoading && !user) {
            navigate('/sign-in', { replace: true })
        }
    }, [user, userLoading, navigate])

    if (userLoading) {
        return (
            <div className="min-h-dvh flex items-center justify-center" style={{ backgroundColor: AUTH.BACKGROUND_PRIMARY }}>
                <p style={{ color: AUTH.TEXT_SECONDARY }}>Loading...</p>
            </div>
        )
    }

    if (!user) return null

    // Check linked providers
    const providers = user.providerData.map(p => p.providerId)
    const hasGoogle = providers.includes('google.com')
    const hasPassword = providers.includes('password')
    const canUnlinkGoogle = hasGoogle && (hasPassword || providers.length > 1)

    const handleEmailSave = async () => {
        setEmailError('')
        setEmailSuccess('')
        if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            setEmailError('Please enter a valid email address')
            return
        }
        const result = await changeEmail(newEmail)
        if (result.success) {
            setEmailSuccess('Email updated')
            setIsEditingEmail(false)
            setNewEmail('')
        } else {
            setEmailError(result.error?.code === 'auth/requires-recent-login'
                ? 'Please sign in again to change email'
                : 'Failed to update email')
        }
    }

    const handlePasswordSave = async () => {
        setPasswordError('')
        setPasswordSuccess('')
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }
        if (newPassword.length < 8) {
            setPasswordError('Minimum 8 characters')
            return
        }
        const result = await changePassword(newPassword)
        if (result.success) {
            setPasswordSuccess('Password updated')
            setIsEditingPassword(false)
            setNewPassword('')
            setConfirmPassword('')
        } else {
            setPasswordError(result.error?.code === 'auth/requires-recent-login'
                ? 'Please sign in again'
                : 'Failed to update')
        }
    }

    const handleSignOut = async () => {
        await signOutUser()
        navigate('/landing', { replace: true })
    }

    const handleDeleteAccount = async () => {
        const result = await deleteAccount()
        if (result.success) {
            navigate('/landing', { replace: true })
        } else {
            setDeleteError(result.error?.code === 'auth/requires-recent-login'
                ? 'Please sign in again to delete account'
                : 'Failed to delete account')
        }
    }

    const handleLinkGoogle = async () => {
        setLinkError('')
        setLinkSuccess('')
        const result = await linkGoogle()
        if (result.success) {
            setLinkSuccess('Google account linked successfully')
        } else {
            const code = result.error?.code || ''
            if (code === 'auth/credential-already-in-use') {
                setLinkError('This Google account is already linked to another user')
            } else if (code === 'auth/popup-closed-by-user') {
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

    const navItems = [
        { id: 'profile' as const, label: 'Profile', icon: User },
        { id: 'linked' as const, label: 'Linked Accounts', icon: Link2 },
        { id: 'security' as const, label: 'Security', icon: Lock },
        { id: 'danger' as const, label: 'Delete Account', icon: Trash2 },
    ]

    return (
        <div className="min-h-dvh flex" style={{ backgroundColor: AUTH.BACKGROUND_PRIMARY }}>
            {/* Sidebar */}
            <aside
                className="w-64 p-6 flex flex-col"
                style={{
                    backgroundColor: AUTH.BACKGROUND_SECONDARY,
                    borderRight: `1px solid ${AUTH.BORDER_PRIMARY}`,
                }}
            >
                <button
                    onClick={() => navigate('/landing')}
                    className="flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-70"
                    style={{ color: AUTH.TEXT_SECONDARY }}
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                <h1 className="text-xl font-bold mb-6" style={{ color: AUTH.TEXT_PRIMARY }}>
                    Account
                </h1>

                <nav className="flex-1 space-y-1">
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveSection(id)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
                            style={{
                                backgroundColor: activeSection === id ? AUTH.FOCUS_COLOR_30 : 'transparent',
                                color: activeSection === id ? AUTH.FOCUS_COLOR : AUTH.TEXT_SECONDARY,
                            }}
                        >
                            <Icon size={18} />
                            {label}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ color: AUTH.TEXT_SECONDARY }}
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                {activeSection === 'profile' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>
                            Profile
                        </h2>
                        <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Your personal information
                        </p>

                        {/* Avatar & Name */}
                        <div className="flex items-center gap-6 mb-10">
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div
                                    className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
                                    style={{
                                        background: `linear-gradient(135deg, ${AUTH.FOCUS_COLOR}, ${AUTH.FOCUS_COLOR_70})`,
                                        color: '#fff',
                                    }}
                                >
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="text-lg font-semibold" style={{ color: AUTH.TEXT_PRIMARY }}>
                                    {user.displayName || user.email?.split('@')[0]}
                                </p>
                                <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                                    Member since {user.metadata.creationTime
                                        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Email Row */}
                        <div
                            className="p-5 rounded-xl mb-4"
                            style={{
                                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: AUTH.FOCUS_COLOR_30 }}
                                    >
                                        <Mail size={20} style={{ color: AUTH.FOCUS_COLOR }} />
                                    </div>
                                    <div>
                                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>Email</p>
                                        {!isEditingEmail ? (
                                            <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>{user.email}</p>
                                        ) : (
                                            <input
                                                type="email"
                                                value={newEmail}
                                                onChange={(e) => setNewEmail(e.target.value)}
                                                placeholder="New email"
                                                className="mt-1 px-3 py-2 rounded-lg text-sm outline-none w-64"
                                                style={{
                                                    backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                                    border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                                                    color: AUTH.TEXT_PRIMARY,
                                                }}
                                                autoFocus
                                            />
                                        )}
                                    </div>
                                </div>
                                {hasPassword ? (
                                    !isEditingEmail ? (
                                        <button
                                            onClick={() => setIsEditingEmail(true)}
                                            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                                            style={{
                                                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                                color: AUTH.TEXT_PRIMARY,
                                            }}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleEmailSave}
                                                disabled={accountLoading}
                                                className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                                style={{ backgroundColor: '#22c55e', color: '#fff' }}
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => { setIsEditingEmail(false); setNewEmail(''); setEmailError('') }}
                                                className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                                style={{ backgroundColor: AUTH.BACKGROUND_TERTIARY, color: AUTH.TEXT_PRIMARY }}
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    )
                                ) : (
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: 'rgba(66, 133, 244, 0.15)',
                                            color: '#4285F4',
                                        }}
                                    >
                                        Managed by Google
                                    </span>
                                )}
                            </div>
                            {emailError && <p className="text-sm mt-2" style={{ color: AUTH.TEXT_DANGER }}>{emailError}</p>}
                            {emailSuccess && <p className="text-sm mt-2" style={{ color: '#22c55e' }}>{emailSuccess}</p>}
                        </div>

                        {/* Account ID Row */}
                        <div
                            className="p-5 rounded-xl"
                            style={{
                                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: AUTH.FOCUS_COLOR_30 }}
                                    >
                                        <Hash size={20} style={{ color: AUTH.FOCUS_COLOR }} />
                                    </div>
                                    <div>
                                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>Account ID</p>
                                        <p className="font-mono text-sm" style={{ color: AUTH.TEXT_PRIMARY }}>{user.uid}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(user.uid)
                                        setCopied(true)
                                        setTimeout(() => setCopied(false), 2000)
                                    }}
                                    className="p-2 rounded-lg transition-all duration-200 hover:opacity-80"
                                    style={{
                                        backgroundColor: copied ? 'rgba(34, 197, 94, 0.15)' : AUTH.BACKGROUND_TERTIARY,
                                        color: copied ? '#22c55e' : AUTH.TEXT_PRIMARY,
                                    }}
                                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'linked' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>
                            Linked Accounts
                        </h2>
                        <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Manage your connected sign-in methods
                        </p>

                        {/* Google Row */}
                        <div
                            className="p-5 rounded-xl mb-4"
                            style={{
                                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: hasGoogle ? 'rgba(66, 133, 244, 0.15)' : AUTH.BACKGROUND_TERTIARY }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24">
                                            <path fill={hasGoogle ? "#4285F4" : AUTH.TEXT_SECONDARY as string} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill={hasGoogle ? "#34A853" : AUTH.TEXT_SECONDARY as string} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill={hasGoogle ? "#FBBC05" : AUTH.TEXT_SECONDARY as string} d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill={hasGoogle ? "#EA4335" : AUTH.TEXT_SECONDARY as string} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>Google</p>
                                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                                            {hasGoogle ? 'Connected' : 'Not connected'}
                                        </p>
                                    </div>
                                </div>
                                {hasGoogle ? (
                                    <button
                                        onClick={handleUnlinkGoogle}
                                        disabled={accountLoading || !canUnlinkGoogle}
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                                            color: AUTH.TEXT_PRIMARY,
                                        }}
                                        title={!canUnlinkGoogle ? 'You need at least one sign-in method' : undefined}
                                    >
                                        Disconnect
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleLinkGoogle}
                                        disabled={accountLoading}
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                                        style={{
                                            backgroundColor: AUTH.FOCUS_COLOR,
                                            color: '#fff',
                                        }}
                                    >
                                        Connect
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Email/Password Row */}
                        <div
                            className="p-5 rounded-xl mb-4"
                            style={{
                                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: hasPassword ? AUTH.FOCUS_COLOR_30 : AUTH.BACKGROUND_TERTIARY }}
                                    >
                                        <Mail size={20} style={{ color: hasPassword ? AUTH.FOCUS_COLOR : AUTH.TEXT_SECONDARY }} />
                                    </div>
                                    <div>
                                        <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>Email & Password</p>
                                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                                            {hasPassword ? user.email : 'Not set up'}
                                        </p>
                                    </div>
                                </div>
                                {hasPassword ? (
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                                            color: '#22c55e',
                                        }}
                                    >
                                        Active
                                    </span>
                                ) : (
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                            color: AUTH.TEXT_SECONDARY,
                                        }}
                                    >
                                        Not available
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Microsoft Row - Coming Soon */}
                        <div
                            className="p-5 rounded-xl opacity-60 mb-4"
                            style={{
                                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: AUTH.BACKGROUND_TERTIARY }}
                                    >
                                        <MicrosoftIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>Microsoft</p>
                                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                                            Not connected
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: AUTH.BACKGROUND_QUATERNARY,
                                        color: AUTH.TEXT_SECONDARY,
                                    }}
                                >
                                    Coming Soon
                                </span>
                            </div>
                        </div>

                        {/* Facebook Row - Coming Soon */}
                        <div
                            className="p-5 rounded-xl opacity-60"
                            style={{
                                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: AUTH.BACKGROUND_TERTIARY }}
                                    >
                                        <FacebookIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>Facebook</p>
                                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                                            Not connected
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: AUTH.BACKGROUND_QUATERNARY,
                                        color: AUTH.TEXT_SECONDARY,
                                    }}
                                >
                                    Coming Soon
                                </span>
                            </div>
                        </div>

                        {linkError && (
                            <p className="text-sm mt-4" style={{ color: AUTH.TEXT_DANGER }}>{linkError}</p>
                        )}
                        {linkSuccess && (
                            <p className="text-sm mt-4" style={{ color: '#22c55e' }}>{linkSuccess}</p>
                        )}
                    </div>
                )}

                {activeSection === 'security' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>
                            Security
                        </h2>
                        <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Manage your password and security settings
                        </p>

                        {/* Email Verification Row */}
                        <div
                            className="p-5 rounded-xl mb-4"
                            style={{
                                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: user.emailVerified ? 'rgba(34, 197, 94, 0.15)' : AUTH.FOCUS_COLOR_30 }}
                                    >
                                        <ShieldCheck size={20} style={{ color: user.emailVerified ? '#22c55e' : AUTH.FOCUS_COLOR }} />
                                    </div>
                                    <div>
                                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>Email Verification</p>
                                        <p className="font-medium" style={{ color: user.emailVerified ? '#22c55e' : AUTH.TEXT_PRIMARY }}>
                                            {user.emailVerified ? 'Verified' : 'Not verified'}
                                        </p>
                                    </div>
                                </div>
                                {!user.emailVerified && (
                                    <button
                                        onClick={async () => {
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
                                        }}
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                                        style={{
                                            backgroundColor: AUTH.FOCUS_COLOR,
                                            color: '#fff',
                                        }}
                                    >
                                        Resend Email
                                    </button>
                                )}
                                {user.emailVerified && (
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                                            color: '#22c55e',
                                        }}
                                    >
                                        Secured
                                    </span>
                                )}
                            </div>
                            {verificationSent && (
                                <p className="text-sm mt-3" style={{ color: '#22c55e' }}>Verification email sent! Check your inbox.</p>
                            )}
                            {verificationError && (
                                <p className="text-sm mt-3" style={{ color: AUTH.TEXT_DANGER }}>{verificationError}</p>
                            )}
                        </div>

                        {/* Password Row */}
                        <div
                            className="p-5 rounded-xl"
                            style={{
                                backgroundColor: AUTH.BACKGROUND_SECONDARY,
                                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                            }}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: AUTH.FOCUS_COLOR_30 }}
                                    >
                                        <Lock size={20} style={{ color: AUTH.FOCUS_COLOR }} />
                                    </div>
                                    <div>
                                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>Password</p>
                                        {!isEditingPassword ? (
                                            <p className="font-medium" style={{ color: AUTH.TEXT_PRIMARY }}>••••••••</p>
                                        ) : (
                                            <div className="space-y-3 mt-2">
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="New password"
                                                    className="px-3 py-2 rounded-lg text-sm outline-none w-64 block"
                                                    style={{
                                                        backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                                        border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                                                        color: AUTH.TEXT_PRIMARY,
                                                    }}
                                                    autoFocus
                                                />
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Confirm password"
                                                    className="px-3 py-2 rounded-lg text-sm outline-none w-64 block"
                                                    style={{
                                                        backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                                        border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                                                        color: AUTH.TEXT_PRIMARY,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {!isEditingPassword ? (
                                    <button
                                        onClick={() => setIsEditingPassword(true)}
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                                        style={{
                                            backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                            color: AUTH.TEXT_PRIMARY,
                                        }}
                                    >
                                        Change
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handlePasswordSave}
                                            disabled={accountLoading}
                                            className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                            style={{ backgroundColor: '#22c55e', color: '#fff' }}
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            onClick={() => { setIsEditingPassword(false); setNewPassword(''); setConfirmPassword(''); setPasswordError('') }}
                                            className="p-2 rounded-lg transition-opacity hover:opacity-80"
                                            style={{ backgroundColor: AUTH.BACKGROUND_TERTIARY, color: AUTH.TEXT_PRIMARY }}
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            {passwordError && <p className="text-sm mt-3" style={{ color: AUTH.TEXT_DANGER }}>{passwordError}</p>}
                            {passwordSuccess && <p className="text-sm mt-3" style={{ color: '#22c55e' }}>{passwordSuccess}</p>}
                        </div>
                    </div>
                )}

                {activeSection === 'danger' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: '#ef4444' }}>
                            Delete Account
                        </h2>
                        <p className="mb-8" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Permanently remove your account and all data
                        </p>

                        <div
                            className="p-6 rounded-xl max-w-xl"
                            style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                            }}
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)' }}
                                >
                                    <Trash2 size={20} style={{ color: '#ef4444' }} />
                                </div>
                                <div>
                                    <p className="font-medium mb-1" style={{ color: AUTH.TEXT_PRIMARY }}>
                                        This action is irreversible
                                    </p>
                                    <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                                        Once you delete your account, all your data will be permanently removed.
                                        This includes your profile, settings, and any associated information.
                                    </p>
                                </div>
                            </div>

                            {deleteError && (
                                <p className="text-sm mb-4" style={{ color: AUTH.TEXT_DANGER }}>{deleteError}</p>
                            )}

                            {!showDeleteConfirm ? (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="px-5 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #ef4444',
                                        color: '#ef4444',
                                    }}
                                >
                                    I want to delete my account
                                </button>
                            ) : (
                                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                                    <p className="font-medium mb-4" style={{ color: '#ef4444' }}>
                                        Are you absolutely sure?
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleDeleteAccount}
                                            disabled={accountLoading}
                                            className="px-5 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                                            style={{ backgroundColor: '#ef4444', color: '#fff' }}
                                        >
                                            {accountLoading ? 'Deleting...' : 'Yes, delete my account'}
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="px-5 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                                            style={{
                                                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                                                color: AUTH.TEXT_PRIMARY,
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Account
