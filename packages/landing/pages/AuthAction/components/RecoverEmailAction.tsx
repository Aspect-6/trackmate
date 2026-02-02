import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { applyActionCode, signOut } from 'firebase/auth'
import { useHover } from '@shared/hooks/ui/useHover'
import type { ActionHandler } from '@/pages/AuthAction/types'
import { auth } from '@shared/lib'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Title, HomeLink } from '@/app/components/AuthForm'
import { AUTH } from '@/app/styles/colors'

type RecoveryState = 'loading' | 'success' | 'error'

const RecoverEmailAction: React.FC<ActionHandler.RecoverEmailActionProps> = ({ oobCode }) => {
    const navigate = useNavigate()
    const [state, setState] = useState<RecoveryState>('loading')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { isHovered, hoverProps } = useHover()
    const hasAttempted = useRef(false)

    useEffect(() => {
        if (hasAttempted.current) return
        hasAttempted.current = true

        const handleEmailRecovery = async () => {
            try {
                await applyActionCode(auth, oobCode)
                await signOut(auth)
                setState('success')
            } catch (error: any) {
                if (import.meta.env.DEV) console.error('Error recovering email:', error)

                if (error.code === 'auth/user-token-expired') {
                    await signOut(auth)
                    setState('success')
                    return
                }

                switch (error.code) {
                    case 'auth/expired-action-code':
                        setErrorMessage('This email recovery link has expired. Please contact support.')
                        break
                    case 'auth/invalid-action-code':
                        setErrorMessage('This email recovery link is invalid or has already been used.')
                        break
                    case 'auth/user-disabled':
                        setErrorMessage('This account has been disabled.')
                        break
                    case 'auth/user-not-found':
                        setErrorMessage('No account found for this recovery link.')
                        break
                    default:
                        setErrorMessage('Failed to recover email. Please contact support.')
                }
                setState('error')
            }
        }

        handleEmailRecovery()
    }, [oobCode])

    const handleContinue = () => {
        navigate('/sign-in')
    }

    return (
        <div className="min-h-dvh flex items-center justify-center p-4">
            <div
                className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl auth-card"
                style={{
                    backgroundColor: AUTH.BACKGROUND_SECONDARY,
                    border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                }}
            >
                <HomeLink />
                <Title>
                    {state === 'loading' && 'Recovering your email'}
                    {state === 'success' && 'Email recovered!'}
                    {state === 'error' && 'Recovery failed'}
                </Title>

                <div className="flex flex-col items-center space-y-6">
                    <div className="h-16 flex items-center justify-center">
                        {state === 'loading' && <Loader2 size={70} className="animate-spin" style={{ color: AUTH.GLOBAL_ACCENT }} />}
                        {state === 'success' && <CheckCircle size={64} style={{ color: AUTH.GLOBAL_ACCENT }} />}
                        {state === 'error' && <XCircle size={64} style={{ color: AUTH.TEXT_DANGER }} />}
                    </div>

                    <p className="text-sm text-center" style={{ color: AUTH.TEXT_SECONDARY }}>
                        {state === 'loading' && 'Please wait while we recover your email...'}
                        {state === 'success' && 'Your email has been successfully reverted. Please sign in with your original email. If you did not request this change, please reset your password for your security.'}
                        {state === 'error' && errorMessage}
                    </p>

                    {state === 'success' && (
                        <button
                            onClick={handleContinue}
                            className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                            style={{
                                backgroundColor: isHovered ? AUTH.SUBMIT_BUTTON_BG_HOVER : AUTH.SUBMIT_BUTTON_BG,
                                color: AUTH.TEXT_WHITE,
                                willChange: 'transform',
                                transform: isHovered ? 'translateY(-0.65px)' : 'none',
                            }}
                            {...hoverProps}
                        >
                            Sign In with Recovered Email
                        </button>
                    )}

                    {state === 'error' && (
                        <button
                            onClick={() => navigate('/sign-in')}
                            className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                            style={{
                                backgroundColor: isHovered ? AUTH.SUBMIT_BUTTON_BG_HOVER : AUTH.SUBMIT_BUTTON_BG,
                                color: AUTH.TEXT_WHITE,
                                willChange: 'transform',
                                transform: isHovered ? 'translateY(-0.65px)' : 'none',
                            }}
                            {...hoverProps}
                        >
                            Back to Sign In
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RecoverEmailAction
