import React from 'react';
import { DangerZoneProps } from '@/pages/Settings/types';
import { SETTINGS } from '@/app/styles/colors';

const DangerZone: React.FC<DangerZoneProps> = ({ onOpenClearAssignmentsModal, onOpenClearEventsModal, onOpenClearDataModal }) => {
    return (
        <div
            className="p-6 rounded-xl danger-card"
            style={{
                backgroundColor: SETTINGS.MODULE_BG,
                border: `1px solid ${SETTINGS.MODULE_BORDER}`,
                boxShadow: SETTINGS.MODULE_SHADOW,
            }}
        >
            <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
                <h2 className="text-xl font-bold" style={{ color: SETTINGS.TEXT_DANGER }}>Danger Zone</h2>
                <span className="text-sm font-medium px-3 py-1 rounded-full" style={{
                    backgroundColor: 'rgba(248, 113, 113, 0.12)',
                    color: SETTINGS.TEXT_DANGER,
                    border: '1px solid rgba(248, 113, 113, 0.35)'
                }}>
                    Irreversible
                </span>
            </div>
            <p className="mb-5 text-base" style={{ color: SETTINGS.BODY_TEXT }}>
                Permanently delete your data. These actions cannot be undone.
            </p>
            <div className="danger-rows">
                <div className="danger-row">
                    <div className="danger-label">
                        <p className="danger-title">Delete All Assignments</p>
                        <p className="danger-sub">Delete every assignment from your account.</p>
                    </div>
                    <button
                        onClick={onOpenClearAssignmentsModal}
                        className="danger-btn settings-button-danger"
                    >
                        Delete All
                    </button>
                </div>
                <div className="danger-row">
                    <div className="danger-label">
                        <p className="danger-title">Delete All Events</p>
                        <p className="danger-sub">Delete every calendar event from your account.</p>
                    </div>
                    <button
                        onClick={onOpenClearEventsModal}
                        className="danger-btn settings-button-danger"
                    >
                        Delete All
                    </button>
                </div>
                <div className="danger-row">
                    <div className="danger-label">
                        <p className="danger-title">Clear All Data</p>
                        <p className="danger-sub">Clear all data from your account. There is no going back.</p>
                    </div>
                    <button
                        onClick={onOpenClearDataModal}
                        className="danger-btn settings-button-danger"
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DangerZone;
