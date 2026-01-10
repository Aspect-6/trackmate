import React from 'react'
import { useAssignments } from '@/app/hooks/entities'
import AssignmentCard from './AssignmentCard'
import NoUpcomingAssignments from './NoUpcomingAssignments'
import { DASHBOARD } from '@/app/styles/colors'

const UpcomingAssignments: React.FC = () => {
    const { activeAssignments } = useAssignments()

    // Get first 3 active assignments
    const assignmentsToShow = activeAssignments.slice(0, 3)

    return (
        <div
            className="border p-6 rounded-xl shadow-sm sm:shadow-md min-h-0"
            style={{
                backgroundColor: DASHBOARD.BACKGROUND_PRIMARY,
                borderColor: DASHBOARD.BORDER_PRIMARY,
            }}
        >
            <h2 className="text-xl font-bold mb-4" style={{ color: DASHBOARD.ASSIGNMENT_HEADING_TEXT }}>Upcoming Assignments</h2>
            <div className="space-y-3 custom-scrollbar">
                {assignmentsToShow.length === 0 ? (
                    <NoUpcomingAssignments />
                ) : (
                    assignmentsToShow.map(assignment => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                    ))
                )}
            </div>
        </div>
    )
}

export default UpcomingAssignments
