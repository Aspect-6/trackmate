import React from 'react'
import { useApp } from '@/app/context/AppContext'
import { AddAssignmentModal, EditAssignmentModal, DeleteAssignmentModal } from '@/app/components/modals/AssignmentModals'
import { AddClassModal, EditClassModal, DeleteClassModal } from '@/app/components/modals/ClassModals'
import { AddEventModal, EditEventModal, DeleteEventModal } from '@/app/components/modals/EventModals'
import { AddNoSchoolModal, EditNoSchoolModal, DeleteNoSchoolModal } from '@/app/components/modals/NoSchoolModal'
import { ClearAllDataModal, ClearAllAssignmentsModal, ClearAllEventsModal } from '@/app/components/modals/ClearAllDataModal'
import { ScheduleClassSelectorModal } from '@/app/components/modals/ScheduleClassSelectorModal/index'
import { FileText, BookOpen, X } from 'lucide-react'

import {
    GLOBAL
} from '@/app/styles/colors'

interface TypeSelectorModalProps {
    onClose: () => void
    openModal: (modalName: string, data?: string | null) => void
}

const TypeSelectorModal: React.FC<TypeSelectorModalProps> = ({ onClose, openModal }) => (
    <div
        className="w-full max-w-sm p-6 rounded-xl"
        style={{
            backgroundColor: GLOBAL.MODAL_BG,
            border: `1px solid ${GLOBAL.BORDER_PRIMARY}`,
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
        }}
    >
        <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.ADDITEM_HEADER_TEXT }}>What would you like to add?</h2>
        <div className="space-y-3">
            <button
                onClick={() => openModal('add-assignment')}
                className="modal-btn flex items-center"
                style={{
                    '--modal-btn-bg': GLOBAL.ASSIGNMENT_BUTTON_BG,
                    '--modal-btn-bg-hover': GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER,
                    '--modal-btn-text': '#ffffff'
                } as React.CSSProperties}
            >
                <FileText className="w-5 h-5 mr-3" />
                Assignment
            </button>
            <button
                onClick={() => openModal('add-class')}
                className="modal-btn flex items-center"
                style={{
                    '--modal-btn-bg': GLOBAL.CLASS_BUTTON_BG,
                    '--modal-btn-bg-hover': GLOBAL.CLASS_BUTTON_BG_HOVER,
                    '--modal-btn-text': '#ffffff'
                } as React.CSSProperties}
            >
                <BookOpen className="w-5 h-5 mr-3" />
                Class
            </button>
            <button
                onClick={() => openModal('add-event')}
                className="modal-btn flex items-center"
                style={{
                    '--modal-btn-bg': GLOBAL.EVENT_BUTTON_BG,
                    '--modal-btn-bg-hover': GLOBAL.EVENT_BUTTON_BG_HOVER,
                    '--modal-btn-text': '#ffffff'
                } as React.CSSProperties}
            >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Event
            </button>
            <button
                onClick={() => openModal('add-no-school')}
                className="modal-btn flex items-center"
                style={{
                    '--modal-btn-bg': GLOBAL.NOSCHOOL_BUTTON_BG,
                    '--modal-btn-bg-hover': GLOBAL.NOSCHOOL_BUTTON_BG_HOVER,
                    '--modal-btn-text': '#ffffff'
                } as React.CSSProperties}
            >
                <X className="w-5 h-5 mr-3" />
                No School
            </button>
        </div>
        <div className="flex justify-end mt-4">
            <button
                onClick={onClose}
                className="modal-btn modal-btn-cancel"
                style={{
                    '--modal-btn-bg': GLOBAL.CANCEL_BUTTON_BG,
                    '--modal-btn-bg-hover': GLOBAL.CANCEL_BUTTON_BG_HOVER,
                    '--modal-btn-text': GLOBAL.CANCEL_BUTTON_TEXT,
                    '--modal-btn-border': GLOBAL.CANCEL_BUTTON_BORDER
                } as React.CSSProperties}
            >
                Cancel
            </button>
        </div>
    </div>
)

const ModalManager: React.FC = () => {
    const { activeModal, modalData, closeModal, openModal } = useApp()

    if (!activeModal) return null

    const renderModalContent = () => {
        switch (activeModal) {
            case 'type-selector':
                return <TypeSelectorModal onClose={closeModal} openModal={openModal} />
            case 'add-assignment':
                return <AddAssignmentModal onClose={closeModal} />
            case 'edit-assignment':
                return <EditAssignmentModal onClose={closeModal} assignmentId={modalData} />
            case 'delete-assignment':
                return <DeleteAssignmentModal onClose={closeModal} assignmentId={modalData} />
            case 'add-class':
                return <AddClassModal onClose={closeModal} />
            case 'edit-class':
                return <EditClassModal onClose={closeModal} classId={modalData} />
            case 'delete-class':
                return <DeleteClassModal onClose={closeModal} classId={modalData} />
            case 'add-event':
                return <AddEventModal onClose={closeModal} />
            case 'edit-event':
                return <EditEventModal onClose={closeModal} eventId={modalData} />
            case 'delete-event':
                return <DeleteEventModal onClose={closeModal} eventId={modalData} />
            case 'add-no-school':
                return <AddNoSchoolModal onClose={closeModal} />
            case 'edit-no-school':
                return <EditNoSchoolModal onClose={closeModal} noSchoolId={modalData} />
            case 'delete-no-school':
                return <DeleteNoSchoolModal onClose={closeModal} noSchoolId={modalData} />
            case 'schedule-class-selector':
                return <ScheduleClassSelectorModal onClose={closeModal} data={modalData} />
            case 'clear-all-data':
                return <ClearAllDataModal onClose={closeModal} />
            case 'clear-assignments':
                return <ClearAllAssignmentsModal onClose={closeModal} />
            case 'clear-events':
                return <ClearAllEventsModal onClose={closeModal} />
            default:
                return null
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: GLOBAL.MODAL_BACKDROP }}>
            {renderModalContent()}
        </div>
    )
}

export default ModalManager
