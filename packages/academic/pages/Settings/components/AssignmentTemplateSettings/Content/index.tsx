import React from "react"
import type { AssignmentTemplateSettings } from "@/pages/Settings/types"

const AssignmentTemplateSettingsContent: React.FC<AssignmentTemplateSettings.Content.Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-4">
            {children}
        </div>
    )
}

export default AssignmentTemplateSettingsContent
