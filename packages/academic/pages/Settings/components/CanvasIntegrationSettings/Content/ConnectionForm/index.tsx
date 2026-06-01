import React from "react"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"

const ConnectionForm: React.FC<CanvasIntegrationSettings.Content.ConnectionForm.Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-3">
            {children}
        </div>
    )
}

export default ConnectionForm

export { default as ConnectionInput } from "./ConnectionInput"
export { default as ConnectionDropdown } from "./ConnectionDropdown"
export { default as ConnectionButton } from "./ConnectionButton"
