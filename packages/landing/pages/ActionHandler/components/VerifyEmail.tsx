import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { applyActionCode } from 'firebase/auth'
import { useHover } from '@shared/hooks/ui/useHover'
import type { ActionHandler } from '@/pages/ActionHandler/types'
import { auth } from '@shared/lib'
import { Title, HomeLink } from '@/app/components/AuthForm'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'

type VerificationState = 'loading' | 'success' | 'error'

const VerifyEmailAction: React.FC<ActionHandler.VerifyEmailAction.Props> = ({ oobCode }) => {
    const navigate = useNavigate()
    const [state, setState] = useState<VerificationState>('loading')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { isHovered, hoverProps } = useHover()

    useEffect(() => {
        let isMounted = true

        const handleEmailVerification = async () => {
            try {
                await applyActionCode(auth, oobCode)
                if (auth.currentUser) {
                    await auth.currentUser.reload()
                }
                if (isMounted) {
                    setState('success')
                }
            } catch (error: any) {
                console.error('Error verifying email:', error)
                
                if (!isMounted) return
                switch (error.code) {
                    case 'auth/expired-action-code':
                        setErrorMessage('This verification link has expired. Please request a new one.')
                        break
                    case 'auth/invalid-action-code':
                        setErrorMessage('This verification link is invalid or has already been used.')
                        break
                    case 'auth/user-disabled':
                        setErrorMessage('This account has been disabled.')
                        break
                    case 'auth/user-not-found':
                        setErrorMessage('No account found for this verification link.')
                        break
                    default:
                        setErrorMessage('Failed to verify email. Please request a new link.')
                }
                setState('error')
            }
        }

        handleEmailVerification()

        return () => { isMounted = false }
    }, [oobCode])

    const handleContinue = () => {
        if (auth.currentUser) {
            navigate('/landing')
        } else {
            navigate('/sign-in')
        }
    }

    return (
        <div className="min-h-dvh flex items-center justify-center p-4">
            <div
                className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl"
                style={{
                    backgroundColor: AUTH.BACKGROUND_SECONDARY,
                    border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                    boxShadow: '0 0 60px rgba(59, 130, 246, 0.15), 0 0 20px rgba(59, 130, 246, 0.04)',
                }}
            >
                <HomeLink />
                <Title>
                    {state === 'loading' && 'Verifying your email'}
                    {state === 'success' && 'Email verified!'}
                    {state === 'error' && 'Verification failed'}
                </Title>

                <div className="flex flex-col items-center space-y-6">
                    <div className="h-16 flex items-center justify-center">
                        {state === 'loading' && <Loader2 size={70} className="animate-spin" style={{ color: AUTH.GLOBAL_ACCENT }} />}
                        {state === 'success' && <CheckCircle size={64} style={{ color: AUTH.GLOBAL_ACCENT }} />}
                        {state === 'error' && <XCircle size={64} style={{ color: AUTH.TEXT_DANGER }} />}
                    </div>

                    <p className="text-sm text-center" style={{ color: AUTH.TEXT_SECONDARY }}>
                        {state === 'loading' && 'Please wait while we verify your email...'}
                        {state === 'success' && 'Your email has been successfully verified. You can now access all of TrackMate.'}
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
                            Continue to TrackMate
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

export default VerifyEmailAction
