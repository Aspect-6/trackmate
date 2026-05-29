import React from "react"
import { useAcademicTerms, useSchedules } from "@/app/hooks/entities"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalBodyText,
    ModalCancelButton,
    ModalSubmitButton,
} from "@shared/components/modal"
import type { AlternatingABDayType } from "@/app/types" 
import { MODALS } from "@/app/styles/colors"

interface EditDayTypeModalProps {
    onClose: () => void
    data: {
        dayType: NonNullable<AlternatingABDayType>
        date: string
    }
}

export const EditDayTypeModal: React.FC<EditDayTypeModalProps> = ({ onClose, data }) => {
    const { getActiveTermForDate } = useAcademicTerms()
    const { setReferenceDayType } = useSchedules()

    const activeTerm = getActiveTermForDate(data.date)!
    const newDayType = data.dayType === "A" ? "B" : "A"

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.SCHEDULE.HEADING}>
                Change Day Type to {newDayType}-Day?
            </ModalHeader>
            <ModalBodyText>
                Changing this day to a{newDayType === "A" ? "n" : ""} {newDayType}-Day will override the day type
                calculation for this day, and every day after this day will alternate using this new value.
            </ModalBodyText>
            <ModalFooter>
                <ModalCancelButton onClick={onClose}>Cancel</ModalCancelButton>
                <ModalSubmitButton
                    type="button"
                    onClick={() => {
                        setReferenceDayType(newDayType, activeTerm.id, activeTerm.scheduleType, data.date)
                        onClose()
                    }}
                    bgColor={MODALS.SCHEDULE.PRIMARY_BG}
                    bgColorHover={MODALS.SCHEDULE.PRIMARY_BG_HOVER}
                    textColor={MODALS.SCHEDULE.PRIMARY_TEXT}
                >
                    Confirm
                </ModalSubmitButton>
            </ModalFooter>
        </ModalContainer>
    )
}