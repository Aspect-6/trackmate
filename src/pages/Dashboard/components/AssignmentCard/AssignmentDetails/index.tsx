import React from 'react'
import type { AssignmentCard } from '@/pages/Dashboard/types'

const AssignmentDetails: React.FC<AssignmentCard.Details.Props> = ({ children }) => {
    return (
        <div className="min-w-0 flex-1">
            {children}
        </div>
    )
}

export default AssignmentDetails

export { default as AssignmentDetailsTitle } from './AssignmentDetailsTitle'
export { default as AssignmentDetailsBody } from './Body'
export { default as AssignmentDetailsClass } from './Body/Class'
export { default as AssignmentDetailsDue } from './Body/Due'
