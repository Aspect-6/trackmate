import React from "react"

interface LegalParagraphProps {
    children: React.ReactNode
}

const LegalParagraph: React.FC<LegalParagraphProps> = ({ children }) => (
    <p className="leading-relaxed">
        {children}
    </p>
)

export default LegalParagraph
