import React from 'react'
import type { ScheduleSettings } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const ScheduleSettingsComponent: React.FC<ScheduleSettings.Props> = ({ children }) => {
    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.MODULE_BG,
                border: `1px solid ${SETTINGS.MODULE_BORDER}`,
                boxShadow: SETTINGS.MODULE_SHADOW,
            }}
        >
            {children}
        </div>
    )
}

export default ScheduleSettingsComponent
export { default as ScheduleSettingsContent } from './Content'
export { default as ScheduleTypeDropdown } from './Content/ScheduleTypeDropdown'
export { default as CurrentDayCalculation } from './Content/CurrentDayCalculation'
export { default as SetDayTypeButton } from './Content/SetDayTypeButton'
