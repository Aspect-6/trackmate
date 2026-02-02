import React from "react"
import type { ThemeSettings } from "@/pages/Settings/types"

const ThemeSettingsContent: React.FC<ThemeSettings.Content.Props> = ({ children }) => {
    return (
        <div className="theme-toggle grid grid-cols-1 sm:grid-cols-2 gap-3">
            {children}
        </div>
    )
}

export default ThemeSettingsContent
