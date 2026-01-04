import React from 'react'
import type { TodaysEvents } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'

const EventItem: React.FC<TodaysEvents.Body.EventList.EventItemProps> = ({ event, onClick }) => {
    const formatEventTime = (start: string | null, end: string | null): string => {
        if (!start && !end) return 'All Day'
        if (start && !end) {
            return new Date(`2000-01-01T${start}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        }
        if (!start && end) {
            return `Until ${new Date(`2000-01-01T${end}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
        }
        const s = new Date(`2000-01-01T${start}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        const e = new Date(`2000-01-01T${end}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        return `${s} - ${e}`
    }

    return (
        <div
            onClick={onClick}
            className="flex items-center p-3 rounded-lg border mb-2 shadow-md cursor-pointer transition-colors"
            style={{
                border: `1px solid ${DASHBOARD.BORDER_PRIMARY}`,
                borderLeft: `4px solid ${event.color}`,
                backgroundColor: DASHBOARD.BACKGROUND_PRIMARY,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = DASHBOARD.BACKGROUND_TERTIARY}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = DASHBOARD.BACKGROUND_PRIMARY}
        >
            <div className="flex-grow">
                <p className="text-sm font-semibold" style={{ color: DASHBOARD.TEXT_PRIMARY }}>{event.title}</p>
                <p className="text-xs" style={{ color: DASHBOARD.TEXT_SECONDARY }}>
                    {formatEventTime(event.startTime, event.endTime)}
                </p>
            </div>
        </div>
    )
}

export default EventItem
