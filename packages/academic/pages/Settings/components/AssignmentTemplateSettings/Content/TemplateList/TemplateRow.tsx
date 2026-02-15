import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { AssignmentTemplateSettings } from "@/pages/Settings/types"
import { GripVertical, Pencil, Trash2 } from "lucide-react"
import { SETTINGS, GLOBAL } from "@/app/styles/colors"

const TemplateRow: React.FC<AssignmentTemplateSettings.Content.TemplateList.TemplateRowProps> = ({
    id,
    templateName,
    title,
    type,
    classColor,
    onEdit,
    onRemove
}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Translate.toString(transform),
                transition,
                opacity: isDragging ? 0.8 : 1,
                backgroundColor: SETTINGS.BACKGROUND_SECONDARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classColor}`,
            }}
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg"
        >
            <div className="flex items-center gap-3 min-w-0">
                <button
                    type="button"
                    className="p-1 rounded hover:bg-white/5 cursor-grab touch-none flex-shrink-0"
                    style={{ touchAction: "none" }}
                    {...attributes}
                    {...listeners}
                    aria-label={`Drag ${templateName}`}
                >
                    <GripVertical className="w-4 h-4 opacity-60" style={{ color: SETTINGS.TEXT_SECONDARY }} />
                </button>
                <div className="flex flex-col min-w-0">
                    <span
                        className="text-sm font-medium truncate"
                        style={{ color: SETTINGS.TEXT_PRIMARY }}
                    >
                        {templateName}
                    </span>
                    <span
                        className="text-xs truncate"
                        style={{ color: SETTINGS.TEXT_SECONDARY }}
                    >
                        {title} • {type}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <button
                    type="button"
                    onClick={onEdit}
                    className="p-2 rounded-lg border hover:bg-white/5"
                    style={{ borderColor: SETTINGS.BORDER_PRIMARY, color: SETTINGS.TEXT_SECONDARY }}
                    aria-label={`Edit template ${templateName}`}
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={onRemove}
                    className="p-2 rounded-lg border hover:bg-red-500/10"
                    style={{ borderColor: SETTINGS.BORDER_PRIMARY, color: GLOBAL.DELETE_BUTTON_BG }}
                    aria-label={`Remove template ${templateName}`}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default TemplateRow
