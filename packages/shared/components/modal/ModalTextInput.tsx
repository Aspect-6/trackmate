import React from "react"

export interface ModalTextInputProps {
    name?: string
    value?: string
    defaultValue?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    focusColor?: string
    className?: string
}

export const ModalTextInput: React.FC<ModalTextInputProps> = ({
    name,
    value,
    defaultValue,
    onChange,
    onFocus,
    placeholder,
    required,
    focusColor,
    className = "",
}) => {
    return (
        <input
            type="text"
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            required={required}
            className={`modal-input ${className}`.trim()}
            style={focusColor ? { "--focus-color": focusColor } as React.CSSProperties : undefined}
        />
    )
}
