import React from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useDeleteModalConfig } from "@/app/hooks/useDeleteModalConfig"
import { AssignmentFormModal } from "@/app/components/modals/AssignmentFormModal"
import { ClassFormModal } from "@/app/components/modals/ClassFormModal"
import { EventFormModal } from "@/app/components/modals/EventFormModal"
import { NoSchoolFormModal } from "@/app/components/modals/NoSchoolFormModal"
import { TermFormModal } from "@/app/components/modals/TermFormModal"
import { DeleteConfirmationModal } from "@/app/components/modals/DeleteConfirmationModal"
import { AlternatingABClassSelectorModal } from "@/app/components/modals/AlternatingABClassSelectorModal"
import { TypeSelectorModal } from "@/app/components/modals/TypeSelectorModal"
import { GLOBAL } from "@/app/styles/colors"

const ModalManager: React.FC = () => {
    const {
        activeModal,
        modalData,
        closeModal,
        openModal
    } = useModal()

    const deleteConfig = useDeleteModalConfig(activeModal, modalData)

    if (!activeModal) return null

    const renderModalContent = () => {
        // Handle Delete Modals
        if (deleteConfig) {
            return (
                <DeleteConfirmationModal
                    onClose={closeModal}
                    title={deleteConfig.title}
                    entityName={deleteConfig.entityName}
                    message={deleteConfig.message}
                    description={deleteConfig.description}
                    buttonText={deleteConfig.buttonText}
                    onDelete={deleteConfig.onDelete}
                />
            )
        }

        switch (activeModal) {
            case "type-selector":
                return <TypeSelectorModal onClose={closeModal} openModal={openModal} />

            // Assignment modals
            case "add-assignment":
                return <AssignmentFormModal onClose={closeModal} />
            case "edit-assignment":
                return <AssignmentFormModal onClose={closeModal} assignmentId={modalData} />

            // Class modals
            case "add-class":
                return <ClassFormModal onClose={closeModal} />
            case "edit-class":
                return <ClassFormModal onClose={closeModal} classId={modalData} />

            // Event modals
            case "add-event":
                return <EventFormModal onClose={closeModal} />
            case "edit-event":
                return <EventFormModal onClose={closeModal} eventId={modalData} />

            // No School modals
            case "add-no-school":
                return <NoSchoolFormModal onClose={closeModal} />
            case "edit-no-school":
                return <NoSchoolFormModal onClose={closeModal} noSchoolId={modalData} />

            // Term modals
            case "add-term":
                return <TermFormModal onClose={closeModal} />
            case "edit-term":
                return <TermFormModal onClose={closeModal} termId={modalData} />

            // Other modals
            case "semester-class-selector":
                return <AlternatingABClassSelectorModal onClose={closeModal} data={modalData} />

            default:
                return null
        }
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{
                backgroundColor: GLOBAL.MODAL_BACKDROP,
                touchAction: "none"
            }}
        >
            {renderModalContent()}
        </div>
    )
}

export default ModalManager
