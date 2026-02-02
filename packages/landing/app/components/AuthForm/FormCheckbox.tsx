import React from 'react'
import { AUTH } from '@/app/styles/colors'

interface FormCheckboxProps {
    checked: boolean
    onChange: (checked: boolean) => void
    children: React.ReactNode
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ checked, onChange, children }) => {
    return (
        <label
            className="flex items-center gap-2 text-sm cursor-pointer"
            style={{ color: AUTH.TEXT_SECONDARY }}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 rounded"
                style={{
                    accentColor: AUTH.PRIMARY_BUTTON_BG,
                    outline: 'none',
                }}
            />
            {children}
        </label>
    )
}

export default FormCheckbox
