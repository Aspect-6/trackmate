import React from "react"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalBodyText,
    ModalSubmitButton,
} from "@shared/components/modal"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface CanvasMappedClassDeleteAbortedModalProps {
    onClose: () => void
}

export const CanvasMappedClassDeleteAbortedModal: React.FC<CanvasMappedClassDeleteAbortedModalProps> = ({ onClose }) => {
    return (
        <ModalContainer>
            <ModalHeader color={GLOBAL.TEXT_DANGER}>
                Cannot Delete Mapped Class
            </ModalHeader>
            <ModalBodyText>
                Canvas is currently syncing assignments to this class. To delete this class, you must go to your Canvas Class Mappings and change the dropdown so this class is no longer selected.
            </ModalBodyText>

            <ModalFooter>
                <ModalSubmitButton 
                    onClick={onClose} 
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
