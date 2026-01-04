import React from 'react'
import type { AssignmentCard } from '@/pages/Dashboard/types'
import { Clock } from 'lucide-react'
import { formatDate } from '@/app/lib/utils'
import { DASHBOARD } from '@/app/styles/colors'
import PriorityBadge from '@/app/components/PriorityBadge'

const AssignmentCardMobileFooter: React.FC<AssignmentCard.MobileFooterProps> = ({ assignment }) => {
    return (
        <div className="flex items-center justify-between sm:hidden gap-2">
            <div className="flex items-center gap-1 text-xs" style={{ color: DASHBOARD.TEXT_SECONDARY }}>
                <Clock className="w-3 h-3" />
                {formatDate(assignment.dueDate)}
            </div>
            <PriorityBadge
                priority={assignment.priority}
                className="text-[11px] px-2 py-0.5 self-end"
            />
        </div>
    )
}

export default AssignmentCardMobileFooter
