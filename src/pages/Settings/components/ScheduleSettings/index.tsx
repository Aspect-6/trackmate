import React from 'react'
import type { ScheduleSettings } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const ScheduleSettingsComponent: React.FC<ScheduleSettings.Props> = ({ children }) => {
    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl shadow-md mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            {children}
        </div>
    )
}

export default ScheduleSettingsComponent
export { default as ScheduleSettingsContent } from './Content'
export { default as ScheduleTypeDropdown } from './Content/ScheduleTypeDropdown'
export { default as ScheduleTypeDropdownOption } from './Content/ScheduleTypeDropdown/ScheduleTypeDropdownOption'
export { default as CurrentDayCalculation } from './Content/CurrentDayCalculation'
export { default as SetDayTypeButton } from './Content/SetDayTypeButton'
