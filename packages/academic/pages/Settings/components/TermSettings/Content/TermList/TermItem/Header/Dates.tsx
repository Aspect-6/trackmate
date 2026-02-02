import React from "react"
import type { TermSettings } from "@/pages/Settings/types"
import { Clock } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

const TermItemHeaderDates: React.FC<TermSettings.Content.TermList.TermItem.Header.DatesProps> = ({ children }) => {
    return (
        <div className="flex items-center gap-2 text-xs ml-0.5" style={{ color: GLOBAL.TEXT_SECONDARY }}>
            <Clock size={12} />
            <span>{children}</span>
        </div>
    )
}

export default TermItemHeaderDates
