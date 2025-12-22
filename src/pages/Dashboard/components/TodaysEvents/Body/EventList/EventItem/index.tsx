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
            className="flex items-center p-3 rounded-lg border mb-2 cursor-pointer bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-colors"
            style={{
                borderColor: DASHBOARD.MODULE_BORDER,
                boxShadow: DASHBOARD.CARD_SHADOW,
                borderLeft: `4px solid ${event.color}`,
                '--card-bg': DASHBOARD.EVENT_ITEM_BG,
                '--card-hover-bg': DASHBOARD.EVENT_ITEM_HOVER_BG
            } as React.CSSProperties}
        >
            <div className="flex-grow">
                <p className="text-sm font-semibold" style={{ color: DASHBOARD.TEXT_WHITE }}>{event.title}</p>
                <p className="text-xs" style={{ color: DASHBOARD.TEXT_GRAY_400 }}>
                    {formatEventTime(event.startTime, event.endTime)}
                </p>
            </div>
        </div>
    )
}

export default EventItem
