import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Title, FormField, FormFieldLabel, FormFieldTextInput, FormDivider, FormCheckbox, SubmitButton, SocialButtons, FormLink, HomeLink } from '@/app/components/AuthForm'
import { useForm } from 'react-hook-form'
import { useSignIn } from '@/app/hooks/useSignIn'
import { BRAND_NAME } from '@shared/config/brand'
import { AUTH } from '@/app/styles/colors'

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<SignInFormData>()
    const { signInWithEmailAndPassword, signInWithGoogle, loading } = useSignIn()
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const onSubmit = async (data: SignInFormData) => {
        const { user, error } = await signInWithEmailAndPassword(data.email, data.password)
        if (user) {
            navigate('/account')
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
            navigate('/account')
            return
        }

        if (error) {
            switch (error.code) {
                case 'auth/account-not-found':
                    setError('root', { message: 'No account found. Please sign up first.' })
                    break
                case 'auth/user-cancelled':
                    setError('root', { message: 'Google sign-in was cancelled' })
                    break
                case 'auth/popup-closed-by-user':
                    setError('root', { message: 'Google sign-in window was closed' })
                    break
                case 'auth/popup-blocked':
                    setError('root', { message: 'Google sign-in window was blocked' })
                    break
                default:
                    setError('root', { message: 'Failed to sign in with Google. Please try again.' })
            }
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
                            autoComplete="current-password"
                            hasError={!!errors.password}
                            {...register('password', {
                                required: 'Password is required'
                            })}
                        />
                        {errors.password && (
                            <span className="text-xs" style={{ color: AUTH.TEXT_DANGER }}>
                                {errors.password.message}
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
                        {loading ? 'Signing in...' : 'Sign In'}
                    </SubmitButton>
                </form>

                <FormDivider />

                <SocialButtons onGoogleClick={handleGoogleSignIn} />

                <p
                    className="mt-6 text-center text-sm"
                    style={{ color: AUTH.TEXT_SECONDARY }}
                >
                    Don't have an account?{' '}
                    <FormLink href="/sign-up">Sign up</FormLink>
                </p>
            </div>
        </div>
    )
}

export default SignIn
