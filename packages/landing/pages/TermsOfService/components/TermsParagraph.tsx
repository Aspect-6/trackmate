import React from "react"
import type { TermsOfService } from "@/pages/TermsOfService/types"

const TermsParagraph: React.FC<TermsOfService.TermsParagraphProps> = ({ children }) => (
    <p className="leading-relaxed">
        {children}
    </p>
)

export default TermsParagraph
