import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import ClassItem from './ClassItem'
import { CALENDAR } from '@/app/styles/colors'

const ClassList: React.FC<CalendarBody.SidePanel.Body.ClassList.Props> = ({ classes, getClassById }) => {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.CLASS_HEADING_TEXT }}>Classes</h4>
            <div className="space-y-2">
                {classes.map((classId, index) => {
                    if (!classId) return null
                    return (
                        <ClassItem key={index} classId={classId} index={index} getClassById={getClassById} />
                    )
                })}
            </div>
        </div>
    )
}

export default ClassList
