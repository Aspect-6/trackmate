import React from 'react'
import type { TodaysEvents } from '@/pages/Dashboard/types'
import { ChevronDown } from 'lucide-react'
import { DASHBOARD } from '@/app/styles/colors'

const TodaysEventsHeader: React.FC<TodaysEvents.HeaderProps> = ({ isMobile, isCollapsed, onToggleCollapse }) => {
    const headerProps = isMobile ? {
        role: 'button' as const,
        tabIndex: 0,
        onClick: onToggleCollapse,
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onToggleCollapse?.()
            }
        }
    } : {}

    return (
        <div
            className={`flex items-center justify-between pb-3 mb-3 ${isMobile ? 'cursor-pointer' : ''}`}
            aria-expanded={!isCollapsed}
            {...headerProps}
        >
            <div className="flex items-center gap-2">
                {isMobile && (
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`}
                        style={{ color: DASHBOARD.EVENT_HEADING_TEXT }}
                        aria-hidden="true"
                    />
                )}
                <h2 className="text-xl font-bold" style={{ color: DASHBOARD.EVENT_HEADING_TEXT }}>Today's Events</h2>
            </div>
        </div>
    )
}

export default TodaysEventsHeader
