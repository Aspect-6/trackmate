import React from "react"
import type { TermSettings } from "@/pages/Settings/types"

const TermSettingsContent: React.FC<TermSettings.Content.Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-4">
            {children}
        </div>
    )
}

export default TermSettingsContent

export { default as TermItem } from "./TermList/TermItem"