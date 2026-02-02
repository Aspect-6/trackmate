import React from "react"

export interface ModalTextareaInputProps {
    name?: string
    value?: string
    defaultValue?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    rows?: number
    required?: boolean
    focusColor?: string
    className?: string
}

export const ModalTextareaInput: React.FC<ModalTextareaInputProps> = ({
    name,
    value,
    defaultValue,
    onChange,
    placeholder,
    rows = 2,
    required,
    focusColor,
    className = "",
}) => {
    return (
        <textarea
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            required={required}
            className={`modal-textarea ${className}`.trim()}
            style={focusColor ? { "--focus-color": focusColor } as React.CSSProperties : undefined}
        />
    )
}
