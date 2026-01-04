import React from 'react'
import type { SemesterSchedule } from '@/pages/My Schedule/types'
import { Plus } from 'lucide-react'
import { MY_SCHEDULE } from '@/app/styles/colors'

const EmptyCell: React.FC<SemesterSchedule.ScheduleTable.Row.EmptyCellProps> = ({ isLastRow, onClick }) => {
    return (
        <td
            className="p-3 text-center schedule-cell"
            style={{ borderBottom: !isLastRow ? `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}` : 'none' }}
        >
            <button
                onClick={onClick}
                className="w-full h-full min-h-[72px] flex flex-col items-center justify-center gap-1 rounded-lg transition-colors cursor-pointer"
                style={{
                    backgroundColor: 'transparent',
                    border: `1px dashed ${MY_SCHEDULE.HOVER_ZONE_BUTTON_BORDER}`
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = MY_SCHEDULE.HOVER_ZONE_BUTTON_BORDER_HOVER
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = MY_SCHEDULE.HOVER_ZONE_BUTTON_BORDER
                }}
            >
                <Plus className="w-5 h-5" style={{ color: MY_SCHEDULE.TEXT_TERTIARY }} />
                <span className="text-xs hidden sm:inline" style={{ color: MY_SCHEDULE.TEXT_TERTIARY }}>
                    Click to add class
                </span>
            </button>
        </td>
    )
}

export default EmptyCell
