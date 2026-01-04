import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import AssignmentItem from './AssignmentItem'
import { CALENDAR } from '@/app/styles/colors'

const AssignmentList: React.FC<CalendarBody.SidePanel.Body.AssignmentList.Props> = ({ assignments, getClassById, onAssignmentClick }) => {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.ASSIGNMENT_HEADING_TEXT }}>Assignments Due</h4>
            <div className="space-y-2">
                {assignments.length > 0 ? (
                    assignments.map(assignment => (
                        <AssignmentItem
                            key={assignment.id}
                            assignment={assignment}
                            getClassById={getClassById}
                            onAssignmentClick={onAssignmentClick}
                        />
                    ))
                ) : (
                    <p className="text-sm italic" style={{ color: CALENDAR.TEXT_SECONDARY }}>No assignments due</p>
                )}
            </div>
        </div>
    )
}

export default AssignmentList
