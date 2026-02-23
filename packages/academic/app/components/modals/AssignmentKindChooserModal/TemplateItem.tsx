import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { AssignmentTemplate } from "@/app/types"
import { FileText } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

interface TemplateItemProps {
    template: AssignmentTemplate
    classColor: string | undefined
    onSelect: (id: string) => void
}

const TemplateItem: React.FC<TemplateItemProps> = ({ template, classColor, onSelect }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            onClick={() => onSelect(template.id)}
            className="w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left"
            style={{
                border: `1px solid ${GLOBAL.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classColor}`,
                backgroundColor: isHovered ? GLOBAL.BACKGROUND_TERTIARY : 'transparent',
            }}
            {...hoverProps}
        >
            <div className="flex items-center gap-3">
                <div
                    className="p-2 rounded-lg transition-colors"
                    style={{
                        backgroundColor: GLOBAL.BACKGROUND_BLACK_05,
                        color: isHovered ? GLOBAL.TEXT_SECONDARY : GLOBAL.TEXT_TERTIARY,
                    }}
                >
                    <FileText size={18} />
                </div>
                <div>
                    <div className="font-medium" style={{ color: GLOBAL.TEXT_PRIMARY }}>{template.templateName}</div>
                    <div className="text-xs" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                        {template.title} • {template.type}
                    </div>
                </div>
            </div>
        </button>
    )
}

export default TemplateItem
