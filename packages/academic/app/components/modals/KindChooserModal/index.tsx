import React from "react"
import { useSettings } from "@/app/hooks/useSettings"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalCancelButton,
} from "@shared/components/modal"
import CreateNewButton from "./CreateNewButton"
import TemplateList from "./TemplateList"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface KindChooserModalProps {
    onClose: () => void
    kind: "assignment" | "event"
}

export const KindChooserModal: React.FC<KindChooserModalProps> = ({ onClose, kind }) => {
    const { assignmentTemplates, eventTemplates } = useSettings()

    const templates = kind === "assignment" ? assignmentTemplates : eventTemplates
    const hasTemplates = templates.length > 0
    const heading = `Add ${kind === "assignment" ? "Assignment" : "Event"}`
    const headingColor = kind === "assignment" ? MODALS.ASSIGNMENT.HEADING : MODALS.EVENT.HEADING

    return (
        <ModalContainer>
            <ModalHeader color={headingColor}>
                {heading}
            </ModalHeader>

            <div className="space-y-4 py-2">
                <CreateNewButton kind={kind} onClose={onClose} />

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
                    <TemplateList kind={kind} templates={templates} onClose={onClose} />
                )}
            </div>

            <ModalFooter>
                <ModalCancelButton onClick={onClose} />
            </ModalFooter>
        </ModalContainer>
    )
}
