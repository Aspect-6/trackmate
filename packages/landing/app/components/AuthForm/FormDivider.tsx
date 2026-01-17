import React from 'react'

const COLORS = {
    BORDER_PRIMARY: 'var(--auth-border-primary)',
    TEXT_SECONDARY: 'var(--auth-text-secondary)',
}

const FormDivider: React.FC = () => {
    return (
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
    )
}

export default FormDivider
