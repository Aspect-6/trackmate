import React from 'react'
import { ScheduleSlotProps } from '@/pages/My Schedule/types'
import FilledSlot from '@/pages/My Schedule/components/FilledSlot'
import EmptySlot from '@/pages/My Schedule/components/EmptySlot'
import { MY_SCHEDULE } from '@/app/styles/colors'

const ScheduleSlot: React.FC<ScheduleSlotProps> = ({
    dayType,
    index,
    classId,
    getClassById,
    onRemove,
    onSelect
}) => {
    const classInfo = classId ? getClassById(classId) : null

    return (
        <div className="mb-4">
            <h5 className="text-sm font-medium mb-2 text-center" style={{ color: MY_SCHEDULE.TEXT_SECONDARY }}>Period {index + 1}</h5>
            {classInfo ? (
                <FilledSlot
                    classInfo={classInfo}
                    onRemove={() => onRemove(dayType, index)}
                />
            ) : (
                <EmptySlot
                    onClick={() => onSelect(dayType, index)}
                />
            )}
        </div>
    )
}

export default ScheduleSlot
