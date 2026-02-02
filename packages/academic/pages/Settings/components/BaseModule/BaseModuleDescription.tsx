import React from "react"
import type { BaseSettingsModule } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const SettingsModuleDescription: React.FC<BaseSettingsModule.DescriptionProps> = ({ className, children }) => {
    return (
        <p
            className={"text-sm sm:text-base mb-3 " + className}
            style={{ color: SETTINGS.TEXT_SECONDARY }}
        >
            {children}
        </p>
    )
}

export default SettingsModuleDescription
