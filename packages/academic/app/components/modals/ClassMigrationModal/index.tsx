import React, { useState } from "react"
import { useClasses } from "@/app/hooks/entities"
import { MODALS } from "@/app/styles/colors"
import {
    ModalContainer,
    ModalHeader,
    ModalBodyText,
    ModalFooter,
    ModalSubmitButton,
    ModalCancelButton,
} from "@shared/components/modal"
import ClassRow from "./ClassRow"
import type { Class, Semester } from "@/app/types"

export interface ClassMigrationModalData {
    /** Year-long classes that need a semester assignment */
    orphanedClasses: Class[]
    /** The term's available semesters (Fall & Spring) */
    semesters: Semester[]
    /** Called after the user confirms assignments — performs the schedule type switch */
    onConfirm: () => void
}

interface ClassMigrationModalProps {
    onClose: () => void
    data: ClassMigrationModalData
}

export const ClassMigrationModal: React.FC<ClassMigrationModalProps> = ({ onClose, data }) => {
    const { updateClasses } = useClasses()
    const { orphanedClasses, semesters, onConfirm } = data

    const fallSemester = semesters.find(s => s.name === "Fall")
    const springSemester = semesters.find(s => s.name === "Spring")

    // Default every class to Fall
    const [assignments, setAssignments] = useState<Record<string, "Fall" | "Spring">>(() => {
        return Object.fromEntries(orphanedClasses.map(c => [c.id, "Fall" as const]))
    })

    const toggleSemester = (classId: string) => {
        setAssignments(prev => ({
            ...prev,
            [classId]: prev[classId] === "Fall" ? "Spring" : "Fall",
        }))
    }

    const handleConfirm = () => {
        const updates: { id: string; updates: Partial<Class> }[] = []
        for (const classItem of orphanedClasses) {
            const chosen = assignments[classItem.id]
            const semester = chosen === "Fall" ? fallSemester : springSemester
            if (semester) {
                updates.push({ id: classItem.id, updates: { semesterId: semester.id } })
            }
        }
        if (updates.length > 0) {
            updateClasses(updates)
        }
        onConfirm()
        onClose()
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.SCHEDULE.HEADING}>
                Assign Semesters
            </ModalHeader>

            <ModalBodyText>
                The following classes are year-long and need a semester assignment
                for the new schedule type. Choose <strong>Fall</strong> or{" "}
                <strong>Spring</strong> for each class.
            </ModalBodyText>

            <div className="space-y-3 mb-2 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1 -mr-1">
                {orphanedClasses.map(classItem => (
                    <ClassRow
                        key={classItem.id}
                        name={classItem.name}
                        color={classItem.color}
                        teacherName={classItem.teacherName}
                        roomNumber={classItem.roomNumber}
                        semester={assignments[classItem.id]!}
                        onToggle={() => toggleSemester(classItem.id)}
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
