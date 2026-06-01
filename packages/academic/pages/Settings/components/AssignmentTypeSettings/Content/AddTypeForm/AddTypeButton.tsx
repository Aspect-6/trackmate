import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { AssignmentTypeSettings } from "@/pages/Settings/types"
import { Plus } from "lucide-react"
import { SETTINGS } from "@/app/styles/colors"

const AddTypeButton: React.FC<AssignmentTypeSettings.Content.AddTypeForm.AddTypeButtonProps> = ({ onClick, children }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
            style={{
                backgroundColor: isHovered ? SETTINGS.ADDITEM_BUTTON_BG_HOVER : SETTINGS.ADDITEM_BUTTON_BG,
                color: SETTINGS.TEXT_WHITE
            }}
            onClick={onClick}
            {...hoverProps}
        >
            <Plus className="w-4 h-4" />
            {children}
        </button>
    )
}

export default AddTypeButton
