import React, { useCallback, useEffect, useState } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useEvents } from "@/app/hooks/entities"
import UpcomingAssignments from "@/pages/Dashboard/components/UpcomingAssignments"
import TodaysEvents from "@/pages/Dashboard/components/TodaysEvents"
import TodaysClasses from "@/pages/Dashboard/components/TodaysClasses"
import "@/pages/Dashboard/index.css"

const MOBILE_BREAKPOINT = "(max-width: 767px)"

const Dashboard: React.FC = () => {
    const { openModal } = useModal()
    const { todaysEvents } = useEvents()

    const openEditEvent = useCallback((id: string) => openModal("edit-event", id), [openModal])

    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === "undefined") return false
        return window.matchMedia(MOBILE_BREAKPOINT).matches
    })
    const [isEventsCollapsed, setIsEventsCollapsed] = useState<boolean>(() => {
        if (typeof window === "undefined") return false
        return window.matchMedia(MOBILE_BREAKPOINT).matches
    })
    const [isClassesCollapsed, setIsClassesCollapsed] = useState<boolean>(() => {
        if (typeof window === "undefined") return false
        return window.matchMedia(MOBILE_BREAKPOINT).matches
    })

    useEffect(() => {
        if (typeof window === "undefined") return
        const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)

        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            const matches = "matches" in event ? event.matches : mediaQuery.matches
            setIsMobile(matches)
            if (matches) {
                setIsEventsCollapsed(true)
                setIsClassesCollapsed(true)
            } else {
                setIsEventsCollapsed(false)
                setIsClassesCollapsed(false)
            }
        }

        handleChange(mediaQuery)

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", handleChange as EventListener)
            return () => mediaQuery.removeEventListener("change", handleChange as EventListener)
        }

        mediaQuery.addListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
        return () => mediaQuery.removeListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
    }, [])

    return (
        <div className="dashboard-page flex-1 min-h-0 flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-shrink-0 w-full">
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

