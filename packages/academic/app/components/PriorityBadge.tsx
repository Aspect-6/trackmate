import React from "react"
import { cn } from "@/app/lib/utils"
import { GLOBAL } from "@/app/styles/colors"

interface PriorityBadgeProps {
    priority: string
    className?: string
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({
    priority,
    className
}) => {
    // Map priority levels to the global color variables
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

        // Fallback styling for unknown priorities
        return {
            backgroundColor: "transparent",
            borderColor: GLOBAL.BORDER_PRIMARY,
            color: GLOBAL.TEXT_SECONDARY
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
