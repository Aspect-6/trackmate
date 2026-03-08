import React, { useCallback, useEffect, useState } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useEvents } from "@/app/hooks/entities"
import { useBreakpoints } from "@/app/hooks/ui/useBreakpoints"
import UpcomingAssignments from "@/pages/Dashboard/components/UpcomingAssignments"
import TodaysEvents from "@/pages/Dashboard/components/TodaysEvents"
import TodaysClasses from "@/pages/Dashboard/components/TodaysClasses"
import "@/pages/Dashboard/index.css"

const Dashboard: React.FC = () => {
    const { openModal } = useModal()
    const { todaysEvents } = useEvents()
    const { isMobile } = useBreakpoints()

    const openEditEvent = useCallback((id: string) => openModal("edit-event", id), [openModal])

    const [isEventsCollapsed, setIsEventsCollapsed] = useState<boolean>(isMobile)
    const [isClassesCollapsed, setIsClassesCollapsed] = useState<boolean>(isMobile)

    useEffect(() => {
        if (isMobile) {
            setIsEventsCollapsed(true)
            setIsClassesCollapsed(true)
        } else {
            setIsEventsCollapsed(false)
            setIsClassesCollapsed(false)
        }
    }, [isMobile])

    return (
        <div className="dashboard-page flex-1 flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <TodaysEvents
                    events={todaysEvents}
                    onEventClick={openEditEvent}
                    isMobile={isMobile}
                    isCollapsed={isEventsCollapsed}
                    onToggleCollapse={() => setIsEventsCollapsed((prev) => !prev)}
                />

                <TodaysClasses
                    isMobile={isMobile}
                    isCollapsed={isClassesCollapsed}
                    onToggleCollapse={() => setIsClassesCollapsed((prev) => !prev)}
                />
            </div>

            <UpcomingAssignments />
        </div>
    )
}

export default Dashboard

