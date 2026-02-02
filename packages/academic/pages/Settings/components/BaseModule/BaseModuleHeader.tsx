import React from "react"
import type { BaseSettingsModule } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const SettingsModuleHeader: React.FC<BaseSettingsModule.HeaderProps> = ({
    title,
    color = SETTINGS.TEXT_PRIMARY,
    className
}) => {
    return (
        <h2
            className={"text-lg sm:text-xl font-bold " + className}
            style={{ color }}
        >
            {title}
        </h2>
    )
}

export default SettingsModuleHeader
