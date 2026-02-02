import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'
import { useHover } from '@shared/hooks/ui/useHover'
import { useForm } from 'react-hook-form'
import type { ActionHandler } from '@/pages/AuthAction/types'
import { auth } from '@shared/lib'
import { Title, HomeLink, FormField, FormFieldLabel, FormFieldTextInput, FormCheckbox } from '@/app/components/AuthForm'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { AUTH } from '@/app/styles/colors'

type ResetState = 'loading' | 'form' | 'success' | 'error'

const ResetPasswordAction: React.FC<ActionHandler.ResetPasswordAction.Props> = ({ oobCode }) => {
    const navigate = useNavigate()
    const [state, setState] = useState<ResetState>('loading')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [showPassword, setShowPassword] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const { isHovered, hoverProps } = useHover()

    const { register, handleSubmit, formState: { errors }, setError } = useForm<ActionHandler.ResetPasswordAction.FormData>()

    useEffect(() => {
        let isMounted = true

        const verifyCode = async () => {
            try {
                const userEmail = await verifyPasswordResetCode(auth, oobCode)
                if (isMounted) {
                    setEmail(userEmail)
                    setState('form')
                }
            } catch (error: any) {
                console.error('Error verifying reset code:', error)

                if (!isMounted) return
                switch (error.code) {
                    case 'auth/expired-action-code':
                        setErrorMessage('This password reset link has expired. Please request a new one.')
                        break
                    case 'auth/invalid-action-code':
                        setErrorMessage('This password reset link is invalid or has already been used.')
                        break
                    case 'auth/user-disabled':
                        setErrorMessage('This account has been disabled.')
                        break
                    case 'auth/user-not-found':
                        setErrorMessage('No account found for this reset link.')
                        break
                    default:
                        setErrorMessage('Failed to verify reset link. Please request a new one.')
                }
                setState('error')
            }
        }

        verifyCode()

        return () => { isMounted = false }
    }, [oobCode])

    const onSubmit = async (data: ActionHandler.ResetPasswordAction.FormData) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', { message: 'Passwords do not match' })
            return
        }

        setSubmitting(true)
        try {
            await confirmPasswordReset(auth, oobCode, data.password)
            setState('success')
        } catch (error: any) {
            console.error('Error resetting password:', error)
            switch (error.code) {
                case 'auth/expired-action-code':
                    setErrorMessage('This password reset link has expired. Please request a new one.')
                    setState('error')
                    break
                case 'auth/invalid-action-code':
                    setErrorMessage('This password reset link is invalid or has already been used.')
                    setState('error')
                    break
                case 'auth/weak-password':
                    setError('password', { message: 'Password is too weak. Please use a stronger password.' })
                    break
                default:
                    setErrorMessage('Failed to reset password. Please try again.')
                    setState('error')
            }
        } finally {
            setSubmitting(false)
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
                <Title>
                    {state === 'loading' && 'Verifying reset link'}
                    {state === 'form' && 'Reset your password'}
                    {state === 'success' && 'Password reset!'}
                    {state === 'error' && 'Reset failed'}
                </Title>

                {state === 'loading' && (
                    <div className="flex flex-col items-center space-y-6">
                        <div className="h-16 flex items-center justify-center">
                            <Loader2 size={70} className="animate-spin" style={{ color: AUTH.GLOBAL_ACCENT }} />
                        </div>
                        <p className="text-sm text-center" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Please wait while we verify your reset link...
                        </p>
                    </div>
                )}

                {state === 'form' && (
                    <div className="space-y-5">
                        <p className="text-sm text-center" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Enter a new password for <span className="font-semibold" style={{ color: AUTH.TEXT_PRIMARY }}>{email}</span>
                        </p>

                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <FormField>
                                <FormFieldLabel htmlFor="password">New Password</FormFieldLabel>
                                <FormFieldTextInput
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    id="password"
                                    autoComplete="new-password"
                                    hasError={!!errors.password}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                />
                                {errors.password && (
                                    <span className="text-xs" style={{ color: AUTH.TEXT_DANGER }}>
                                        {errors.password.message}
                                    </span>
                                )}
                            </FormField>

                            <FormField>
                                <FormFieldLabel htmlFor="confirmPassword">Confirm Password</FormFieldLabel>
                                <FormFieldTextInput
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    hasError={!!errors.confirmPassword}
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password'
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-xs" style={{ color: AUTH.TEXT_DANGER }}>
                                        {errors.confirmPassword.message}
                                    </span>
                                )}
                            </FormField>

                            <FormCheckbox checked={showPassword} onChange={setShowPassword}>
                                Show password
                            </FormCheckbox>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                                style={{
                                    backgroundColor: isHovered ? AUTH.PRIMARY_BUTTON_BG_HOVER : AUTH.PRIMARY_BUTTON_BG,
                                    color: AUTH.TEXT_WHITE,
                                    willChange: 'transform',
                                    transform: isHovered ? 'translateY(-0.65px)' : 'none',
                                }}
                                {...hoverProps}
                            >
                                {submitting ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    </div>
                )}

                {state === 'success' && (
                    <div className="flex flex-col items-center space-y-6">
                        <div className="h-16 flex items-center justify-center">
                            <CheckCircle size={64} style={{ color: AUTH.GLOBAL_ACCENT }} />
                        </div>
                        <p className="text-sm text-center" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Your password has been successfully reset. You can now sign in with your new password.
                        </p>
                        <button
                            onClick={() => navigate('/auth/sign-in')}
                            className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                            style={{
                                backgroundColor: isHovered ? AUTH.PRIMARY_BUTTON_BG_HOVER : AUTH.PRIMARY_BUTTON_BG,
                                color: AUTH.TEXT_WHITE,
                                willChange: 'transform',
                                transform: isHovered ? 'translateY(-0.65px)' : 'none',
                            }}
                            {...hoverProps}
                        >
                            Sign In
                        </button>
                    </div>
                )}

                {state === 'error' && (
                    <div className="flex flex-col items-center space-y-6">
                        <div className="h-16 flex items-center justify-center">
                            <XCircle size={64} style={{ color: AUTH.TEXT_DANGER }} />
                        </div>
                        <p className="text-sm text-center" style={{ color: AUTH.TEXT_SECONDARY }}>
                            {errorMessage}
                        </p>
                        <button
                            onClick={() => navigate('/auth/sign-in')}
                            className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                            style={{
                                backgroundColor: isHovered ? AUTH.PRIMARY_BUTTON_BG_HOVER : AUTH.PRIMARY_BUTTON_BG,
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

export default ResetPasswordAction
