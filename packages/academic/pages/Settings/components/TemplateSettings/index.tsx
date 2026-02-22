import React from "react"
import type { TemplateSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const TemplateSettings: React.FC<TemplateSettings.Props> = ({ children }) => {
    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl shadow-md mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            {children}
        </div>
    )
}

export default TemplateSettings

export { default as TemplateSettingsContent } from "./Content"
export { default as TemplateList } from "./Content/TemplateList"
export { default as TemplateRow } from "./Content/TemplateList/TemplateRow"
export { default as AddTemplateButton } from "./Content/AddTemplateButton"
export { default as NoTemplatesYetButton } from "./Content/NoTemplatesYetButton"
