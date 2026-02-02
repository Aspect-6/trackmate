import React from "react"
import type { AlternatingDaysSchedule } from "@/pages/My Schedule/types"

const RoomNumber: React.FC<AlternatingDaysSchedule.ScheduleTable.Row.FilledCell.RoomNumberProps> = ({ roomNumber }) => {
    return (
        <span className="absolute bottom-1 right-1 text-xs text-white/80">
            {roomNumber}
        </span>
    )
}

export default RoomNumber
