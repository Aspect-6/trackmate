import { useState } from 'react'
import { Title, FormField, FormFieldLabel, FormFieldTextInput, FormDivider, SubmitButton, GoogleButton } from '@/app/components/AuthForm'
import { useForm } from 'react-hook-form'
import { useSignIn } from '@/app/hooks/useSignIn'
import { BRAND_NAME } from '@shared/config/brand'
import './index.css'

const COLORS = {
    BACKGROUND_SECONDARY: 'var(--auth-bg-secondary)',
    BORDER_PRIMARY: 'var(--auth-border-primary)',
    TEXT_SECONDARY: 'var(--auth-text-secondary)',
    FOCUS_COLOR: 'var(--focus-color)',
    ERROR_TEXT: 'var(--auth-error-text, #ef4444)',
}

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<SignInFormData>()
    const { signInWithEmailAndPassword, signInWithGoogle, loading } = useSignIn()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data: SignInFormData) => {
        const { user, error } = await signInWithEmailAndPassword(data.email, data.password)
        if (user) {
            return
        }

        if (error) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    setError('root', { message: 'Invalid email or password' })
                    break
                case 'auth/wrong-password':
                    setError('root', { message: 'Invalid email or password' })
                    break
                case 'auth/too-many-requests':
                    setError('root', { message: 'Too many failed attempts. Please try again later.' })
                    break
                default:
                    setError('root', { message: 'Failed to sign in. Please try again.' })
            }
        }
    }

    const handleGoogleSignIn = async () => {
        clearErrors()
        const { user, error } = await signInWithGoogle()
        if (user) {
            console.log("User signed in:", user.uid)
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
                    setError('root', { message: 'Failed to sign in with Google. Please try again.' })
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
                <Title>Sign in to {BRAND_NAME}</Title>

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
                            autoComplete="current-password"
                            hasError={!!errors.password}
                            {...register('password', {
                                required: 'Password is required'
                            })}
                        />
                        {errors.password && (
                            <span className="text-xs" style={{ color: COLORS.ERROR_TEXT }}>
                                {errors.password.message}
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
                        {loading ? 'Signing in...' : 'Sign In'}
                    </SubmitButton>
                </form>

                <FormDivider />

                <GoogleButton onClick={handleGoogleSignIn}>Sign in with Google</GoogleButton>

                <p
                    className="mt-6 text-center text-sm"
                    style={{ color: COLORS.TEXT_SECONDARY }}
                >
                    Don't have an account?{' '}
                    <a
                        href="/sign-up"
                        className="auth-link font-medium transition-colors duration-200"
                        style={{ color: COLORS.FOCUS_COLOR }}
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignIn
