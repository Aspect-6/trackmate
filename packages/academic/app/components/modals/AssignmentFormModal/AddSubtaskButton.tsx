import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { Plus } from "lucide-react"
import { GLOBAL, MODALS } from "@/app/styles/colors"

export interface AddSubtaskButtonProps {
    onClick: () => void
    disabled: boolean
    maxCount: number
}

const AddSubtaskButton: React.FC<AddSubtaskButtonProps> = ({ onClick, disabled, maxCount }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={disabled ? `Maximum of ${maxCount} subtasks` : "Add subtask"}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed"
            style={{
                color: disabled
                    ? GLOBAL.TEXT_SECONDARY
                    : isHovered
                        ? MODALS.ASSIGNMENT.PRIMARY_BG
                        : GLOBAL.TEXT_SECONDARY,
                opacity: disabled ? 0.5 : 1,
            }}
            {...hoverProps}
        >
            <Plus size={14} strokeWidth={2.5} />
            Add
        </button>
    )
}

export default AddSubtaskButton
