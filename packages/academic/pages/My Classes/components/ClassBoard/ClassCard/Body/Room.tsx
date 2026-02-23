import React from "react"
import type { ClassBoard } from "@/pages/My Classes/types"
import { MY_CLASSES } from "@/app/styles/colors"

const ClassCardRoom: React.FC<ClassBoard.Card.Body.RoomProps> = ({ roomNumber }) => {
    return (
        <div className="flex items-center text-sm min-w-0">
            <span className="w-24 flex-shrink-0" style={{ color: MY_CLASSES.TEXT_SECONDARY }}>Room:</span>
            <span className="font-medium" style={{ color: MY_CLASSES.TEXT_PRIMARY }}>{roomNumber || "N/A"}</span>
        </div>
    )
}

export default ClassCardRoom
