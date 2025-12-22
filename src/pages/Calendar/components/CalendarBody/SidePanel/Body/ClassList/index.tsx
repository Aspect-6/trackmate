import React from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import ClassItem from './ClassItem'
import { CALENDAR } from '@/app/styles/colors'

const ClassList: React.FC<CalendarBody.SidePanel.Body.ClassList.Props> = ({ classes, noSchoolDay, getClassById }) => {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.CLASS_HEADING }}>Classes</h4>
            <div className="space-y-2">
                {noSchoolDay ? (
                    <p className="text-sm italic" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>No classes (no school)</p>
                ) : classes.length > 0 ? (
                    classes.map((classId, index) => (
                        <ClassItem key={index} classId={classId} index={index} getClassById={getClassById} />
                    ))
                ) : (
                    <p className="text-sm italic" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>No classes scheduled</p>
                )}
            </div>
        </div>
    )
}

export default ClassList
