import React from 'react'

export interface ModalTimeInputProps {
    name?: string
    value?: string
    defaultValue?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    focusColor?: string
    className?: string
}

export const ModalTimeInput: React.FC<ModalTimeInputProps> = ({
    name,
    value,
    defaultValue,
    onChange,
    placeholder,
    required,
    focusColor,
    className = '',
}) => {
    return (
        <input
            type="time"
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`modal-date-input ${className}`.trim()}
            style={focusColor ? { '--focus-color': focusColor } as React.CSSProperties : undefined}
        />
    )
}
