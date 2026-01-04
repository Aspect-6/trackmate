import React, { useState } from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'
import PriorityBadge from '@/app/components/PriorityBadge'

const AssignmentItem: React.FC<CalendarBody.SidePanel.Body.AssignmentList.AssignmentItemProps> = ({ assignment, getClassById, onAssignmentClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    const linkedClass = getClassById(assignment.classId)
    const classColor = linkedClass.color
    const className = linkedClass.name
    const isDone = assignment.status === 'Done'

    return (
        <div
            onClick={() => onAssignmentClick(assignment.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${isDone ? 'opacity-60' : ''}`}
            style={{
                border: `1px solid ${CALENDAR.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classColor}`,
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG
            }}
        >
            <div className={`font-semibold ${isDone ? 'line-through' : ''}`} style={{ color: isDone ? CALENDAR.TEXT_SECONDARY : CALENDAR.TEXT_PRIMARY }}>{assignment.title}</div>
            <div className="text-sm flex items-center justify-between mt-1" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                <span style={{ color: isDone ? CALENDAR.TEXT_SECONDARY : classColor }}>{className}</span>
                <PriorityBadge
                    priority={isDone ? 'Done' : assignment.priority}
                    className="px-2 py-0.5"
                />
            </div>
        </div>
    )
}

export default React.memo(AssignmentItem)
