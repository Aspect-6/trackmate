import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@shared/lib'
import { Title, FormField, FormFieldLabel, FormFieldTextInput, HomeLink, FormLink } from '@/app/components/AuthForm'
import { useForm } from 'react-hook-form'
import { AUTH } from '@/app/styles/colors'
import { useHover } from '@shared/hooks/ui/useHover'
import { CheckCircle } from 'lucide-react'

interface ForgotPasswordFormData {
    email: string
}

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setError } = useForm<ForgotPasswordFormData>()
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [sentEmail, setSentEmail] = useState('')
    const { isHovered, hoverProps } = useHover()

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setLoading(true)
        try {


            await sendPasswordResetEmail(auth, data.email)
            setSentEmail(data.email)
            setEmailSent(true)
        } catch (error: any) {
            console.error('Error sending password reset email:', error)
            switch (error.code) {
                case 'auth/user-not-found':
                    setSentEmail(data.email)
                    setEmailSent(true)
                    break
                case 'auth/invalid-email':
                    setError('email', { message: 'Please enter a valid email address' })
                    break
                case 'auth/too-many-requests':
                    setError('root', { message: 'Too many requests. Please try again later.' })
                    break
                default:
                    setError('root', { message: 'Something went wrong. Please try again.' })
            }
        } finally {
            setLoading(false)
        }
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
                <Title>{emailSent ? 'Check your email' : 'Reset your password'}</Title>

                {!emailSent ? (
                    <>
                        <p
                            className="mt-10 text-sm text-center mb-6 max-w-xs mx-auto"
                            style={{ color: AUTH.TEXT_SECONDARY }}
                        >
                            Enter your email address here and we'll send you a link to reset your password.
                        </p>

                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <FormField>
                                <FormFieldLabel htmlFor="email">Email</FormFieldLabel>
                                <FormFieldTextInput
                                    type="email"
                                    placeholder="you@example.com"
                                    id="email"
                                    autoComplete="email"
                                    hasError={!!errors.email}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <span className="text-xs" style={{ color: AUTH.TEXT_DANGER }}>
                                        {errors.email.message}
                                    </span>
                                )}
                            </FormField>

                            {errors.root && (
                                <div className="text-sm text-center" style={{ color: AUTH.TEXT_DANGER }}>
                                    {errors.root.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                                style={{
                                    backgroundColor: isHovered ? AUTH.SUBMIT_BUTTON_BG_HOVER : AUTH.SUBMIT_BUTTON_BG,
                                    color: AUTH.TEXT_WHITE,
                                    willChange: 'transform',
                                    transform: isHovered ? 'translateY(-0.65px)' : 'none',
                                }}
                                {...hoverProps}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>

                        <p
                            className="mt-6 text-center text-sm"
                            style={{ color: AUTH.TEXT_SECONDARY }}
                        >
                            Remember your password?{' '}
                            <FormLink href="/auth/sign-in">Sign in</FormLink>
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-6">
                        <div className="h-16 flex items-center justify-center">
                            <CheckCircle size={64} style={{ color: AUTH.GLOBAL_ACCENT }} />
                        </div>
                        <p className="text-sm text-center" style={{ color: AUTH.TEXT_SECONDARY }}>
                            We've sent a password reset link to{' '}
                            <span className="font-semibold" style={{ color: AUTH.TEXT_PRIMARY }}>{sentEmail}</span>
                        </p>
                        <p className="text-sm text-center" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Please check your inbox and click the link to reset your password.
                        </p>
                        <button
                            onClick={() => navigate('/auth/sign-in')}
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword
