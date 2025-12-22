import React, { useEffect, useState } from 'react'
import { useApp } from '@/app/context/AppContext'
import { todayString } from '@/app/lib/utils'
import AssignmentCard from '@/pages/Dashboard/components/AssignmentCard'
import TodaysEvents from '@/pages/Dashboard/components/TodaysEvents'
import TodaysClasses from '@/pages/Dashboard/components/TodaysClasses/'
import { DASHBOARD } from '@/app/styles/colors'
import '@/pages/Dashboard/index.css'

const MOBILE_BREAKPOINT = '(max-width: 767px)'

const Dashboard: React.FC = () => {
    const { assignments, events, getClassesForDate, getClassById, openModal, noSchool } = useApp()

    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false
        return window.matchMedia(MOBILE_BREAKPOINT).matches
    })
    const [isEventsCollapsed, setIsEventsCollapsed] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false
        return window.matchMedia(MOBILE_BREAKPOINT).matches
    })
    const [isClassesCollapsed, setIsClassesCollapsed] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false
        return window.matchMedia(MOBILE_BREAKPOINT).matches
    })

    const today = todayString()

    // Check for No School
    const currentNoSchool = noSchool.find(ns => today >= ns.startDate && today <= ns.endDate)

    useEffect(() => {
        if (typeof window === 'undefined') return
        const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)

        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            const matches = 'matches' in event ? event.matches : mediaQuery.matches
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

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange as EventListener)
            return () => mediaQuery.removeEventListener('change', handleChange as EventListener)
        }

        mediaQuery.addListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
        return () => mediaQuery.removeListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
    }, [])

    // Filter Assignments
    const activeAssignments = assignments
        .filter(a => a.status === 'To Do' || a.status === 'In Progress')
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

    // Filter Events
    const todaysEvents = events.filter(event => event.date === today).sort((a, b) => {
        if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime)
        if (a.startTime) return -1
        if (b.startTime) return 1
        return 0
    })

    // Get Classes
    const todaysClasses = getClassesForDate(today)

    const assignmentsToShow = activeAssignments.slice(0, 3)

    return (
        <div className="dashboard-page flex-1 min-h-0 flex flex-col gap-6 w-full overflow-x-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-shrink-0 w-full">
                <TodaysEvents
                    events={todaysEvents}
                    onEventClick={(id) => openModal('edit-event', id)}
                    isMobile={isMobile}
                    isCollapsed={isEventsCollapsed}
                    onToggleCollapse={() => setIsEventsCollapsed((prev) => !prev)}
                />

                <TodaysClasses
                    classIds={todaysClasses}
                    noSchool={currentNoSchool}
                    getClassById={getClassById}
                    openModal={openModal}
                    isMobile={isMobile}
                    isCollapsed={isClassesCollapsed}
                    onToggleCollapse={() => setIsClassesCollapsed((prev) => !prev)}
                />
            </div>

            {/* Assignment List */}
            <div
                className="border p-6 rounded-xl upcoming-assignments-card flex-1 min-h-0"
                style={{
                    backgroundColor: DASHBOARD.MODULE_BG,
                    borderColor: DASHBOARD.MODULE_BORDER,
                    boxShadow: DASHBOARD.MODULE_SHADOW
                }}
            >
                <h2 className="text-xl font-bold mb-4" style={{ color: DASHBOARD.ASSIGNMENT_HEADING_TEXT }}>Upcoming Assignments</h2>
                <div className="space-y-3 upcoming-assignments-list">
                    {assignmentsToShow.length === 0 ? (
                        <div className="text-center py-8">
                            <p style={{ color: DASHBOARD.TEXT_GRAY_500 }}>All tracked assignments are marked as done! Great job.</p>
                        </div>
                    ) : (
                        assignmentsToShow.map(assignment => (
                            <AssignmentCard key={assignment.id} assignment={assignment} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
