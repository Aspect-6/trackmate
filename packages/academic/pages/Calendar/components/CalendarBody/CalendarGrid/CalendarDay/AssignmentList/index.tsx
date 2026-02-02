import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import AssignmentItem from "./AssignmentItem"

const AssignmentList: React.FC<CalendarBody.Grid.Day.AssignmentList.Props> = ({ assignments, getClassColor, onAssignmentClick }) => (
    <>
        {assignments.map(a => (
            <AssignmentItem key={a.id} assignment={a} color={getClassColor(a.classId)} onClick={onAssignmentClick} />
        ))}
    </>
)

export default React.memo(AssignmentList)
