import React from 'react'
import { FileText, BookOpen, X } from 'lucide-react'
import { GLOBAL } from '@/app/styles/colors'

interface TypeSelectorModalProps {
    onClose: () => void
    openModal: (modalName: string, data?: string | null) => void
}

export const TypeSelectorModal: React.FC<TypeSelectorModalProps> = ({ onClose, openModal }) => (
    <div
        className="w-full max-w-sm p-6 rounded-xl"
        style={{
            backgroundColor: GLOBAL.BACKGROUND_SECONDARY,
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
                    '--modal-btn-bg': GLOBAL.SCHEDULE_BUTTON_BG,
                    '--modal-btn-bg-hover': GLOBAL.SCHEDULE_BUTTON_BG_HOVER,
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
