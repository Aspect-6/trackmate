import React from "react"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalBodyText,
    ModalSubmitButton,
} from "@shared/components/modal"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface AutoArchiveModalProps {
    onClose: () => void
    termName?: string
}

export const AutoArchiveModal: React.FC<AutoArchiveModalProps> = ({ onClose, termName }) => {
    return (
        <ModalContainer>
            <ModalHeader color={MODALS.ACADEMICTERM.HEADING}>
                Term Ended
            </ModalHeader>
            <ModalBodyText>
                The term <strong style={{ color: GLOBAL.TEXT_PRIMARY }}>{termName || "active"}</strong> has ended.
                Your classes for this term have been archived and their assignments are now hidden from the Calendar and My Assignments pages.
                You can view them on the My Classes page.
            </ModalBodyText>
            <ModalFooter>
                <ModalSubmitButton
                    type="button"
                    onClick={onClose}
                    bgColor={MODALS.ACADEMICTERM.PRIMARY_BG}
                    bgColorHover={MODALS.ACADEMICTERM.PRIMARY_BG_HOVER}
                    textColor={MODALS.ACADEMICTERM.PRIMARY_TEXT}
                >
                    Confirm
                </ModalSubmitButton>
            </ModalFooter>
        </ModalContainer>
    )
}
