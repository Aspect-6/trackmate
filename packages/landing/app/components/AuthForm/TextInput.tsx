import React from 'react'
import { useFocus } from '@shared/hooks/ui/useFocus'
import { AUTH } from '@/app/styles/colors'

interface FormFieldTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
}

const FormFieldTextInput: React.FC<FormFieldTextInputProps> = ({ hasError, ...props }) => {
    const { isFocused, focusProps } = useFocus()

    const getBorderColor = () => {
        if (isFocused) return AUTH.FOCUS_COLOR
        if (hasError) return AUTH.TEXT_DANGER
        return AUTH.BORDER_PRIMARY
    }

    return (
        <input
            {...props}
            {...focusProps}
            className="authform-input w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
            style={{
                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                border: `1px solid ${getBorderColor()}`,
                color: AUTH.TEXT_PRIMARY,
                outline: 'none',
                boxShadow: isFocused ? `0 0 0 2px ${AUTH.FOCUS_COLOR_30}` : 'none',
            }}
        />
    )
}

export default FormFieldTextInput

