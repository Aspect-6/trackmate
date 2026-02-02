import React from "react"
import { useModal } from "@/app/contexts/ModalContext"
import type { TermSettings } from "@/pages/Settings/types"
import { Edit2 } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

const TermItemHeaderEditButton: React.FC<TermSettings.Content.TermList.TermItem.Header.EditButtonProps> = ({ term }) => {
    const { openModal } = useModal()

    return (
        <button
            onClick={() => openModal("edit-term", term.id)}
            className="p-2 rounded-lg hover:bg-white/5 transition-all"
            style={{ color: GLOBAL.TEXT_SECONDARY }}
            title="Edit Term"
        >
            <Edit2 size={18} />
        </button>
    )
}

export default TermItemHeaderEditButton
