import React, { useState } from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const ClassItem: React.FC<CalendarBody.SidePanel.Body.ClassList.ClassItemProps> = ({ classId, index, getClassById }) => {
    const [isHovered, setIsHovered] = useState(false)
    if (!classId) return null
    const classInfo = getClassById(classId)
    if (!classInfo) return null

    return (
        <div 
            className="flex items-center justify-between p-3 rounded-lg transition-colors" 
            style={{ 
                borderLeft: `4px solid ${classInfo.color}`, 
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG 
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex-1">
                <div className="font-semibold" style={{ color: CALENDAR.SIDE_PANEL_TEXT }}>{classInfo.name}</div>
                <div className="text-sm" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>
                    Period {index + 1} • {classInfo.teacherName || 'No instructor'}
                </div>
            </div>
        </div>
    )
}

export default React.memo(ClassItem)
