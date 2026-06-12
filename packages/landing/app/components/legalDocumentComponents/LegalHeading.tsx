import React from "react"
import { LANDING } from "@/app/styles/colors"

interface LegalHeadingProps {
    children: React.ReactNode
}

const LegalHeading: React.FC<LegalHeadingProps> = ({ children }) => (
    <h3 className="text-lg font-medium mt-6 mb-2" style={{ color: LANDING.TEXT_PRIMARY }}>
        {children}
    </h3>
)

export default LegalHeading
