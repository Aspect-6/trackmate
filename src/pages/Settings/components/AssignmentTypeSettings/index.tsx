import React from 'react'
import type { AssignmentTypeSettings } from '@/pages/Settings/types'
import { SETTINGS } from '@/app/styles/colors'

const AssignmentTypeSettingsComponent: React.FC<AssignmentTypeSettings.Props> = ({ children }) => {
    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.MODULE_BG,
                border: `1px solid ${SETTINGS.MODULE_BORDER}`,
                boxShadow: SETTINGS.MODULE_SHADOW
            }}
        >
            {children}
        </div>
    )
}

export default AssignmentTypeSettingsComponent

export { default as AssignmentTypeSettingsContent } from './Content'
export { default as AssignmentTypeList } from './Content/AssignmentTypeList'
export { default as AssignmentTypeListRow } from './Content/AssignmentTypeList/AssignmentTypeListRow'
export { default as AddTypeForm } from './Content/AddTypeForm'
export { default as AddTypeInput } from './Content/AddTypeForm/AddTypeInput'
export { default as AddTypeButton } from './Content/AddTypeForm/AddTypeButton'

