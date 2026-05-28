import React, { useState } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useHover } from "@shared/hooks/ui/useHover"
import { useAssignments, useClasses } from "@/app/hooks/entities"
import { getEditAssignmentModalData } from "@/app/lib/subtaskIds"
import type { UpcomingAssignments } from "@/pages/Dashboard/types"
import PriorityBadge from "@/app/components/PriorityBadge"
import StatusButton from "./StatusButton"
import AssignmentDetails, { AssignmentDetailsBody, AssignmentDetailsClass, AssignmentDetailsDue, AssignmentDetailsTitle } from "./AssignmentDetails"
import AssignmentCardMobileFooter from "./AssignmentCardMobileFooter"
import { DASHBOARD } from "@/app/styles/colors"

const AssignmentCard: React.FC<UpcomingAssignments.AssignmentCard.Props> = ({ assignment }) => {
    const { getClassById } = useClasses()
    const { updateAssignment } = useAssignments()
    const { openModal } = useModal()
    const { isHovered, hoverProps } = useHover()
    const [isCompleting, setIsCompleting] = useState(false)
    const classInfo = getClassById(assignment.classId)

    if (!classInfo) return null

    const isSubtask = assignment.kind === "subtask"
    const subtaskParentTitle = isSubtask ? assignment.parentTitle : undefined

    const handleStatusUpdate = (e: React.MouseEvent) => {
        e.stopPropagation()

        switch (assignment.status) {
            case "To Do":
                updateAssignment(assignment.id, { status: "In Progress" })
                break
            case "In Progress":
                setIsCompleting(true)
                setTimeout(() => {
                    updateAssignment(assignment.id, { status: "Done" })
                }, 600)
                break
            default:
                updateAssignment(assignment.id, { status: "To Do" })
                break
        }
    }

    return (
        <div
            onClick={() => openModal("edit-assignment", getEditAssignmentModalData(assignment.id))}
            className={`flex flex-col rounded-xl shadow-md cursor-pointer transition-colors ${isSubtask ? "gap-2 p-3" : "gap-3 p-3 sm:p-4"}`}
            style={{
                backgroundColor: isHovered ? DASHBOARD.BACKGROUND_SECONDARY : DASHBOARD.BACKGROUND_PRIMARY,
                border: `1px solid ${DASHBOARD.BORDER_PRIMARY}`,
                borderLeft: `${isSubtask ? 2.5 : 4}px solid ${classInfo.color}`,
            }}
            {...hoverProps}
        >
            <div className={`flex items-start sm:items-center ${isSubtask ? "gap-2 sm:gap-3" : "gap-3 sm:gap-4"}`}>
                <StatusButton
                    status={assignment.status}
                    isCompleting={isCompleting}
                    onClick={handleStatusUpdate}
                />

                <div className="min-w-0 flex-1">
                    <AssignmentDetails>
                        <AssignmentDetailsTitle status={assignment.status} compact={isSubtask}>
                            {assignment.title}
                        </AssignmentDetailsTitle>

                        <AssignmentDetailsBody compact={isSubtask}>
                            <AssignmentDetailsClass assignmentClass={classInfo} />
                            <AssignmentDetailsDue assignment={assignment} />
                        </AssignmentDetailsBody>
                    </AssignmentDetails>
                </div>

                <div className="hidden sm:flex shrink-0 min-w-0 max-w-1/2 justify-end">
                    {assignment.kind === "parent" && assignment.priority ? (
                        <PriorityBadge priority={assignment.priority} />
                    ) : subtaskParentTitle ? (
                        <p
                            className="text-xs text-right font-medium whitespace-normal break-words"
                            style={{ color: DASHBOARD.TEXT_SECONDARY }}
                            title={subtaskParentTitle}
                        >
                            {subtaskParentTitle}
                        </p>
                    ) : null}
                </div>
            </div>

            <AssignmentCardMobileFooter assignment={assignment} />
        </div>
    )
}

export default AssignmentCard
