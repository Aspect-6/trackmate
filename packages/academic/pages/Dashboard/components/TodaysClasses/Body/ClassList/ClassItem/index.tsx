import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { TodaysClasses } from "@/pages/Dashboard/types"
import { DASHBOARD } from "@/app/styles/colors"

const ClassItem: React.FC<TodaysClasses.Body.ClassList.ClassItemProps> = ({ classInfo, period, openModal }) => {
    const { isHovered, hoverProps } = useHover()


    return (
        <div
            className="flex items-center justify-between p-3 rounded-lg shadow-md transition-colors cursor-pointer"
            style={{
                border: `1px solid ${DASHBOARD.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classInfo.color}`,
                backgroundColor: isHovered ? DASHBOARD.BACKGROUND_SECONDARY : DASHBOARD.BACKGROUND_PRIMARY
            }}
            onClick={() => openModal("edit-class", classInfo.id)}
            {...hoverProps}
        >
            <div className="flex-1">
                <p className="font-semibold text-sm sm:text-base" style={{ color: DASHBOARD.TEXT_PRIMARY }}>{classInfo.name}</p>
                <p className="text-xs mt-1" style={{ color: DASHBOARD.TEXT_SECONDARY }}>Period {period} • {classInfo.teacherName}</p>
            </div>
            <div className="text-right">
                <p className="text-xs ml-2" style={{ color: DASHBOARD.TEXT_SECONDARY }}>Room: {classInfo.roomNumber}</p>
            </div>
        </div>
    )
}

export default ClassItem
