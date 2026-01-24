import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '@shared/lib'
import { sendUserEmailVerification } from '@/app/lib/auth'
import { Title, FormDivider, HomeLink } from '@/app/components/AuthForm'
import { AUTH } from '@/app/styles/colors'

const VerifyEmail: React.FC = () => {
    const navigate = useNavigate()
    const [sending, setSending] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        const checkVerification = async () => {
            if (!auth.currentUser) {
                navigate('/sign-in')
                return
            }
            await auth.currentUser.reload()
            if (auth.currentUser.emailVerified) {
                navigate('/account')
            }
        }

        checkVerification()
        const intervalId = setInterval(checkVerification, 3000)

        return () => clearInterval(intervalId)
    }, [navigate])

    const handleResendEmail = async () => {
        setSending(true)
        setMessage(null)
        try {
            await sendUserEmailVerification()
        } catch (error: any) {
            console.error("Error sending verification email:", error)
            if (error.code === 'auth/too-many-requests') {
                setMessage("Please wait a moment before trying again.")
            } else {
                setMessage("Failed to send email. Please try again.")
            }
        } finally {
            setSending(false)
        }
    }

    if (!auth.currentUser) {
        return null
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
                <Title>Verify your email</Title>

                <div className="space-y-6 text-center">
                    <p style={{ color: AUTH.TEXT_SECONDARY }}>
                        We've sent a verification email to <br />
                        <span className="font-semibold" style={{ color: AUTH.TEXT_PRIMARY }}>{auth.currentUser.email}</span>
                    </p>

                    <p className="text-sm max-w-xs mx-auto" style={{ color: AUTH.TEXT_SECONDARY }}>
                        Please click the link in the email to verify your email exists.
                        Once verified, you will be automatically redirected to TrackMate.
                    </p>

                    <FormDivider />

                    <div className="space-y-4">
                        <p className="text-sm" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Didn't receive the email?{" "}
                            <button
                                onClick={handleResendEmail}
                                disabled={sending}
                                className="font-medium text-sm hover:underline focus:outline-none"
                                style={{ color: AUTH.GLOBAL_ACCENT }}
                            >
                                {sending ? 'Sending...' : 'Resend verification email'}
                            </button>
                        </p>

                        {message && (
                            <p className="text-sm" style={{ color: AUTH.TEXT_DANGER }}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
