import React, { useState } from 'react'
import type { CalendarBody } from '@/pages/Calendar/types'
import { CALENDAR } from '@/app/styles/colors'

const EventItem: React.FC<CalendarBody.SidePanel.Body.EventList.EventItemProps> = ({ event, onEventClick }) => {
    const [isHovered, setIsHovered] = useState(false)

    const formatEventTime = (start: string | null, end: string | null) => {
        if (!start && !end) return 'All day'
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
            onClick={() => onEventClick(event.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="calendar-side-panel-item p-3 rounded-lg cursor-pointer transition-colors"
            style={{ 
                borderLeft: `4px solid ${event.color}`, 
                backgroundColor: isHovered ? CALENDAR.ITEM_BG_HOVER : CALENDAR.ITEM_BG 
            }}
        >
            <div className="font-semibold" style={{ color: CALENDAR.SIDE_PANEL_TEXT }}>{event.title}</div>
            <div className="text-sm" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>{formatEventTime(event.startTime, event.endTime)}</div>
            {event.description && <div className="text-xs mt-1" style={{ color: CALENDAR.SIDE_PANEL_DIM_TEXT }}>{event.description}</div>}
        </div>
    )
}

export default React.memo(EventItem)
