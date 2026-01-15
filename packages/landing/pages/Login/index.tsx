import { useToast } from '@shared/contexts/ToastContext'
import './index.css'

// Local color constants (since landing doesn't have the GLOBAL config from academic)
const COLORS = {
    BACKGROUND_SECONDARY: 'var(--login-bg-secondary)',
    BACKGROUND_TERTIARY: 'var(--login-bg-tertiary)',
    BORDER_PRIMARY: 'var(--login-border-primary)',
    TEXT_PRIMARY: 'var(--login-text-primary)',
    TEXT_SECONDARY: 'var(--login-text-secondary)',
    TEXT_WHITE: 'var(--login-text-white)',
    FOCUS_COLOR: 'var(--focus-color)',
    FOCUS_COLOR_70: 'var(--focus-color-70)',
    BUTTON_BG: 'var(--login-button-bg)',
    BUTTON_BG_HOVER: 'var(--login-button-bg-hover)',
}

const APP_NAME = 'TrackMate'

const Login: React.FC = () => {
    const { showToast } = useToast()

    return (
        <div className="login-page min-h-screen flex items-center justify-center p-4 relative">
            {/* Background gradient layer */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(135deg, 
                        #0a0a0f 5%,
                        ${COLORS.FOCUS_COLOR_70} 45%,
                        ${COLORS.FOCUS_COLOR_70} 55%,
                        #0a0a0f 95%)`,
                    filter: 'brightness(0.4)',
                }}
            />
            {/* Noise texture overlay to reduce banding */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Login card - positioned above background */}
            <div
                className="login-card relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl"
                style={{
                    backgroundColor: COLORS.BACKGROUND_SECONDARY,
                    border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                }}
            >
                {/* Header / Branding */}
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: COLORS.TEXT_PRIMARY }}
                    >
                        {APP_NAME}
                    </h1>
                    <p
                        className="mt-2 text-sm"
                        style={{ color: COLORS.TEXT_SECONDARY }}
                    >
                        Sign in to {APP_NAME} Planners
                    </p>
                </div>

                {/* Login Form */}
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault() }}>
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                            style={{ color: COLORS.TEXT_PRIMARY }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="login-input w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
                            style={{
                                backgroundColor: COLORS.BACKGROUND_TERTIARY,
                                border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                                color: COLORS.TEXT_PRIMARY,
                            }}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                            style={{ color: COLORS.TEXT_PRIMARY }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className="login-input w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
                            style={{
                                backgroundColor: COLORS.BACKGROUND_TERTIARY,
                                border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                                color: COLORS.TEXT_PRIMARY,
                            }}
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="login-checkbox w-4 h-4 rounded cursor-pointer"
                            style={{
                                accentColor: COLORS.FOCUS_COLOR,
                            }}
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm cursor-pointer select-none"
                            style={{ color: COLORS.TEXT_SECONDARY }}
                        >
                            Remember me
                        </label>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="login-button w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                        style={{
                            backgroundColor: COLORS.BUTTON_BG,
                            color: COLORS.TEXT_WHITE,
                        }}
                        onClick={() => { showToast('Toast error', 'error') }}
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div
                        className="flex-1 h-px"
                        style={{ backgroundColor: COLORS.BORDER_PRIMARY }}
                    />
                    <span
                        className="px-4 text-sm"
                        style={{ color: COLORS.TEXT_SECONDARY }}
                    >
                        or
                    </span>
                    <div
                        className="flex-1 h-px"
                        style={{ backgroundColor: COLORS.BORDER_PRIMARY }}
                    />
                </div>

                {/* Google Sign In Button */}
                <button
                    type="button"
                    className="google-button w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-3"
                    style={{
                        backgroundColor: COLORS.BACKGROUND_TERTIARY,
                        border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                        color: COLORS.TEXT_PRIMARY,
                    }}
                    onClick={(e) => e.preventDefault()}
                >
                    {/* Google Icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Sign in with Google
                </button>

                {/* Sign Up Link */}
                <p
                    className="mt-6 text-center text-sm"
                    style={{ color: COLORS.TEXT_SECONDARY }}
                >
                    Don't have an account?{' '}
                    <a
                        href="/signup"
                        className="login-link font-medium transition-colors duration-200"
                        style={{ color: COLORS.FOCUS_COLOR }}
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login
