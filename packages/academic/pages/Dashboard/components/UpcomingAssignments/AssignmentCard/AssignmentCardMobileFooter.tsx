import React from "react"
import { formatDateRelative, formatTime } from "@shared/lib"
import type { UpcomingAssignments } from "@/pages/Dashboard/types"
import { Clock } from "lucide-react"
import PriorityBadge from "@/app/components/PriorityBadge"
import { DASHBOARD } from "@/app/styles/colors"

const AssignmentCardMobileFooter: React.FC<UpcomingAssignments.AssignmentCard.MobileFooterProps> = ({ assignment }) => {
    const showTime = assignment.dueTime && assignment.dueTime !== "23:59"

    return (
        <div className="flex items-center justify-between sm:hidden gap-2">
            <div className="flex items-center gap-1 text-xs ml-1" style={{ color: DASHBOARD.TEXT_SECONDARY }}>
                <Clock className="w-3 h-3" />
                {formatDateRelative("short", assignment.dueDate)}{showTime && ` at ${formatTime(assignment.dueTime)}`}
            </div>
            {assignment.kind === "parent" && assignment.priority && (
                <PriorityBadge
                    priority={assignment.priority}
                    className="text-[11px] px-2 py-0.5 self-end"
                />
            )}
        </div>
    )
}

export default AssignmentCardMobileFooter
