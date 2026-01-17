import { useState } from 'react'
import { Title, FormField, FormFieldLabel, FormFieldTextInput, FormDivider, SubmitButton, GoogleButton } from '@/app/components/AuthForm'
import { useForm } from 'react-hook-form'
import { useSignUp } from '@/app/hooks/useSignUp'
import { BRAND_NAME } from '@shared/config/brand'
import './index.css'

const COLORS = {
    BACKGROUND_SECONDARY: 'var(--auth-bg-secondary)',
    BORDER_PRIMARY: 'var(--auth-border-primary)',
    TEXT_SECONDARY: 'var(--auth-text-secondary)',
    FOCUS_COLOR: 'var(--focus-color)',
    ERROR_TEXT: 'var(--auth-error-text, #ef4444)',
}

interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const { register, handleSubmit, watch, trigger, setError, clearErrors, formState: { errors, touchedFields } } = useForm<SignUpFormData>()
    const { signUpWithEmailAndPassword, signUpWithGoogle, loading } = useSignUp()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data: SignUpFormData) => {
        const { user, error } = await signUpWithEmailAndPassword(data.email, data.password)
        if (user) {
            console.log("User created:", user.uid)
            return
        }

        if (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('email', { message: 'This email is already registered. Please sign in.' })
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

    return (
        <div className="auth-page min-h-[100dvh] flex items-center justify-center p-4">
            <div
                className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl"
                style={{
                    backgroundColor: COLORS.BACKGROUND_SECONDARY,
                    border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                }}
            >
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
                            <span className="text-xs" style={{ color: COLORS.ERROR_TEXT }}>
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
                            <span className="text-xs" style={{ color: COLORS.ERROR_TEXT }}>
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
                            <span className="text-xs" style={{ color: COLORS.ERROR_TEXT }}>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </FormField>

                    <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: COLORS.TEXT_SECONDARY }}>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                            className="w-4 h-4 rounded"
                            style={{ accentColor: 'var(--auth-button-bg)' }}
                        />
                        Show password
                    </label>

                    {errors.root && (
                        <div className="text-sm text-center" style={{ color: COLORS.ERROR_TEXT }}>
                            {errors.root.message}
                        </div>
                    )}

                    <SubmitButton disabled={loading}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </SubmitButton>
                </form>

                <FormDivider />

                <GoogleButton onClick={handleGoogleSignUp}>Sign up with Google</GoogleButton>

                <p
                    className="mt-6 text-center text-sm"
                    style={{ color: COLORS.TEXT_SECONDARY }}
                >
                    Already have an account?{' '}
                    <a
                        href="/sign-in"
                        className="auth-link font-medium transition-colors duration-200"
                        style={{ color: COLORS.FOCUS_COLOR }}
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignUp
