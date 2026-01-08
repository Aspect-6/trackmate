import React from 'react'
import type { AlternatingDaysSchedule } from '@/pages/My Schedule/types'
import { MY_SCHEDULE } from '@/app/styles/colors'

const AlternatingDaysSchedule: React.FC<AlternatingDaysSchedule.Props> = ({ title, children }) => {
    return (
        <div className="mb-8">
            <h3
                className="text-lg font-semibold mb-4"
                style={{ color: MY_SCHEDULE.TEXT_PRIMARY }}
            >
                {title}
            </h3>
            {children}
        </div>
    )
}

export default AlternatingDaysSchedule

export { default as ScheduleTable } from './ScheduleTable'
export { default as ScheduleTableRow } from './ScheduleTable/Row'
export { default as EmptyCell } from './ScheduleTable/Row/EmptyCell'
export { default as FilledCell } from './ScheduleTable/Row/FilledCell'
