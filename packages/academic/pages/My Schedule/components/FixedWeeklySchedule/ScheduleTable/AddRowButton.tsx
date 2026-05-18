import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { FixedWeeklySchedule } from "@/pages/My Schedule/types"
import { MY_SCHEDULE } from "@/app/styles/colors"
import { Plus } from "lucide-react"

const AddRowButton: React.FC<FixedWeeklySchedule.ScheduleTable.AddRowButton.Props> = ({ onClick }) => {
    const { isHovered, hoverProps } = useHover()
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors"
            style={{
                color: isHovered ? MY_SCHEDULE.TEXT_WHITE : MY_SCHEDULE.TEXT_SECONDARY,
                backgroundColor: isHovered ? MY_SCHEDULE.SCHEDULE_BUTTON_BG : "transparent",
                border: `1px solid ${isHovered ? MY_SCHEDULE.SCHEDULE_BUTTON_BG : MY_SCHEDULE.BORDER_PRIMARY}`,
            }}
            {...hoverProps}
        >
            <Plus
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: isHovered ? MY_SCHEDULE.TEXT_WHITE : MY_SCHEDULE.TEXT_TERTIARY }}
                aria-hidden
            />
            Add row
        </button>
    )
}

export default AddRowButton
