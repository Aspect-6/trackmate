import React from "react"
import type { TermSettings } from "@/pages/Settings/types"

const TermList: React.FC<TermSettings.Content.TermList.Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-3 h-90 sm:h-105 overflow-scroll custom-scrollbar">
            {children}
        </div>
    )
}

export default TermList
