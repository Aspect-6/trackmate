import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { ScheduleSettings } from '@/pages/Settings/types'
import type { ScheduleType } from '@/app/types'

const ScheduleTypeDropdown: React.FC<ScheduleSettings.Content.ScheduleTypeDropdown.Props> = ({ className, children }) => {
    const { schedules, setScheduleType } = useApp()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setScheduleType(e.target.value as ScheduleType)
    }

    return (
        <div className={className}>
            <select
                value={schedules.type}
                onChange={handleChange}
                className="settings-select"
            >
                {children}
            </select>
        </div>
    )
}

export default ScheduleTypeDropdown