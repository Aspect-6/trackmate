import React from "react"
import { useClasses } from "@/app/hooks/entities"
import { useHover } from "@shared/hooks/ui/useHover"
import { formatEventTimeRange } from "@/app/lib/utils"
import type { AssignmentTemplate, EventTemplate } from "@/app/types"
import { FileText, Calendar } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

interface TemplateItemProps {
    template: AssignmentTemplate | EventTemplate
    kind: "assignment" | "event"
    onSelect: () => void
}

const TemplateItem: React.FC<TemplateItemProps> = ({ template, kind, onSelect }) => {
    const { isHovered, hoverProps } = useHover()
    const { getClassById } = useClasses()

    let borderColor: string
    if ("color" in template) {
        borderColor = template.color
    } else {
        borderColor = getClassById(template.classId).color
    }

    return (
        <button
            onClick={onSelect}
            className="w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left"
            style={{
                border: `1px solid ${GLOBAL.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${borderColor}`,
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
                    {kind === "assignment" ? <FileText size={18} /> : <Calendar size={18} />}
                </div>
                <div>
                    <div className="font-medium" style={{ color: GLOBAL.TEXT_PRIMARY }}>{template.templateName}</div>
                    <div className="text-xs" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                        {"type" in template && <>{template.title} • {template.type}</>}
                        {"startTime" in template && <>{formatEventTimeRange(template.startTime, template.endTime)}</>}
                    </div>
                </div>
            </div>
        </button>
    )
}

export default TemplateItem
