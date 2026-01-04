import React, { useState } from 'react'
import type { AssignmentCard } from '@/pages/Dashboard/types'
import { useApp } from '@/app/contexts/AppContext'
import { DASHBOARD } from '@/app/styles/colors'
import PriorityBadge from '@/app/components/PriorityBadge'
import StatusButton from './StatusButton'
import AssignmentDetails, { AssignmentDetailsBody, AssignmentDetailsClass, AssignmentDetailsDue, AssignmentDetailsTitle } from './AssignmentDetails'
import AssignmentCardMobileFooter from './AssignmentCardMobileFooter'

const AssignmentCard: React.FC<AssignmentCard.Props> = ({ assignment }) => {
    const { getClassById, updateAssignment, openModal } = useApp()
    const classInfo = getClassById(assignment.classId)!
    const [isCompleting, setIsCompleting] = useState(false)

    const handleStatusUpdate = (e: React.MouseEvent) => {
        e.stopPropagation()

        switch (assignment.status) {
            case 'To Do':
                updateAssignment(assignment.id, { status: 'In Progress' })
                break
            case 'In Progress':
                setIsCompleting(true)
                setTimeout(() => {
                    updateAssignment(assignment.id, { status: 'Done' })
                }, 600)
                break
            default:
                updateAssignment(assignment.id, { status: 'To Do' })
                break
        }
    }

    return (
        <div
            onClick={() => openModal('edit-assignment', assignment.id)}
            className="flex flex-col gap-3 p-3 sm:p-4 rounded-xl shadow-md cursor-pointer transition-colors"
            style={{
                backgroundColor: DASHBOARD.BACKGROUND_PRIMARY,
                border: `1px solid ${DASHBOARD.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classInfo.color}`,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = DASHBOARD.BACKGROUND_TERTIARY}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = DASHBOARD.BACKGROUND_PRIMARY}
        >
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <StatusButton
                    status={assignment.status}
                    isCompleting={isCompleting}
                    onClick={handleStatusUpdate}
                />

                <AssignmentDetails>
                    <AssignmentDetailsTitle status={assignment.status}>{assignment.title}</AssignmentDetailsTitle>

                    <AssignmentDetailsBody>
                        <AssignmentDetailsClass assignmentClass={classInfo} />
                        <AssignmentDetailsDue assignment={assignment} />
                    </AssignmentDetailsBody>
                </AssignmentDetails>

                <PriorityBadge priority={assignment.priority} className="hidden sm:inline-flex" />
            </div>

            <AssignmentCardMobileFooter assignment={assignment} />
        </div>
    )
}

export default AssignmentCard
