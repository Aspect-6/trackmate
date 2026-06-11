import React from "react"
import type { TermsOfService } from "@/pages/TermsOfService/types"

const TermsListItem: React.FC<TermsOfService.TermsListItemProps> = ({ children }) => (
    <li className="leading-relaxed">
        {children}
    </li>
)

export default TermsListItem
