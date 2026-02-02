import React from "react"
import type { TermSettings } from "@/pages/Settings/types"

const TermModeDropdownOption: React.FC<TermSettings.Content.TermModeDropdown.OptionProps> = ({ value, children }) => {
    return (
        <option value={value}>{children}</option>
    )
}

export default TermModeDropdownOption
