import React from 'react'
import type { UpcomingAssignments } from '@/pages/Dashboard/types'

const AssignmentDetailsClass: React.FC<UpcomingAssignments.AssignmentCard.Details.Body.AssignmentDetailsClassProps> = ({ assignmentClass }) => {
    return (
        <span className="font-medium" style={{ color: assignmentClass.color }}>
            {assignmentClass.name}
        </span>
    )
}

export default AssignmentDetailsClass
