import React from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useHover } from "@shared/hooks/ui/useHover"
import { useSettings } from "@/app/hooks/useSettings"
import { Plus, ChevronRight } from "lucide-react"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalCancelButton,
} from "@shared/components/modal"
import TemplateItem from "./TemplateItem"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface EventKindChooserModalProps {
    onClose: () => void
}

export const EventKindChooserModal: React.FC<EventKindChooserModalProps> = ({ onClose }) => {
    const { openModal } = useModal()
    const { eventTemplates } = useSettings()
    const { isHovered: isCreateHovered, hoverProps: createHoverProps } = useHover()

    const handleCreateNew = () => {
        onClose()
        openModal("add-event")
    }

    const handleLoadTemplate = (templateId: string) => {
        const template = eventTemplates.find(t => t.id === templateId)
        if (template) {
            onClose()
            openModal("add-event", { templateData: template })
        }
    }

    const hasTemplates = eventTemplates.length > 0

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.EVENT.HEADING}>
                Add Event
            </ModalHeader>

            <div className="space-y-4 py-2">
                <button
                    onClick={handleCreateNew}
                    className="w-full flex items-center justify-between p-4 rounded-xl transition-all"
                    style={{
                        border: `1px solid ${GLOBAL.BORDER_PRIMARY}`,
                        backgroundColor: isCreateHovered ? GLOBAL.BACKGROUND_TERTIARY : 'transparent',
                    }}
                    {...createHoverProps}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="p-3 rounded-full"
                            style={{
                                backgroundColor: GLOBAL.EVENT_BUTTON_BG_18,
                                color: GLOBAL.EVENT_HEADING_TEXT
                            }}
                        >
                            <Plus size={24} />
                        </div>
                        <div className="text-left">
                            <div className="font-semibold text-lg" style={{ color: GLOBAL.TEXT_PRIMARY }}>Create New</div>
                            <div className="text-sm" style={{ color: GLOBAL.TEXT_SECONDARY }}>Start with a blank event</div>
                        </div>
                    </div>
                    <ChevronRight className="transition-colors" style={{ color: isCreateHovered ? GLOBAL.TEXT_SECONDARY : GLOBAL.TEXT_MUTED }} />
                </button>

                {hasTemplates && (
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full" style={{ borderTop: `1px solid ${GLOBAL.BORDER_SECONDARY}` }} />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-2" style={{ backgroundColor: GLOBAL.BACKGROUND_SECONDARY, color: GLOBAL.TEXT_TERTIARY }}>Or load from template</span>
                        </div>
                    </div>
                )}

                {hasTemplates && (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        <div
                            className="text-xs font-semibold uppercase tracking-wider mb-2 px-1"
                            style={{ color: GLOBAL.TEXT_TERTIARY }}
                        >
                            Your Templates
                        </div>
                        {eventTemplates.map(template => (
                            <TemplateItem
                                key={template.id}
                                template={template}
                                onSelect={handleLoadTemplate}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ModalFooter>
                <ModalCancelButton onClick={onClose} />
            </ModalFooter>
        </ModalContainer>
    )
}
