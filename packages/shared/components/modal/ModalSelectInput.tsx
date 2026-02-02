import React from "react"

export interface ModalSelectInputProps {
    name?: string
    value?: string
    defaultValue?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    required?: boolean
    focusColor?: string
    className?: string
    children: React.ReactNode
}

export const ModalSelectInput: React.FC<ModalSelectInputProps> = ({
    name,
    value,
    defaultValue,
    onChange,
    required,
    focusColor,
    className = "",
    children,
}) => {
    return (
        <select
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            required={required}
            className={`app-select-dropdown ${className}`.trim()}
            style={focusColor ? { "--focus-color": focusColor } as React.CSSProperties : undefined}
        >
            {children}
        </select>
    )
}
