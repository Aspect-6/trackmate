import React from "react"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const CanvasIntegrationSettingsComponent: React.FC<CanvasIntegrationSettings.Props> = ({ children }) => {
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

export default CanvasIntegrationSettingsComponent

export { default as CanvasIntegrationContent } from "./Content"
export { default as ConnectionForm, ConnectionInput, ConnectionDropdown, ConnectionButton } from "./Content/ConnectionForm"
export { default as SyncStatus } from "./Content/SyncStatus"
export { default as SyncNowButton } from "./Content/SyncNowButton"
export { default as CourseMappingTable } from "./Content/CourseMappingTable"
export { default as DisconnectButton } from "./Content/DisconnectButton"
