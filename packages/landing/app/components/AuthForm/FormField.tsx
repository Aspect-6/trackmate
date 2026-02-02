import React from "react"

interface FormFieldProps {
    children: React.ReactNode
}

const FormField: React.FC<FormFieldProps> = ({ children }) => {
    return (
        <div className="space-y-2">
            {children}
        </div>
    )
}

export default FormField
