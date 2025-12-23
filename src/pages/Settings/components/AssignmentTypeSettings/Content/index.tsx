import React from 'react'
import type { AssignmentTypeSettings } from '@/pages/Settings/types'

const AssignmentTypeSettingsContent: React.FC<AssignmentTypeSettings.Content.Props> = ({ children }) => {
    return (
        <div className="space-y-4">
            {children}
        </div>
    )
}

export default AssignmentTypeSettingsContent

export { default as AddTypeForm } from './AddTypeForm'
export { default as AssignmentTypeList } from './AssignmentTypeList'