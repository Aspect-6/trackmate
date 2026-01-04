import React from 'react'
import type { TodaysEvents } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'
import TodaysEventsHeader from './TodaysEventsHeader'
import TodaysEventsBody, { EventList, NoEventsScheduled } from './Body'

const TodaysEvents: React.FC<TodaysEvents.Props> = ({
    events,
    onEventClick,
    isMobile,
    isCollapsed,
    onToggleCollapse
}) => {
    const hasEvents = events.length > 0

    return (
        <div
            className="p-6 rounded-xl shadow-sm sm:shadow-md"
            style={{
                backgroundColor: DASHBOARD.BACKGROUND_PRIMARY,
                border: `1px solid ${DASHBOARD.BORDER_PRIMARY}`,
                paddingBottom: isMobile && isCollapsed ? '0' : undefined
            }}
        >
            <TodaysEventsHeader
                isMobile={isMobile}
                isCollapsed={isCollapsed}
                onToggleCollapse={onToggleCollapse}
            />

            <TodaysEventsBody isMobile={isMobile} isCollapsed={isCollapsed}>
                {hasEvents ? (
                    <EventList
                        events={events}
                        onEventClick={onEventClick}
                    />
                ) : (
                    <NoEventsScheduled />
                )}
            </TodaysEventsBody>
        </div>
    )
}

export default TodaysEvents
