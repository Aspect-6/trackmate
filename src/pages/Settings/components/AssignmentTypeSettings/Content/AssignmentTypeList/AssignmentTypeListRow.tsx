import React from 'react'
import type { AssignmentTypeSettings } from '@/pages/Settings/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, ChevronUp, ChevronDown, Trash2 } from 'lucide-react'
import { SETTINGS, GLOBAL } from '@/app/styles/colors'

const AssignmentTypeListRow: React.FC<AssignmentTypeSettings.Content.AssignmentTypeList.AssignmentTypeListRowProps> = ({
    type,
    isFirst,
    isLast,
    isOnly,
    onMoveUp,
    onMoveDown,
    onRemove
}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: type })
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
        backgroundColor: SETTINGS.CARD_BG,
        borderColor: SETTINGS.CARD_BORDER
    } as React.CSSProperties

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg border"
        >
            <div className="flex items-center gap-3 text-sm sm:text-base" style={{ color: SETTINGS.BODY_TEXT }}>
                <button
                    type="button"
                    className="p-1 rounded hover:bg-white/5 cursor-grab touch-none"
                    style={{ touchAction: 'none' }}
                    {...attributes}
                    {...listeners}
                    aria-label={`Drag ${type}`}
                >
                    <GripVertical className="w-4 h-4 opacity-60" />
                </button>
                <span className="font-medium">{type}</span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={onMoveUp}
                    disabled={isFirst}
                    className="p-2 rounded-lg border disabled:opacity-40 hover:bg-white/5"
                    style={{ borderColor: SETTINGS.CARD_BORDER, color: SETTINGS.BODY_TEXT }}
                    aria-label={`Move ${type} up`}
                >
                    <ChevronUp className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={onMoveDown}
                    disabled={isLast}
                    className="p-2 rounded-lg border disabled:opacity-40 hover:bg-white/5"
                    style={{ borderColor: SETTINGS.CARD_BORDER, color: SETTINGS.BODY_TEXT }}
                    aria-label={`Move ${type} down`}
                >
                    <ChevronDown className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={onRemove}
                    disabled={isOnly}
                    className="p-2 rounded-lg border disabled:opacity-40 hover:bg-red-500/10"
                    style={{ borderColor: SETTINGS.CARD_BORDER, color: GLOBAL.DELETE_BUTTON_BG }}
                    aria-label={`Remove ${type}`}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default AssignmentTypeListRow
