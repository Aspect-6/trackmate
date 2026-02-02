import React from "react"
import { useModal } from "@/app/contexts/ModalContext"
import type { TermSettings } from "@/pages/Settings/types"
import { Trash2 } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

const TermItemHeaderDeleteButton: React.FC<TermSettings.Content.TermList.TermItem.Header.DeleteButtonProps> = ({ term }) => {
    const { openModal } = useModal()

    return (
        <button
            onClick={() => openModal("delete-term", term.id)}
            className="p-2 rounded-lg hover:bg-red-500/10 transition-all"
            style={{ color: GLOBAL.DELETE_BUTTON_BG }}
            title="Delete Term"
        >
            <Trash2 size={18} />
        </button>
    )
}

export default TermItemHeaderDeleteButton
