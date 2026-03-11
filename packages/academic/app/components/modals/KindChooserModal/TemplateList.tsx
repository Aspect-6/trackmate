import React from "react"
import { useModal } from "@/app/contexts/ModalContext"

import type { AssignmentTemplate, EventTemplate } from "@/app/types"
import { GLOBAL } from "@/app/styles/colors"
import TemplateItem from "./TemplateItem"

interface TemplateListProps {
    kind: "assignment" | "event"
    templates: AssignmentTemplate[] | EventTemplate[]
    onClose: () => void
}

const TemplateList: React.FC<TemplateListProps> = ({ kind, templates, onClose }) => {
    const { openModal } = useModal()

    const handleLoadTemplate = (template: AssignmentTemplate | EventTemplate) => {
        onClose()
        openModal(kind === "assignment" ? "add-assignment" : "add-event", { templateData: template })
    }

    return (
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            <div
                className="text-xs font-semibold uppercase tracking-wider mb-2 px-1"
                style={{ color: GLOBAL.TEXT_TERTIARY }}
            >
                Your Templates
            </div>
            {templates.map(template => (
                <TemplateItem
                    key={template.id}
                    template={template}
                    kind={kind}
                    onSelect={() => handleLoadTemplate(template)}
                />
            ))}
        </div>
    )
}

export default TemplateList
