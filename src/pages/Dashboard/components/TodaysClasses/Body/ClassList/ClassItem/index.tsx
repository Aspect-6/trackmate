import React, { useState } from 'react'
import type { TodaysClasses } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'

const ClassItem: React.FC<TodaysClasses.Body.ClassList.ClassItemProps> = ({ classInfo, period, openModal }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="flex items-center justify-between p-3 class-card rounded-lg transition-colors cursor-pointer border"
            style={{
                borderColor: DASHBOARD.MODULE_BORDER,
                boxShadow: DASHBOARD.CARD_SHADOW,
                borderLeftWidth: '4px',
                borderLeftStyle: 'solid',
                borderLeftColor: classInfo.color,
                backgroundColor: isHovered ? DASHBOARD.CLASS_ITEM_HOVER_BG : DASHBOARD.CLASS_ITEM_BG
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => openModal('edit-class', classInfo.id)}
        >
            <div className="flex-1">
                <p className="font-semibold text-sm sm:text-base" style={{ color: DASHBOARD.TEXT_WHITE }}>{classInfo.name}</p>
                <p className="text-xs mt-1" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>Period {period} • {classInfo.teacherName}</p>
            </div>
            <div className="text-right">
                <p className="text-xs ml-2" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>Room: {classInfo.roomNumber}</p>
            </div>
        </div>
    )
}

export default ClassItem
