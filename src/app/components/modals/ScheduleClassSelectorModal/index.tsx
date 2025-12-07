import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { ClassSelectionItem } from './ClassSelectionItem';
import { EmptyClassList } from './EmptyClassList';
import {
    GLOBAL
} from '@/app/styles/colors';

interface ScheduleModalProps {
    onClose: () => void;
    data: {
        dayType: 'A' | 'B';
        index: number;
    };
}

export const ScheduleClassSelectorModal: React.FC<ScheduleModalProps> = ({ onClose, data }) => {
    const { classes, updateSchedule } = useApp();
    const { dayType, index } = data;

    const handleSelect = (classId: string) => {
        updateSchedule(dayType, index, classId);
        onClose();
    };

    const dayLabel = dayType === 'A' ? 'A-Day' : 'B-Day';

    return (
        <div
            className="w-full max-w-md p-6 rounded-xl"
            style={{
                backgroundColor: GLOBAL.MODAL_BG,
                border: `1px solid ${GLOBAL.BORDER_PRIMARY}`,
                boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
            }}
        >
            <h2 className="text-xl font-bold mb-4" style={{ color: GLOBAL.CLASS_BUTTON_TEXT }}>
                Select Class for {dayLabel} Period {index + 1}
            </h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
                {classes.length === 0 ? (
                    <EmptyClassList />
                ) : (
                    classes.map(c => (
                        <ClassSelectionItem
                            key={c.id}
                            classItem={c}
                            onSelect={handleSelect}
                        />
                    ))
                )}
            </div>
            <div className="flex justify-end space-x-3 pt-4 mt-4" style={{ borderTop: `1px solid ${GLOBAL.BORDER_SECONDARY}` }}>
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-cancel modal-btn-inline"
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
    );
};
