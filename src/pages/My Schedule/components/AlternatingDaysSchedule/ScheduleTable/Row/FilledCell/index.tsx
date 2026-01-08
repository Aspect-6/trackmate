import React from 'react'
import type { AlternatingDaysSchedule } from '@/pages/My Schedule/types'
import { MY_SCHEDULE } from '@/app/styles/colors'
import ClassName from './ClassName'
import RoomNumber from './RoomNumber'
import RemoveButton from './RemoveButton'

const FilledCell: React.FC<AlternatingDaysSchedule.ScheduleTable.Row.FilledCell.Props> = ({ isLastRow, classData, onRemove }) => {
    return (
        <td
            className="p-3 text-center schedule-cell"
            style={{
                borderBottom: !isLastRow ? `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}` : 'none'
            }}
        >
            <div
                className="relative min-h-[72px] flex items-center justify-center rounded-lg px-3 py-2"
                style={{
                    backgroundColor: classData.color || MY_SCHEDULE.SIDEBAR_ACTIVE_TAB_GREEN_BG,
                }}
            >
                <ClassName name={classData.name} />
                {classData.roomNumber && <RoomNumber roomNumber={classData.roomNumber} />}
                <RemoveButton onClick={onRemove} />
            </div>
        </td>
    )
}

export default FilledCell
