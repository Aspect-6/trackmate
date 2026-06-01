import React from "react"
import { useFocus } from "@shared/hooks/ui/useFocus"
import type { CanvasIntegrationSettings } from "@/pages/Settings/types"
import { SETTINGS } from "@/app/styles/colors"

const ConnectionInput: React.FC<CanvasIntegrationSettings.Content.ConnectionForm.InputProps> = ({ value, onChange }) => {
    const { isFocused, focusProps } = useFocus()
    
    return (
        <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://canvas.instructure.com/feeds/calendars/feed_id.ics"
            className="w-full rounded-lg px-3 py-2 outline-none"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_SECONDARY,
                color: SETTINGS.TEXT_SECONDARY,
                border: `1px solid ${isFocused ? SETTINGS.FOCUS_COLOR : SETTINGS.BORDER_PRIMARY}`
            }}
            {...focusProps}
        />
    )
}

export default ConnectionInput
