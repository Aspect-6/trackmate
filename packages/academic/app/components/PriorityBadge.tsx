import React from "react"
import { cn } from "@/app/lib/utils"
import type { Priority } from "@/app/types"
import { GLOBAL } from "@/app/styles/colors"

interface PriorityBadgeProps {
    priority: Priority | "Done"
    className?: string
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
    const getPriorityStyles = (priorityLevel: string) => {
        const p = priorityLevel.toLowerCase()

        if (p === "done") {
            return {
                backgroundColor: GLOBAL.STATUS_DONE_TAG_BG,
                borderColor: GLOBAL.STATUS_DONE_TAG_BORDER,
                color: GLOBAL.STATUS_DONE_TAG_TEXT
            }
        } else if (p === "high") {
            return {
                backgroundColor: GLOBAL.PRIORITY_HIGH_BG,
                borderColor: GLOBAL.PRIORITY_HIGH_BORDER,
                color: GLOBAL.PRIORITY_HIGH_TEXT
            }
        } else if (p === "medium") {
            return {
                backgroundColor: GLOBAL.PRIORITY_MEDIUM_BG,
                borderColor: GLOBAL.PRIORITY_MEDIUM_BORDER,
                color: GLOBAL.PRIORITY_MEDIUM_TEXT
            }
        } else if (p === "low") {
            return {
                backgroundColor: GLOBAL.PRIORITY_LOW_BG,
                borderColor: GLOBAL.PRIORITY_LOW_BORDER,
                color: GLOBAL.PRIORITY_LOW_TEXT
            }
        }
    }

    return (
        <span
            className={cn("text-xs font-normal px-3 py-1 rounded-full border flex-shrink-0 inline-flex items-center justify-center", className)}
            style={getPriorityStyles(priority)}
        >
            {priority}
        </span>
    )
}

export default PriorityBadge
