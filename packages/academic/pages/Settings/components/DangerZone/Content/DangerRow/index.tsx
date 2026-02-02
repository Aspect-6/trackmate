import React from "react"
import type { DangerZone } from "@/pages/Settings/types"

const DangerZoneRow: React.FC<DangerZone.Content.DangerRow.Props> = ({ children }) => {
    return (
        <div className="danger-row grid grid-cols-[1fr_auto] max-sm:grid-cols-1 items-center max-sm:items-start gap-4 py-1.5">
            {children}
        </div>
    )
}

export default DangerZoneRow
