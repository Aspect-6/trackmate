import React from "react"
import { LANDING } from "@/app/styles/colors"
import type { TermsOfService } from "@/pages/TermsOfService/types"

const TermsTableOfContents: React.FC<TermsOfService.TermsTableOfContentsProps> = ({ sections }) => (
    <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8 self-start mb-8 lg:mb-0">
        {/* Mobile View */}
        <details 
            className="lg:hidden p-6 rounded-xl group"
            style={{
                border: `1px solid ${LANDING.BORDER_PRIMARY}`,
                backgroundColor: LANDING.BACKGROUND_SECONDARY,
            }}
        >
            <summary className="text-xl font-bold cursor-pointer outline-none flex justify-between items-center" style={{ color: LANDING.TEXT_PRIMARY }}>
                Table of Contents
                <span className="text-sm opacity-60 group-open:hidden">Show</span>
                <span className="text-sm opacity-60 hidden group-open:block">Hide</span>
            </summary>
            <ul className="space-y-3 mt-4 max-h-64 overflow-y-auto pr-2">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a 
                            href={`#${section.id}`}
                            className="hover:underline transition-all block text-sm"
                            style={{ color: LANDING.TEXT_SECONDARY }}
                        >
                            {section.sectionNumber ? `${section.sectionNumber}. ` : ""}{section.title}
                        </a>
                    </li>
                ))}
            </ul>
        </details>

        {/* Desktop View */}
        <div 
            className="hidden lg:block p-6 rounded-xl overflow-y-auto" 
            style={{
                border: `1px solid ${LANDING.BORDER_PRIMARY}`,
                backgroundColor: LANDING.BACKGROUND_SECONDARY,
                maxHeight: "calc(100vh - 4rem)",
            }}
        >
            <h2 className="text-xl font-bold mb-4" style={{ color: LANDING.TEXT_PRIMARY }}>Table of Contents</h2>
            <ul className="space-y-3">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a 
                            href={`#${section.id}`}
                            className="hover:underline transition-all block text-sm"
                            style={{ color: LANDING.TEXT_SECONDARY }}
                        >
                            {section.sectionNumber ? `${section.sectionNumber}. ` : ""}{section.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </aside>
)

export default TermsTableOfContents
