import React from "react"
import type { DangerZone } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const DangerZoneBadge: React.FC<DangerZone.BadgeProps> = ({ children }) => {
    return (
        <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{
                backgroundColor: SETTINGS.PRIORITY_HIGH_BG,
                color: SETTINGS.TEXT_DANGER,
                border: `1px solid ${SETTINGS.PRIORITY_HIGH_BORDER}`
            }}
        >
            {children}
        </span>
    )
}

export default DangerZoneBadge
