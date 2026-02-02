import React from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useScheduleComponents } from "@/app/contexts/ScheduleComponentsContext"
import { useClasses, useNoSchool } from "@/app/hooks/entities"
import { todayString } from "@shared/lib"
import type { TodaysClasses } from "@/pages/Dashboard/types"
import { DASHBOARD } from "@/app/styles/colors"
import TodaysClassesHeader from "./TodaysClassesHeader"
import TodaysClassesBody, { ClassList, NoClassesScheduled, NoSchool } from "./Body"

const TodaysClasses: React.FC<TodaysClasses.Props> = ({
    isMobile,
    isCollapsed,
    onToggleCollapse
}) => {
    const { openModal } = useModal()
    const { getClassById } = useClasses()
    const { useClassIdsForDate } = useScheduleComponents()
    const { getNoSchoolStatusForDate } = useNoSchool()

    const today = todayString()
    const noSchool = getNoSchoolStatusForDate(today)
    const { classIds, hasClasses } = useClassIdsForDate(today)

    return (
        <div
            className="border p-6 rounded-xl shadow-md dashboard-collapsible"
            style={{
                backgroundColor: DASHBOARD.BACKGROUND_PRIMARY,
                borderColor: DASHBOARD.BORDER_PRIMARY
            }}
            data-collapsed={isMobile && isCollapsed ? "true" : "false"}
        >
            <TodaysClassesHeader
                isMobile={isMobile}
                isCollapsed={isCollapsed}
                onToggleCollapse={onToggleCollapse}
            />

            <TodaysClassesBody isMobile={isMobile} isCollapsed={isCollapsed}>
                {noSchool && <NoSchool noSchool={noSchool} />}
                {!noSchool && !hasClasses && <NoClassesScheduled />}
                {!noSchool && hasClasses && <ClassList classIds={classIds} getClassById={getClassById} openModal={openModal} />}
            </TodaysClassesBody>
        </div>
    )
}

export default TodaysClasses
