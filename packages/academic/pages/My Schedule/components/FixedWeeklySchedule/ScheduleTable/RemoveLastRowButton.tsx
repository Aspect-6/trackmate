import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { FixedWeeklySchedule } from "@/pages/My Schedule/types"
import { MY_SCHEDULE } from "@/app/styles/colors"
import { Trash2 } from "lucide-react"

const REMOVE_ROW_LABEL_REST =
    "color-mix(in srgb, var(--priority-high-text) 62%, var(--text-tertiary) 38%)"

const RemoveLastRowButton: React.FC<FixedWeeklySchedule.ScheduleTable.RemoveLastRowButton.Props> = ({ onClick }) => {
    const { isHovered, hoverProps } = useHover()
    const fg = isHovered ? MY_SCHEDULE.DELETE_BUTTON_TEXT : REMOVE_ROW_LABEL_REST
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors"
            style={{
                backgroundColor: isHovered ? MY_SCHEDULE.DELETE_BUTTON_BG : "transparent",
                color: fg,
                border: `1px solid ${isHovered ? MY_SCHEDULE.DELETE_BUTTON_BG : MY_SCHEDULE.PRIORITY_HIGH_BORDER}`,
            }}
            title="Remove the bottom class row"
            aria-label="Remove the bottom class row"
            {...hoverProps}
        >
            <Trash2 className="h-3.5 w-3.5 shrink-0 text-current" aria-hidden />
            Remove last row
        </button>
    )
}

export default RemoveLastRowButton
