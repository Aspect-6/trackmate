import React from 'react'

const COLORS = {
    TEXT_WHITE: 'var(--auth-text-white)',
    BUTTON_BG: 'var(--auth-button-bg)',
}

interface SubmitButtonProps {
    children: React.ReactNode
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {
    return (
        <button
            type="submit"
            className="auth-button w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
                backgroundColor: COLORS.BUTTON_BG,
                color: COLORS.TEXT_WHITE,
            }}
        >
            {children}
        </button>
    )
}

export default SubmitButton
