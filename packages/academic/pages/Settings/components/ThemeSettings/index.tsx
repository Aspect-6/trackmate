import React from "react"
import type { ThemeSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const ThemeSettingsComponent: React.FC<ThemeSettings.Props> = ({ children }) => {
    return (
        <div
            className="p-6 rounded-xl mb-6 shadow-md"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            {children}
        </div>
    )
}

export default ThemeSettingsComponent

export { default as ThemeSettingsContent } from "./Content"
export { default as ThemeButton } from "./Content/ThemeButton"
