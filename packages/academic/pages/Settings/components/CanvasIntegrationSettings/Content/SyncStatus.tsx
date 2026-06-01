import React from "react"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"
import { ModalToggleSwitch } from "@shared/components/modal"
import { GLOBAL } from "@/app/styles/colors"

const SyncStatus: React.FC<CanvasIntegrationSettings.Content.SyncStatusProps> = ({
    enabled,
    onToggleEnabled,
    lastSyncAt,
    lastSyncStatus,
    lastSyncError
}) => {
    return (
        <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2">
                <span className="font-semibold" style={{ color: GLOBAL.TEXT_PRIMARY }}>Auto-Sync:</span>
                <ModalToggleSwitch checked={enabled} onChange={onToggleEnabled} />
            </div>
            <div className="flex items-center gap-2">
                <span className="font-semibold" style={{ color: GLOBAL.TEXT_PRIMARY }}>Last Sync:</span>
                <span style={{ color: GLOBAL.TEXT_SECONDARY }}>
                    {lastSyncAt ? new Date(lastSyncAt).toLocaleString() : "Never"}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-semibold" style={{ color: GLOBAL.TEXT_PRIMARY }}>Status:</span>
                <span className="font-medium" style={{ color: lastSyncStatus === "success" ? GLOBAL.TEXT_SUCCESS : lastSyncStatus === "error" ? GLOBAL.TEXT_DANGER : GLOBAL.TEXT_TERTIARY }}>
                    {lastSyncStatus === "success" ? "Success" : lastSyncStatus === "error" ? "Error" : "Pending"}
                </span>
            </div>
            {lastSyncError && (
                <div className="mt-1" style={{ color: GLOBAL.TEXT_DANGER }}>{lastSyncError}</div>
            )}
        </div>
    )
}

export default SyncStatus
