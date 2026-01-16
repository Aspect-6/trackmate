import React from 'react'

export interface ModalSelectInputOptionProps {
    value: string
    children?: React.ReactNode
    disabled?: boolean
}

export const ModalSelectInputOption: React.FC<ModalSelectInputOptionProps> = ({
    value,
    children,
    disabled,
}) => {
    return (
        <option value={value} disabled={disabled}>
            {children ?? value}
        </option>
    )
}
