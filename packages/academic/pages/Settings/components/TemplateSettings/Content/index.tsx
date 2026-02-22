import React from "react"
import type { TemplateSettings } from "@/pages/Settings/types"

const TemplateSettingsContent: React.FC<TemplateSettings.Content.Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-4">
            {children}
        </div>
    )
}

export default TemplateSettingsContent
