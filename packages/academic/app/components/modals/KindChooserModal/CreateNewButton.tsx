import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { useModal } from "@/app/contexts/ModalContext"
import { Plus, ChevronRight } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

interface CreateNewButtonProps {
    kind: "assignment" | "event"
    onClose: () => void
}

const CreateNewButton: React.FC<CreateNewButtonProps> = ({ kind, onClose }) => {
    const { openModal } = useModal()
    const { isHovered, hoverProps } = useHover()

    const handleCreateNew = () => {
        onClose()
        openModal(kind === "assignment" ? "add-assignment" : "add-event")
    }

    const buttonBg = kind === "assignment" ? GLOBAL.ASSIGNMENT_BUTTON_BG_18 : GLOBAL.EVENT_BUTTON_BG_18
    const iconColor = kind === "assignment" ? GLOBAL.ASSIGNMENT_HEADING_TEXT : GLOBAL.EVENT_HEADING_TEXT
    const description = `Start with a blank ${kind === "assignment" ? "assignment" : "event"}`

    return (
        <button
            onClick={handleCreateNew}
            className="w-full flex items-center justify-between p-4 rounded-xl transition-all"
            style={{
                border: `1px solid ${GLOBAL.BORDER_PRIMARY}`,
                backgroundColor: isHovered ? GLOBAL.BACKGROUND_TERTIARY : 'transparent',
            }}
            {...hoverProps}
        >
            <div className="flex items-center gap-4">
                <div
                    className="p-3 rounded-full"
                    style={{
                        backgroundColor: buttonBg,
                        color: iconColor
                    }}
                >
                    <Plus size={24} />
                </div>
                <div className="text-left">
                    <div className="font-semibold text-lg" style={{ color: GLOBAL.TEXT_PRIMARY }}>Create New</div>
                    <div className="text-sm" style={{ color: GLOBAL.TEXT_SECONDARY }}>{description}</div>
                </div>
            </div>
            <ChevronRight className="transition-colors" style={{ color: isHovered ? GLOBAL.TEXT_SECONDARY : GLOBAL.TEXT_MUTED }} />
        </button>
    )
}

export default CreateNewButton
