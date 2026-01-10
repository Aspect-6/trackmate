import React from 'react'
import type { UpcomingAssignments } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'

const AssignmentDetailsBody: React.FC<UpcomingAssignments.AssignmentCard.Details.Body.Props> = ({ children }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm" style={{ color: DASHBOARD.TEXT_SECONDARY }}>
            {children}
        </div>
    )
}

export default AssignmentDetailsBody
