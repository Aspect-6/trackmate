import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { AssignmentTypeSettings } from "@/pages/Settings/types"
import { Plus } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

const AddTypeButton: React.FC<AssignmentTypeSettings.Content.AddTypeForm.AddTypeButtonProps> = ({ onClick, children }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white text-sm transition-all"
            style={{ backgroundColor: isHovered ? GLOBAL.ADDITEM_BUTTON_BG_HOVER : GLOBAL.ADDITEM_BUTTON_BG }}
            onClick={onClick}
            {...hoverProps}
        >
            <Plus className="w-4 h-4" />
            {children}
        </button>
    )
}

export default AddTypeButton
