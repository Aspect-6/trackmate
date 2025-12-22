import React from 'react'
import type { AssignmentCard } from '@/pages/Dashboard/types'

const AssignmentDetailsClass: React.FC<AssignmentCard.Details.Body.AssignmentDetailsClassProps> = ({ assignmentClass }) => {
    return (
        <span className="font-medium" style={{ color: assignmentClass.color }}>
            {assignmentClass.name}
        </span>
    )
}

export default AssignmentDetailsClass
