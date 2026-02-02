import React from "react"

export interface ModalDateInputProps {
    name?: string
    value?: string
    defaultValue?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean
    focusColor?: string
    className?: string
}

export const ModalDateInput: React.FC<ModalDateInputProps> = ({
    name,
    value,
    defaultValue,
    onChange,
    required,
    focusColor,
    className = "",
}) => {
    return (
        <input
            type="date"
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            required={required}
            className={`modal-date-input ${className}`.trim()}
            style={focusColor ? { "--focus-color": focusColor } as React.CSSProperties : undefined}
        />
    )
}
