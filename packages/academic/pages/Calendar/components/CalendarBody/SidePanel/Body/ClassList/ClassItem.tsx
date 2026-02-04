import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const ClassItem: React.FC<CalendarBody.SidePanel.Body.ClassList.ClassItemProps> = ({ classId, index, getClassById }) => {
    const { isHovered, hoverProps } = useHover()

    const classInfo = getClassById(classId)
    if (!classInfo) return null

    return (
        <div
            className="flex items-center justify-between p-3 rounded-lg transition-colors"
            style={{
                border: `1px solid ${CALENDAR.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classInfo.color}`,
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG
            }}
            {...hoverProps}
        >
            <div className="flex-1">
                <div className="font-semibold" style={{ color: CALENDAR.TEXT_PRIMARY }}>{classInfo.name}</div>
                <div className="text-sm" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                    Period {index + 1} • {classInfo.teacherName || "No instructor"}
                </div>
            </div>
        </div>
    )
}

export default React.memo(ClassItem)
