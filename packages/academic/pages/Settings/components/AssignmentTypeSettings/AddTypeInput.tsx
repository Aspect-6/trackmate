import React from "react"
import { useFocus } from "@shared/hooks/ui/useFocus"
import type { AssignmentTypeSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const AddTypeInput: React.FC<AssignmentTypeSettings.AddTypeInputProps> = ({ value, onChange, placeholder }) => {
    const { isFocused, focusProps } = useFocus()
    
    return (
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder || "Assignment type"}
            className="flex-1 rounded-lg outline-none px-3 py-1"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_SECONDARY,
                color: SETTINGS.TEXT_SECONDARY,
                border: `1px solid ${isFocused ? SETTINGS.FOCUS_COLOR : SETTINGS.BORDER_PRIMARY}`
            }}
            {...focusProps}
        />
    )
}

export default AddTypeInput
