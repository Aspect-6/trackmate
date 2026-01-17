import Title from '@/app/components/AuthForm/Title'
import FormField from '@/app/components/AuthForm/FormField'
import FormFieldLabel from '@/app/components/AuthForm/FormLabel'
import FormFieldTextInput from '@/app/components/AuthForm/TextInput'
import FormDivider from '@/app/components/AuthForm/FormDivider'
import SubmitButton from '@/app/components/AuthForm/SubmitButton'
import GoogleButton from '@/app/components/AuthForm/GoogleButton'
import { BRAND_NAME } from '@shared/config/brand'
import './index.css'

// Local color constants (since landing doesn't have the GLOBAL config from academic)
const COLORS = {
    BACKGROUND_SECONDARY: 'var(--auth-bg-secondary)',
    BORDER_PRIMARY: 'var(--auth-border-primary)',
    TEXT_SECONDARY: 'var(--auth-text-secondary)',
    FOCUS_COLOR: 'var(--focus-color)',
}

const SignUp: React.FC = () => {
    return (
        <div className="auth-page min-h-screen flex items-center justify-center p-4">
            {/* Signup card */}
            <div
                className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl"
                style={{
                    backgroundColor: COLORS.BACKGROUND_SECONDARY,
                    border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                }}
            >
                {/* Header / Branding */}
                <Title>Create your {BRAND_NAME} account</Title>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <FormField>
                        <FormFieldLabel htmlFor="email">Email</FormFieldLabel>
                        <FormFieldTextInput
                            type="email"
                            placeholder="you@example.com"
                            id="email"
                            name="email"
                            autoComplete="email"
                        />
                    </FormField>

                    <FormField>
                        <FormFieldLabel htmlFor="password">Password</FormFieldLabel>
                        <FormFieldTextInput
                            type="password"
                            placeholder="••••••••"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                        />
                    </FormField>

                    <FormField>
                        <FormFieldLabel htmlFor="confirm-password">Confirm Password</FormFieldLabel>
                        <FormFieldTextInput
                            type="password"
                            placeholder="••••••••"
                            id="confirm-password"
                            name="confirm-password"
                            autoComplete="new-password"
                        />
                    </FormField>

                    <SubmitButton onClick={() => {}}>
                        Sign Up
                    </SubmitButton>
                </form>

                <FormDivider />

                <GoogleButton>Sign up with Google</GoogleButton>

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
