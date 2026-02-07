import React, { useMemo } from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import AssignmentItem from "./AssignmentItem"
import { CALENDAR } from "@/app/styles/colors"

const AssignmentList: React.FC<CalendarBody.SidePanel.Body.AssignmentList.Props> = ({ assignments, getClassById, onAssignmentClick }) => {
    const sortedAssignments = useMemo(() => {
        return assignments.toSorted((a, b) => a.dueTime.localeCompare(b.dueTime))
    }, [assignments])

    return (
        <div>
            <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.ASSIGNMENT_HEADING_TEXT }}>Assignments Due</h4>
            <div className="space-y-2">
                {sortedAssignments.length > 0 ? (
                    sortedAssignments.map(assignment => (
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

