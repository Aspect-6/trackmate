import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { useRedirect } from "@shared/hooks/useRedirect"
import { useSignUp } from "@/app/hooks/useSignUp"
import TrackMateLogo from "@shared/components/TrackMateLogo"
import { Title, FormField, FormFieldLabel, FormFieldTextInput, FormDivider, FormCheckbox, SubmitButton, ProviderButtons, FormLink, HomeLink } from "@/app/components/AuthForm"
import { BRAND_NAME } from "@shared/config/brand"
import { AUTH } from "@/app/styles/colors"

interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const { register, handleSubmit, watch, trigger, setError, clearErrors, formState: { errors, touchedFields } } = useForm<SignUpFormData>()
    const { signUpWithEmailAndPassword, signUpWithGoogle, signUpWithFacebook, sendVerificationEmail, loading } = useSignUp()
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get("redirect") || "/account"
    const redirect = useRedirect({ allowCrossApp: true })

    const onSubmit = async (data: SignUpFormData) => {
        if (!agreedToTerms) {
            setError("root", { message: "Please agree to the Terms of Service and Privacy Policy" })
            return
        }
        const { user, error } = await signUpWithEmailAndPassword(data.email, data.password)
        if (user) {
            await sendVerificationEmail()
            const verifyUrl = redirectTo !== "/account"
                ? `/auth/verify-email?redirect=${encodeURIComponent(redirectTo)}`
                : "/auth/verify-email"
            redirect(verifyUrl)
            return
        }

        if (error) setError("root", { message: "Failed to create account. Please try again" })
    }

    const handleProviderSignUp = async (
        provider: "Google" | "Facebook",
        signUpFn: typeof signUpWithGoogle
    ) => {
        clearErrors()
        if (!agreedToTerms) {
            setError("root", { message: "Please agree to the Terms of Service and Privacy Policy" })
            return
        }
        const { user, error } = await signUpFn()
        if (user) {
            redirect(redirectTo)
            return
        }

        if (error) {
            switch (error.code) {
                case "auth/user-cancelled":
                case "auth/popup-closed-by-user":
                    setError("root", { message: `${provider} sign-up was cancelled` })
                    break
                case "auth/popup-blocked":
                    setError("root", { message: `${provider} sign-up was blocked by browser` })
                    break
                default:
                    setError("root", { message: `Failed to sign up with ${provider}. Please try again.` })
            }
        }
    }

    const handleGoogleSignUp = () => handleProviderSignUp("Google", signUpWithGoogle)
    const handleFacebookSignUp = () => handleProviderSignUp("Facebook", signUpWithFacebook)

    return (
        <div className="min-h-dvh flex items-center justify-center p-4">
            <div
                className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl auth-card"
                style={{
                    backgroundColor: AUTH.BACKGROUND_SECONDARY,
                    border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                }}
            >
                <div className="flex justify-between items-start">
                    <HomeLink />
                    <TrackMateLogo size={32} showBackground={false} className="-mt-1 -mr-1" />
                </div>
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
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
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
                            type="password"
                            placeholder="••••••••"
                            id="password"
                            autoComplete="new-password"
                            hasError={!!errors.password}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                },
                                validate: {
                                    hasUppercase: (value) =>
                                        /[A-Z]/.test(value) || "Password must contain at least 1 uppercase letter",
                                    hasLowercase: (value) =>
                                        /[a-z]/.test(value) || "Password must contain at least 1 lowercase letter",
                                    hasNumber: (value) =>
                                        /[0-9]/.test(value) || "Password must contain at least 1 number",
                                    hasSpecialChar: (value) =>
                                        /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least 1 special character"
                                },
                                onChange: () => touchedFields.confirmPassword && trigger("confirmPassword")
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
                            type="password"
                            placeholder="••••••••"
                            id="confirmPassword"
                            autoComplete="new-password"
                            hasError={!!errors.confirmPassword}
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && (
                            <span className="text-xs" style={{ color: AUTH.TEXT_DANGER }}>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </FormField>

                    <FormCheckbox checked={agreedToTerms} onChange={setAgreedToTerms}>
                        <span className="text-[11px]">
                            I agree to the{" "}
                            <FormLink className="text-[11px]" href="/terms-of-service">Terms of Service</FormLink>{" "}
                            and <FormLink className="text-[11px]" href="/privacy-policy">Privacy Policy</FormLink>
                        </span>
                    </FormCheckbox>

                    {errors.root && (
                        <div className="text-sm text-center" style={{ color: AUTH.TEXT_DANGER }}>
                            {errors.root.message}
                        </div>
                    )}

                    <SubmitButton disabled={loading}>
                        {loading ? "Creating account..." : "Sign Up"}
                    </SubmitButton>
                </form>

                <FormDivider />

                <ProviderButtons onGoogleClick={handleGoogleSignUp} onFacebookClick={handleFacebookSignUp} />

                <p
                    className="mt-6 text-center text-sm"
                    style={{ color: AUTH.TEXT_SECONDARY }}
                >
                    Already have an account?{" "}
                    <FormLink href={redirectTo !== "/account" ? `/auth/sign-in?redirect=${encodeURIComponent(redirectTo)}` : "/auth/sign-in"}>Sign in</FormLink>
                </p>
            </div>
        </div>
    )
}

export default SignUp
