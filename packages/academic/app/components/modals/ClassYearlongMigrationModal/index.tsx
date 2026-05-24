import React from "react"
import { useClasses } from "@/app/hooks/entities"
import type { Class, Semester } from "@/app/types"
import {
    ModalContainer,
    ModalHeader,
    ModalBodyText,
    ModalFooter,
    ModalSubmitButton,
    ModalCancelButton,
} from "@shared/components/modal"
import ClassRow from "./ClassRow"
import { MODALS } from "@/app/styles/colors"

export interface ClassYearlongMigrationModalData {
    /** Semester classes that will be converted to year-long */
    semesterClasses: Class[]
    /** The term's available semesters (to resolve labels) */
    semesters: Semester[]
    /** Called after the user confirms — strips semesterIds and performs the schedule type switch */
    onConfirm: () => void
}

interface ClassYearlongMigrationModalProps {
    onClose: () => void
    data: ClassYearlongMigrationModalData
}

export const ClassYearlongMigrationModal: React.FC<ClassYearlongMigrationModalProps> = ({ onClose, data }) => {
    const { updateClasses } = useClasses()
    const { semesterClasses, semesters, onConfirm } = data

    const getSemesterLabel = (semesterId: string): string => {
        const semester = semesters.find(s => s.id === semesterId)!
        return semester.name
    }

    const handleConfirm = () => {
        updateClasses(semesterClasses.map(classItem => ({ id: classItem.id, updates: { semesterId: "" } })))
        onConfirm()
        onClose()
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.SCHEDULE.HEADING}>
                Convert to Year-long
            </ModalHeader>

            <ModalBodyText>
                The following semester classes will be converted to{" "}
                <strong>year-long</strong> classes, since the Alternating A/B Days
                schedule only supports year-long classes.
            </ModalBodyText>

            <div className="space-y-3 mb-2 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1 -mr-1">
                {semesterClasses.map(classItem => (
                    <ClassRow
                        key={classItem.id}
                        name={classItem.name}
                        color={classItem.color}
                        teacherName={classItem.teacherName}
                        roomNumber={classItem.roomNumber}
                        semesterLabel={getSemesterLabel(classItem.semesterId || "")}
                    />
                ))}
            </div>

            <ModalFooter>
                <ModalCancelButton onClick={onClose} />
                <ModalSubmitButton
                    onClick={handleConfirm}
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
