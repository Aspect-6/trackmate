import React, { useState } from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'
import PriorityBadge from '@/app/components/PriorityBadge'

const AssignmentItem: React.FC<CalendarBody.SidePanel.Body.AssignmentList.AssignmentItemProps> = ({ assignment, getClassById, onAssignmentClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    const linkedClass = getClassById(assignment.classId)
    const classColor = linkedClass ? linkedClass.color : CALENDAR.DEFAULT_CLASS_COLOR
    const className = linkedClass ? linkedClass.name : 'Unassigned'
    const isDone = assignment.status === 'Done'

    return (
        <div
            onClick={() => onAssignmentClick(assignment.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`calendar-side-panel-item p-3 rounded-lg cursor-pointer transition-colors ${isDone ? 'opacity-60' : ''}`}
            style={{
                borderLeft: `4px solid ${classColor}`,
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG
            }}
        >
            <div className={`font-semibold ${isDone ? 'line-through' : ''}`} style={{ color: isDone ? CALENDAR.STATUS_DONE_TEXT : CALENDAR.SIDE_PANEL_TEXT }}>{assignment.title}</div>
            <div className="text-sm flex items-center justify-between mt-1" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>
                <span style={{ color: isDone ? CALENDAR.STATUS_DONE_TEXT : classColor }}>{className}</span>
                <PriorityBadge
                    priority={isDone ? 'Done' : assignment.priority}
                    className="px-2 py-0.5"
                />
            </div>
        </div>
    )
}

export default React.memo(AssignmentItem)
