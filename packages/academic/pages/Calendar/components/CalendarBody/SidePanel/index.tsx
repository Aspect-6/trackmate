import React from "react"
import type { CalendarBody } from "@/pages/Calendar/types"
import { CALENDAR } from "@/app/styles/colors"

const CalendarSidePanel: React.FC<CalendarBody.SidePanel.Props> = ({ date, children }) => {
    if (!date) return null

    return (
        <div
            id="calendar-side-panel"
            className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto w-full lg:w-80 border shadow-2xl overflow-y-auto z-20 flex flex-col p-4 lg:rounded-none"
            style={{ backgroundColor: CALENDAR.BACKGROUND_SECONDARY, borderColor: CALENDAR.BORDER_PRIMARY }}
        >
            {children}
        </div>
    )
}

export default CalendarSidePanel

export { default as CalendarSidePanelHeader } from "./Header"
export { default as CalendarSidePanelBody } from "./Body"
export { default as DateDisplay } from "./Header/DateDisplay"
export { default as CloseButton } from "./Header/CloseButton"
export { default as NoSchoolInfo } from "./Body/DayType/DayTypeNoSchoolInfo"
export { default as DayType } from "./Body/DayType"
export { default as DayTypeDisplay } from "./Body/DayType/DayTypeDisplay"
export { default as ClassList } from "./Body/ClassList"
export { default as AssignmentList } from "./Body/AssignmentList"
export { default as EventList } from "./Body/EventList"