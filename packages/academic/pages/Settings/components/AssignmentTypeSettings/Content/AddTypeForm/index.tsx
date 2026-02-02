import React from "react"
import type { AssignmentTypeSettings } from "@/pages/Settings/types"

const AddTypeForm: React.FC<AssignmentTypeSettings.Content.AddTypeForm.Props> = ({ children }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            {children}
        </div>
    )
}

export default AddTypeForm

export { default as AddTypeInput } from "./AddTypeInput"
export { default as AddTypeButton } from "./AddTypeButton"