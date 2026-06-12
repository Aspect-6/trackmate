import React from "react"

interface LegalListItemProps {
    children: React.ReactNode
}

const LegalListItem: React.FC<LegalListItemProps> = ({ children }) => (
    <li className="leading-relaxed">
        {children}
    </li>
)

export default LegalListItem
