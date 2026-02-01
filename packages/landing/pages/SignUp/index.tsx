import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { useSignUp } from '@/app/hooks/useSignUp'
import { useRedirect } from '@shared/hooks/useRedirect'
import { Title, FormField, FormFieldLabel, FormFieldTextInput, FormDivider, FormCheckbox, SubmitButton, ProviderButtons, FormLink, HomeLink } from '@/app/components/AuthForm'
import { BRAND_NAME } from '@shared/config/brand'
import { AUTH } from '@/app/styles/colors'

interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const { register, handleSubmit, watch, trigger, setError, clearErrors, formState: { errors, touchedFields } } = useForm<SignUpFormData>()
    const { signUpWithEmailAndPassword, signUpWithGoogle, signUpWithFacebook, sendVerificationEmail, loading } = useSignUp()
    const [showPassword, setShowPassword] = useState(false)
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get('redirect') || '/account'
    const redirect = useRedirect({ allowCrossApp: true })

    const onSubmit = async (data: SignUpFormData) => {
        const { user, error } = await signUpWithEmailAndPassword(data.email, data.password)
        if (user) {
            await sendVerificationEmail()
            const verifyUrl = redirectTo !== '/account'
                ? `/verify-email?redirect=${encodeURIComponent(redirectTo)}`
                : '/verify-email'
            redirect(verifyUrl)
            return
        }

        if (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('root', { message: 'Failed to create account. Please try again' })
                    break
                default:
                    setError('root', { message: 'Failed to create account. Please try again' })
            }
        }
    }

    const handleGoogleSignUp = async () => {
        clearErrors()
        const { user, error } = await signUpWithGoogle()
        if (user) {
            redirect(redirectTo)
            return
        }

        if (error) {
            switch (error.code) {
                case 'auth/user-cancelled':
                    setError('root', { message: 'Google sign-up was cancelled' })
                    break
                case 'auth/popup-closed-by-user':
                    setError('root', { message: 'Google sign-up window was closed' })
                    break
                case 'auth/popup-blocked':
                    setError('root', { message: 'Google sign-up window was blocked' })
                    break
                default:
                    setError('root', { message: 'Failed to sign up with Google. Please try again.' })
            }
        }
    }

    const handleFacebookSignUp = async () => {
        clearErrors()
        const { user, error } = await signUpWithFacebook()
        if (user) {
            redirect(redirectTo)
            return
        }

        if (error) {
            switch (error.code) {
                case 'auth/user-cancelled':
                    setError('root', { message: 'Facebook sign-up was cancelled' })
                    break
                case 'auth/popup-closed-by-user':
                    setError('root', { message: 'Facebook sign-up window was closed' })
                    break
                case 'auth/popup-blocked':
                    setError('root', { message: 'Facebook sign-up window was blocked' })
                    break
                default:
                    setError('root', { message: 'Failed to sign up with Facebook. Please try again.' })
            }
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
                <Title>Create your {BRAND_NAME} account</Title>

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

                    <FormField>
                        <FormFieldLabel htmlFor="password">Password</FormFieldLabel>
                        <FormFieldTextInput
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            id="password"
                            autoComplete="new-password"
                            hasError={!!errors.password}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                },
                                validate: {
                                    hasUppercase: (value) =>
                                        /[A-Z]/.test(value) || 'Password must contain at least 1 uppercase letter',
                                    hasNumber: (value) =>
                                        /[0-9]/.test(value) || 'Password must contain at least 1 number',
                                    hasSpecialChar: (value) =>
                                        /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must contain at least 1 special character'
                                },
                                onChange: () => touchedFields.confirmPassword && trigger('confirmPassword')
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
                                required: 'Please confirm your password',
                                validate: (value) =>
                                    value === watch('password') || 'Passwords do not match'
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

                    {errors.root && (
                        <div className="text-sm text-center" style={{ color: AUTH.TEXT_DANGER }}>
                            {errors.root.message}
                        </div>
                    )}

                    <SubmitButton disabled={loading}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </SubmitButton>
                </form>

                <FormDivider />

                <ProviderButtons onGoogleClick={handleGoogleSignUp} onFacebookClick={handleFacebookSignUp} />

                <p
                    className="mt-6 text-center text-sm"
                    style={{ color: AUTH.TEXT_SECONDARY }}
                >
                    Already have an account?{' '}
                    <FormLink href={redirectTo !== '/account' ? `/sign-in?redirect=${encodeURIComponent(redirectTo)}` : '/sign-in'}>Sign in</FormLink>
                </p>
            </div>
        </div>
    )
}

export default SignUp
