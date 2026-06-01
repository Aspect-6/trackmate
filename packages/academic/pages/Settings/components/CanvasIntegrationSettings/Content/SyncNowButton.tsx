import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"
import { RefreshCw } from "lucide-react"
import { SETTINGS } from "@/app/styles/colors"

const SyncNowButton: React.FC<CanvasIntegrationSettings.Content.SyncNowButtonProps> = ({ isSyncing, onSyncNow }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            onClick={onSyncNow}
            disabled={isSyncing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all"
            style={{
                backgroundColor: isHovered && !isSyncing ? SETTINGS.ADDITEM_BUTTON_BG_HOVER : SETTINGS.ADDITEM_BUTTON_BG,
                color: SETTINGS.TEXT_WHITE,
                opacity: isSyncing ? 0.7 : 1,
                cursor: isSyncing ? "not-allowed" : "pointer"
            }}
            {...hoverProps}
        >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync Now"}
        </button>
    )
}

export default SyncNowButton
