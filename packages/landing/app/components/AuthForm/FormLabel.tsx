import React from 'react'

const COLORS = {
    TEXT_PRIMARY: 'var(--auth-text-primary)',
}

interface FormFieldLabelProps {
    htmlFor: string
    children: React.ReactNode
}

const FormFieldLabel: React.FC<FormFieldLabelProps> = ({ htmlFor, children }) => {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium"
            style={{ color: COLORS.TEXT_PRIMARY }}
        >
            {children}
        </label>
    )
}

export default FormFieldLabel
