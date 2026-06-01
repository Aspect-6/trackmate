import React from "react"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"

const CanvasIntegrationContent: React.FC<CanvasIntegrationSettings.Content.Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-6">
            {children}
        </div>
    )
}

export default CanvasIntegrationContent
