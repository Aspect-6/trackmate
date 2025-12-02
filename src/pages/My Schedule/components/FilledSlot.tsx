import React from 'react';
import { FilledSlotProps } from '@/pages/Schedule/types';
import { MY_SCHEDULE } from '@/app/styles/colors';

const FilledSlot: React.FC<FilledSlotProps> = ({ classInfo, onRemove }) => {
    return (
        <div
            className="class-card p-4 rounded-lg flex flex-col min-h-[200px]"
            style={{ borderLeft: `4px solid ${classInfo.color}` }}
        >
            <div className="flex-grow">
                <h4 className="font-semibold text-white">{classInfo.name}</h4>
                <p className="text-sm text-gray-400 pt-1">{classInfo.teacherName || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-end mt-2">
                <p className="text-sm text-gray-400">Room: {classInfo.roomNumber || 'N/A'}</p>
                <button
                    onClick={onRemove}
                    className="py-1 px-2 rounded text-xs transition-colors"
                    style={{ backgroundColor: MY_SCHEDULE.REMOVE_BUTTON_BG, color: MY_SCHEDULE.REMOVE_BUTTON_TEXT }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = MY_SCHEDULE.REMOVE_BUTTON_BG_HOVER}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = MY_SCHEDULE.REMOVE_BUTTON_BG}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default FilledSlot;
