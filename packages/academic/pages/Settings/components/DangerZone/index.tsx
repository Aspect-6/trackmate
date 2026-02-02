import React from "react"
import type { DangerZone } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const DangerZoneSettings: React.FC<DangerZone.Props> = ({ children }) => {
    return (
        <div
            className="p-6 rounded-xl shadow-md max-w-4xl mx-auto"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            {children}
        </div>
    )
}

export default DangerZoneSettings

export { default as DangerZoneBadge } from "./DangerZoneBadge"
export { default as DangerZoneSettingsContent } from "./Content"
export { default as DangerZoneRow } from "./Content/DangerRow"
export { default as DangerZoneRowDetails } from "./Content/DangerRow/DangerRowDetails"
export { default as DangerZoneRowButton } from "./Content/DangerRow/DangerRowButton"
