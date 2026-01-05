import React from 'react'
import { useHover } from '@/app/hooks/useHover'
import type { SemesterSchedule } from '@/pages/My Schedule/types'
import { X } from 'lucide-react'
import { MY_SCHEDULE } from '@/app/styles/colors'

const RemoveButton: React.FC<SemesterSchedule.ScheduleTable.Row.FilledCell.RemoveButtonProps> = ({ onClick }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            onClick={onClick}
            className="absolute top-1 right-1 p-1 rounded-full transition-colors"
            style={{ backgroundColor: isHovered ? MY_SCHEDULE.BACKGROUND_BLACK_50 : MY_SCHEDULE.BACKGROUND_BLACK_30 }}
            {...hoverProps}
        >
            <X className="w-3 h-3 text-white" />
        </button>
    )
}

export default RemoveButton
