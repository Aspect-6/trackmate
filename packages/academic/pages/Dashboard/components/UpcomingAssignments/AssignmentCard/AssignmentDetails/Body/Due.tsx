import React from 'react'
import type { UpcomingAssignments } from '@/pages/Dashboard/types'
import { Clock } from 'lucide-react'
import { formatDate } from '@shared/lib'

const AssignmentDetailsDue: React.FC<UpcomingAssignments.AssignmentCard.Details.Body.AssignmentDetailsDueProps> = ({ assignment }) => {
    return (
        <div className="hidden sm:flex items-center text-sm">
            <Clock className="w-3 h-3 mr-1" />
            {assignment.type === 'Test' ? 'On' : 'Due'}: {formatDate('short', assignment.dueDate)}
        </div>
    )
}

export default AssignmentDetailsDue
