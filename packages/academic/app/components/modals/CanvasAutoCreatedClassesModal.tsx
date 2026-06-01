import React from "react"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalBodyText,
    ModalSubmitButton,
} from "@shared/components/modal"
import { GLOBAL, MODALS } from "@/app/styles/colors"
import { useSettings } from "@/app/hooks/useSettings"

interface CanvasAutoCreatedClassesModalProps {
    onClose: () => void
    classes: string[]
}

export const CanvasAutoCreatedClassesModal: React.FC<CanvasAutoCreatedClassesModalProps> = ({ onClose, classes }) => {
    const { clearAutoCreatedClasses } = useSettings()

    const handleConfirm = () => {
        clearAutoCreatedClasses()
        onClose()
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.CLASS.HEADING}>
                Classes Automatically Created
            </ModalHeader>
            <ModalBodyText>
                The following classes were detected in your Canvas Calendar sync and have been automatically created. 
                You can rename them or assign them to a term from the My Classes page.
            </ModalBodyText>
            
            <ul className="mt-4 space-y-2 px-1">
                {classes.map((cls, idx) => (
                    <li key={idx} className="font-semibold" style={{ color: GLOBAL.TEXT_PRIMARY }}>
                        • {cls}
                    </li>
                ))}
            </ul>
            <ModalFooter>
                <ModalSubmitButton
                    type="button"
                    onClick={handleConfirm}
                    bgColor={MODALS.CLASS.PRIMARY_BG}
                    bgColorHover={MODALS.CLASS.PRIMARY_BG_HOVER}
                    textColor={MODALS.CLASS.PRIMARY_TEXT}
                >
                    Confirm
                </ModalSubmitButton>
            </ModalFooter>
        </ModalContainer>
    )
}
