import React from "react"
import { AUTH } from "@/app/styles/colors"

interface FormFieldLabelProps {
    htmlFor: string
    children: React.ReactNode
}

const FormFieldLabel: React.FC<FormFieldLabelProps> = ({ htmlFor, children }) => {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium"
            style={{ color: AUTH.TEXT_PRIMARY }}
        >
            {children}
        </label>
    )
}

export default FormFieldLabel
