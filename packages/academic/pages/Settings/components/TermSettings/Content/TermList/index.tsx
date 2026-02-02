import React from "react"
import type { TermSettings } from "@/pages/Settings/types"

const TermList: React.FC<TermSettings.Content.TermList.Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-3">
            {children}
        </div>
    )
}

export default TermList
