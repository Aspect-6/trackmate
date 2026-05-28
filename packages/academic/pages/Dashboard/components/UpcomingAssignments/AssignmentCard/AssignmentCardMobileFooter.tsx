import React from "react"
import { formatDateRelative, formatTime } from "@shared/lib"
import type { UpcomingAssignments } from "@/pages/Dashboard/types"
import { Clock } from "lucide-react"
import PriorityBadge from "@/app/components/PriorityBadge"
import { DASHBOARD } from "@/app/styles/colors"

const AssignmentCardMobileFooter: React.FC<UpcomingAssignments.AssignmentCard.MobileFooterProps> = ({ assignment }) => {
    const showTime = assignment.dueTime && assignment.dueTime !== "23:59"
    const subtaskParentTitle = assignment.kind === "subtask" ? assignment.parentTitle : undefined

    return (
        <div className="flex items-center justify-between sm:hidden gap-2">
            <div
                className="flex items-center gap-1 text-xs ml-1 min-w-0"
                style={{ color: DASHBOARD.TEXT_SECONDARY }}
            >
                <Clock className="w-3 h-3 shrink-0" />
                {formatDateRelative("short", assignment.dueDate)}{showTime && ` at ${formatTime(assignment.dueTime)}`}
            </div>
            {subtaskParentTitle ? (
                <span
                    className="max-w-3/4 min-w-0 shrink text-right text-xs font-medium whitespace-normal break-words"
                    style={{ color: DASHBOARD.TEXT_SECONDARY }}
                    title={subtaskParentTitle}
                >
                    {subtaskParentTitle}
                </span>
            ) : assignment.kind === "parent" && assignment.priority ? (
                <PriorityBadge
                    priority={assignment.priority}
                    className="text-[11px] px-2 py-0.5 shrink-0"
                />
            ) : null}
        </div>
    )
}

export default AssignmentCardMobileFooter
