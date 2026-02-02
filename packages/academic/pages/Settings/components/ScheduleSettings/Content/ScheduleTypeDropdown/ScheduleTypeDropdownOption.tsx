import React from "react"
import type { ScheduleSettings } from "@/pages/Settings/types"

const ScheduleTypeDropdownOption: React.FC<ScheduleSettings.Content.ScheduleTypeDropdown.OptionProps> = ({ value, children }) => {
    return (
        <option value={value}>{children}</option>
    )
}

export default ScheduleTypeDropdownOption
