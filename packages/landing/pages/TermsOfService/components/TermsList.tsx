import React from "react"
import type { TermsOfService } from "@/pages/TermsOfService/types"

const TermsList: React.FC<TermsOfService.TermsListProps> = ({ children }) => (
    <ul className="list-disc pl-6 my-4 space-y-2">
        {children}
    </ul>
)

export default TermsList
