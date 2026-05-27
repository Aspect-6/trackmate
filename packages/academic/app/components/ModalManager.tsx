import React, { useEffect, useRef } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useDeleteModalConfig } from "@/app/hooks/useDeleteModalConfig"
import { AssignmentFormModal } from "@/app/components/modals/AssignmentFormModal"
import { ClassFormModal } from "@/app/components/modals/ClassFormModal"
import { EventFormModal } from "@/app/components/modals/EventFormModal"
import { NoSchoolFormModal } from "@/app/components/modals/NoSchoolFormModal"
import { TermFormModal } from "@/app/components/modals/TermFormModal"
import { DeleteConfirmationModal } from "@/app/components/modals/DeleteConfirmationModal"
import { ClassSelectorModal } from "@/app/components/modals/ClassSelectorModal"
import { ClassMigrationModal } from "@/app/components/modals/ClassMigrationModal"
import { ClassYearlongMigrationModal } from "@/app/components/modals/ClassYearlongMigrationModal"
import { TypeSelectorModal } from "@/app/components/modals/TypeSelectorModal"
import { KindChooserModal } from "@/app/components/modals/KindChooserModal"
import { AutoArchiveModal } from "@/app/components/modals/AutoArchiveModal"
import { GLOBAL } from "@/app/styles/colors"

const ModalManager: React.FC = () => {
    const {
        activeModal,
        modalData,
        closeModal,
        openModal
    } = useModal()

    const deleteConfig = useDeleteModalConfig(activeModal, modalData)
    const backdropRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!activeModal) return

        document.body.style.overflow = "hidden"

        const handleTouchMove = (e: TouchEvent) => {
            const target = e.target as HTMLElement
            const modal = backdropRef.current?.querySelector("[data-modal-content]")
            if (modal?.contains(target)) return
            e.preventDefault()
        }

        document.addEventListener("touchmove", handleTouchMove, { passive: false })

        return () => {
            document.body.style.overflow = ""
            document.removeEventListener("touchmove", handleTouchMove)
        }
    }, [activeModal])

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

            case "assignment-kind-chooser":
                return <KindChooserModal onClose={closeModal} kind="assignment" />
            case "event-kind-chooser":
                return <KindChooserModal onClose={closeModal} kind="event" />

            // Assignment modals
            case "add-assignment":
                return <AssignmentFormModal onClose={closeModal} {...(modalData && typeof modalData === "object" ? modalData : {})} />
            case "edit-assignment": {
                const editData = modalData && typeof modalData === "object"
                    ? modalData
                    : { assignmentId: modalData }
                return (
                    <AssignmentFormModal
                        onClose={closeModal}
                        assignmentId={editData.assignmentId}
                        focusSubtaskId={editData.focusSubtaskId}
                    />
                )
            }

            // Class modals
            case "add-class":
                return <ClassFormModal onClose={closeModal} />
            case "edit-class":
                return <ClassFormModal onClose={closeModal} classId={modalData} />

            // Event modals
            case "add-event":
                return <EventFormModal onClose={closeModal} {...(modalData && typeof modalData === "object" ? modalData : {})} />
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
            case "auto-archive-notification":
                return <AutoArchiveModal onClose={closeModal} termName={modalData?.termName} />

            // Schedule cell selector
            case "class-selector":
                return <ClassSelectorModal onClose={closeModal} data={modalData} />

            // Schedule type migration
            case "class-migration":
                return <ClassMigrationModal onClose={closeModal} data={modalData} />
            case "class-yearlong-migration":
                return <ClassYearlongMigrationModal onClose={closeModal} data={modalData} />

            default:
                return null
        }
    }

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{
                backgroundColor: GLOBAL.MODAL_BACKDROP,
                touchAction: "none",
                overscrollBehavior: "none",
            }}
        >
            {renderModalContent()}
        </div>
    )
}

export default ModalManager
