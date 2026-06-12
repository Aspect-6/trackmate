import React from "react"

interface LegalListProps {
    children: React.ReactNode
}

const LegalList: React.FC<LegalListProps> = ({ children }) => (
    <ul className="list-disc pl-6 my-4 space-y-2">
        {children}
    </ul>
)

export default LegalList
