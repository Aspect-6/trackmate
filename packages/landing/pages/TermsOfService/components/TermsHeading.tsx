import React from "react"
import type { TermsOfService } from "@/pages/TermsOfService/types"
import { LANDING } from "@/app/styles/colors"

const TermsHeading: React.FC<TermsOfService.TermsHeadingProps> = ({ children }) => (
    <h3 className="text-lg font-medium mt-6 mb-2" style={{ color: LANDING.TEXT_PRIMARY }}>
        {children}
    </h3>
)

export default TermsHeading
