import React from 'react'
import { useHover } from '@/app/hooks/useHover'
import { formatEventTimeRange } from '@/app/lib/utils'
import type { TodaysEvents } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'

const EventItem: React.FC<TodaysEvents.Body.EventList.EventItemProps> = ({ event, onClick }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <div
            onClick={onClick}
            className="flex items-center p-3 rounded-lg border mb-2 cursor-pointer transition-colors"
            style={{
                borderColor: DASHBOARD.BORDER_PRIMARY,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                borderLeft: `4px solid ${event.color}`,
                backgroundColor: isHovered ? DASHBOARD.BACKGROUND_TERTIARY : DASHBOARD.BACKGROUND_SECONDARY
            }}
            {...hoverProps}
        >
            <div className="flex-grow">
                <p className="text-sm font-semibold" style={{ color: DASHBOARD.TEXT_PRIMARY }}>{event.title}</p>
                <p className="text-xs" style={{ color: DASHBOARD.TEXT_SECONDARY }}>
                    {formatEventTimeRange(event.startTime, event.endTime)}
                </p>
            </div>
        </div>
    )
}

export default EventItem
