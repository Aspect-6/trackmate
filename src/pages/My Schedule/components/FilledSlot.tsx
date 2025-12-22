import React from 'react'
import { FilledSlotProps } from '@/pages/My Schedule/types'
import { MY_SCHEDULE } from '@/app/styles/colors'

const FilledSlot: React.FC<FilledSlotProps> = ({ classInfo, onRemove }) => {
    return (
        <div
            className="class-card p-4 rounded-lg flex flex-col min-h-[200px]"
            style={{ borderLeft: `4px solid ${classInfo.color}` }}
        >
            <div className="flex-grow">
                <h4 className="font-semibold" style={{ color: MY_SCHEDULE.TEXT_PRIMARY }}>{classInfo.name}</h4>
                <p className="text-sm pt-1" style={{ color: MY_SCHEDULE.TEXT_SECONDARY }}>{classInfo.teacherName || 'N/A'}</p>
            </div>
            <div className="flex justify-between items-end mt-2">
                <p className="text-sm" style={{ color: MY_SCHEDULE.TEXT_SECONDARY }}>Room: {classInfo.roomNumber || 'N/A'}</p>
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
    )
}

export default FilledSlot
