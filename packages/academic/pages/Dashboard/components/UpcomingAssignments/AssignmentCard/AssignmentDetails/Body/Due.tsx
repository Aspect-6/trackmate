import React from 'react'
import type { UpcomingAssignments } from '@/pages/Dashboard/types'
import { Clock } from 'lucide-react'
import { formatDate, formatTime } from '@shared/lib'

const AssignmentDetailsDue: React.FC<UpcomingAssignments.AssignmentCard.Details.Body.AssignmentDetailsDueProps> = ({ assignment }) => {
    const showTime = assignment.dueTime && assignment.dueTime !== '23:59'

    return (
        <div className="hidden sm:flex items-center text-sm">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate('short', assignment.dueDate)}{showTime && ` at ${formatTime(assignment.dueTime)}`}
        </div>
    )
}

export default AssignmentDetailsDue
