import React from "react"
import { LANDING } from "@/app/styles/colors"

interface LegalSectionProps {
    id: string
    sectionNumber?: number
    title: string
    children: React.ReactNode
}

const LegalSection: React.FC<LegalSectionProps> = ({ id, sectionNumber, title, children }) => (
    <section id={id} className="mb-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: LANDING.TEXT_PRIMARY }}>
            {sectionNumber ? `${sectionNumber}. ` : ""}{title}
        </h2>
        <div className="space-y-4">
            {children}
        </div>
    </section>
)

export default LegalSection
