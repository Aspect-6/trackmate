import React, { useState } from 'react'
import type { CalendarHeader } from '@/pages/Calendar/types'
import { ChevronLeft } from 'lucide-react'
import { CALENDAR } from '@/app/styles/colors'

const PrevButton: React.FC<CalendarHeader.CalendarHeaderButtonProps> = ({ onClick }) => {
    const [hovered, setHovered] = useState(false)
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="calendar-header-btn p-3 md:p-2 rounded-full transition touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
            style={{ backgroundColor: hovered ? CALENDAR.HEADER_BUTTON_HOVER : undefined }}
            aria-label="Previous Month"
        >
            <ChevronLeft className="w-7 h-7 md:w-6 md:h-6" style={{ color: CALENDAR.HEADER_ICON }} />
        </button>
    )
}

export default PrevButton
