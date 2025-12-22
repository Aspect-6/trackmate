import React from 'react'
import { DayScheduleProps } from '@/pages/My Schedule/types'
import ScheduleSlot from '@/pages/My Schedule/components/ScheduleSlot'
import { MY_SCHEDULE } from '@/app/styles/colors'

const DaySchedule: React.FC<DayScheduleProps> = ({
    title,
    dayType,
    scheduleIds,
    getClassById,
    onRemove,
    onSelect
}) => {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: MY_SCHEDULE.TEXT_HEADER }}>{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {scheduleIds.map((classId, index) => (
                    <ScheduleSlot
                        key={`${dayType}-${index}`}
                        dayType={dayType}
                        index={index}
                        classId={classId}
                        getClassById={getClassById}
                        onRemove={onRemove}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    )
}

export default DaySchedule
