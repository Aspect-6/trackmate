import React from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useHover } from "@shared/hooks/ui/useHover"
import type { TermSettings } from "@/pages/Settings/types"
import { Plus } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

const AddTermButton: React.FC<TermSettings.Content.AddTermButtonProps> = ({ children }) => {
    const { openModal } = useModal()
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            onClick={() => openModal("add-term")}
            className="w-full sm:w-auto sm:self-end inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-white transition-all"
            style={{ backgroundColor: isHovered ? GLOBAL.ADDITEM_BUTTON_BG_HOVER : GLOBAL.ADDITEM_BUTTON_BG }}
            {...hoverProps}
        >
            <Plus className="w-4 h-4" />
            {children}
        </button>
    )
}

export default AddTermButton
