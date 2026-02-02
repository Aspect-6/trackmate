import React from "react"
import type { TermSettings } from "@/pages/Settings/types"

const TermItemHeader: React.FC<TermSettings.Content.TermList.TermItem.Header.Props> = ({ children }) => {
    return (
        <div className="flex items-start justify-between mb-4">
            {children}
        </div>
    )
}

export default TermItemHeader
