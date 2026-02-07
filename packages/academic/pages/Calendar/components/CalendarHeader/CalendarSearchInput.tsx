import React from "react"
import { Search } from "lucide-react"
import { CALENDAR } from "@/app/styles/colors"

interface CalendarSearchInputProps {
    value: string
    onChange: (value: string) => void
    fullWidth?: boolean
    className?: string
    onFocus?: () => void
}

const CalendarSearchInput: React.FC<CalendarSearchInputProps> = ({ value, onChange, fullWidth = false, className = "", onFocus }) => {
    return (
        <div className={`relative ${fullWidth ? "w-full" : ""} ${className}`.trim()}>
            <Search
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: CALENDAR.TEXT_TERTIARY }}
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                placeholder="Search anything"
                className={`pl-8 pr-3 py-1.5 text-sm rounded-lg ${fullWidth ? "w-full" : "w-40"}`}
                style={{

                    backgroundColor: CALENDAR.BACKGROUND_SECONDARY,
                    border: `1px solid ${CALENDAR.BORDER_PRIMARY}`,
                    color: CALENDAR.TEXT_PRIMARY,
                    outline: "none"
                }}
            />
        </div>
    )
}

export default CalendarSearchInput
