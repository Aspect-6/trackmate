import React from 'react'
import GoogleIcon from '@/app/assets/google-icon.svg?react'

const COLORS = {
    BACKGROUND_TERTIARY: 'var(--auth-bg-tertiary)',
    BORDER_PRIMARY: 'var(--auth-border-primary)',
    TEXT_PRIMARY: 'var(--auth-text-primary)',
}

interface GoogleButtonProps {
    children: React.ReactNode
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ children }) => {
    return (
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
            <GoogleIcon className="w-5 h-5" />
            {children}
        </button>
    )
}

export default GoogleButton
