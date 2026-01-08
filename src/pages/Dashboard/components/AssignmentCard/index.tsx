import React, { useState } from 'react'
import { useAssignments } from '@/app/hooks/useAssignments'
import { useClasses } from '@/app/hooks/useClasses'
import { useHover } from '@/app/hooks/useHover'
import type { AssignmentCard } from '@/pages/Dashboard/types'
import PriorityBadge from '@/app/components/PriorityBadge'
import StatusButton from './StatusButton'
import AssignmentDetails, { AssignmentDetailsBody, AssignmentDetailsClass, AssignmentDetailsDue, AssignmentDetailsTitle } from './AssignmentDetails'
import AssignmentCardMobileFooter from './AssignmentCardMobileFooter'
import { DASHBOARD } from '@/app/styles/colors'

const AssignmentCard: React.FC<AssignmentCard.Props> = ({ assignment }) => {
    const { getClassById } = useClasses()
    const { updateAssignment, openEditAssignment } = useAssignments()
    const { isHovered, hoverProps } = useHover()
    const [isCompleting, setIsCompleting] = useState(false)
    const classInfo = getClassById(assignment.classId)!

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
            onClick={() => openEditAssignment(assignment.id)}
            className="flex flex-col gap-3 p-3 sm:p-4 rounded-xl shadow-md cursor-pointer transition-colors"
            style={{
                backgroundColor: isHovered ? DASHBOARD.BACKGROUND_TERTIARY : DASHBOARD.BACKGROUND_PRIMARY,
                border: `1px solid ${DASHBOARD.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${classInfo.color}`,
            }}
            {...hoverProps}
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
