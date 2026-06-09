import React from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { useModal } from "@/app/contexts/ModalContext"
import { useHover } from "@shared/hooks/ui/useHover"
import { Plus, FileText, ChevronRight } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

interface CreateButtonProps {
    kind: "assignment" | "event"
    mode: "new" | "template"
    onClose: () => void
}

const CreateButton: React.FC<CreateButtonProps> = ({ kind, mode, onClose }) => {
    const { openModal } = useModal()
    const { isHovered, hoverProps } = useHover()
    const { isPremium } = useAuth()

    const handleCreate = () => {
        if (mode === "template" && !isPremium) {
            openModal("premium-upgrade", { title: "Upgrade to Create Templates" }, { stack: true })
            return
        }

        onClose()
        const modalName = kind === "assignment" ? "add-assignment" : "add-event"
        if (mode === "template") {
            openModal(modalName, { mode: "template" })
        } else {
            openModal(modalName)
        }
    }

    const buttonBg = kind === "assignment" ? GLOBAL.ASSIGNMENT_BUTTON_BG_18 : GLOBAL.EVENT_BUTTON_BG_18
    const iconColor = kind === "assignment" ? GLOBAL.ASSIGNMENT_HEADING_TEXT : GLOBAL.EVENT_HEADING_TEXT
    
    const title = mode === "template" ? "Create Template" : "Create New"
    const description = mode === "template" 
        ? `Create a reusable ${kind === "assignment" ? "assignment" : "event"} template`
        : `Start with a blank ${kind === "assignment" ? "assignment" : "event"}`

    const Icon = mode === "template" ? FileText : Plus

    return (
        <button
            onClick={handleCreate}
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
                    <Icon size={24} />
                </div>
                <div className="text-left">
                    <div className="font-semibold text-lg" style={{ color: GLOBAL.TEXT_PRIMARY }}>{title}</div>
                    <div className="text-sm" style={{ color: GLOBAL.TEXT_SECONDARY }}>{description}</div>
                </div>
            </div>
            <ChevronRight className="transition-colors" style={{ color: isHovered ? GLOBAL.TEXT_SECONDARY : GLOBAL.TEXT_MUTED }} />
        </button>
    )
}

export default CreateButton
