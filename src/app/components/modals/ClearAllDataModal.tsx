import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { MODALS } from '@/app/styles/colors';

interface ModalProps {
    onClose: () => void;
}

export const ClearAllDataModal: React.FC<ModalProps> = ({ onClose }) => {
    const { clearAllData } = useApp();

    const handleDelete = () => {
        clearAllData();
    };

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.BASE.DELETE_HEADING }}>
                Clear All Data?
            </h2>
            <p className="text-gray-300 mb-4" style={{ color: MODALS.BASE.DELETE_BODY }}>
                This will permanently delete all assignments, classes, events, schedules, no-school days, and custom assignment types.
                This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-cancel modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                        '--modal-btn-border': MODALS.BASE.CANCEL_BORDER
                    } as React.CSSProperties}
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="modal-btn modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.DELETE_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.DELETE_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.DELETE_TEXT
                    } as React.CSSProperties}
                >
                    Delete Everything
                </button>
            </div>
        </div>
    );
};

export const ClearAllAssignmentsModal: React.FC<ModalProps> = ({ onClose }) => {
    const { clearAllAssignments } = useApp();

    const handleDelete = () => {
        clearAllAssignments();
    };

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.BASE.DELETE_HEADING }}>
                Delete All Assignments?
            </h2>
            <p className="text-gray-300 mb-4" style={{ color: MODALS.BASE.DELETE_BODY }}>
                This will permanently delete every assignment from your account. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-cancel modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                        '--modal-btn-border': MODALS.BASE.CANCEL_BORDER
                    } as React.CSSProperties}
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="modal-btn modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.DELETE_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.DELETE_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.DELETE_TEXT
                    } as React.CSSProperties}
                >
                    Delete All Assignments
                </button>
            </div>
        </div>
    );
};

export const ClearAllEventsModal: React.FC<ModalProps> = ({ onClose }) => {
    const { clearAllEvents } = useApp();

    const handleDelete = () => {
        clearAllEvents();
    };

    return (
        <div className="modal-container" style={{ backgroundColor: MODALS.BASE.BG }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: MODALS.BASE.DELETE_HEADING }}>
                Delete All Events?
            </h2>
            <p className="text-gray-300 mb-4" style={{ color: MODALS.BASE.DELETE_BODY }}>
                This will permanently delete every calendar event from your account. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-cancel modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
                        '--modal-btn-border': MODALS.BASE.CANCEL_BORDER
                    } as React.CSSProperties}
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="modal-btn modal-btn-inline"
                    style={{
                        '--modal-btn-bg': MODALS.BASE.DELETE_BG,
                        '--modal-btn-bg-hover': MODALS.BASE.DELETE_BG_HOVER,
                        '--modal-btn-text': MODALS.BASE.DELETE_TEXT
                    } as React.CSSProperties}
                >
                    Delete All Events
                </button>
            </div>
        </div>
    );
};
