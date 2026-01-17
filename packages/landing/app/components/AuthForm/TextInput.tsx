import React from 'react'

const COLORS = {
    BACKGROUND_TERTIARY: 'var(--auth-bg-tertiary)',
    BORDER_PRIMARY: 'var(--auth-border-primary)',
    TEXT_PRIMARY: 'var(--auth-text-primary)',
}

interface FormFieldTextInputProps {
    type: string
    placeholder: string
    id?: string
    name?: string
    autoComplete?: string
}

const FormFieldTextInput: React.FC<FormFieldTextInputProps> = ({
    type,
    placeholder,
    id,
    name,
    autoComplete,
}) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="auth-input w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
            style={{
                backgroundColor: COLORS.BACKGROUND_TERTIARY,
                border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                color: COLORS.TEXT_PRIMARY,
            }}
        />
    )
}

export default FormFieldTextInput
