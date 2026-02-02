import React from "react"
import type { TermSettings } from "@/pages/Settings/types"

const TermItemBody: React.FC<TermSettings.Content.TermList.TermItem.Body.Props> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {children}
        </div>
    )
}

export default TermItemBody
