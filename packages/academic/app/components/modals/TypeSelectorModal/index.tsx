import React from "react"
import { FileText, BookOpen, X, Calendar } from "lucide-react"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalCancelButton,
} from "@shared/components/modal"
import OptionButton from "./TypeSelectorModalOption"
import { GLOBAL } from "@/app/styles/colors"

interface TypeSelectorModalProps {
    onClose: () => void
    openModal: (modalName: string, data?: string | null) => void
}

export const TypeSelectorModal: React.FC<TypeSelectorModalProps> = ({ onClose, openModal }) => {
    return (
        <ModalContainer>
            <ModalHeader color={GLOBAL.ADDITEM_HEADER_TEXT}>What would you like to add?</ModalHeader>

            <div className="space-y-3 py-2">
                <OptionButton
                    onClick={() => openModal("assignment-kind-chooser")}
                    icon={<FileText className="w-5 h-5" />}
                    label="Assignment"
                    bg={GLOBAL.ASSIGNMENT_BUTTON_BG}
                    bgHover={GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER}
                />

                <OptionButton
                    onClick={() => openModal("add-class")}
                    icon={<BookOpen className="w-5 h-5" />}
                    label="Class"
                    bg={GLOBAL.CLASS_BUTTON_BG}
                    bgHover={GLOBAL.CLASS_BUTTON_BG_HOVER}
                />

                <OptionButton
                    onClick={() => openModal("event-kind-chooser")}
                    icon={<Calendar className="w-5 h-5" />}
                    label="Event"
                    bg={GLOBAL.EVENT_BUTTON_BG}
                    bgHover={GLOBAL.EVENT_BUTTON_BG_HOVER}
                />

                <OptionButton
                    onClick={() => openModal("add-no-school")}
                    icon={<X className="w-5 h-5" />}
                    label="No School"
                    bg={GLOBAL.SCHEDULE_BUTTON_BG}
                    bgHover={GLOBAL.SCHEDULE_BUTTON_BG_HOVER}
                />
            </div>

            <ModalFooter>
                <ModalCancelButton onClick={onClose} />
            </ModalFooter>
        </ModalContainer>
    )
}
