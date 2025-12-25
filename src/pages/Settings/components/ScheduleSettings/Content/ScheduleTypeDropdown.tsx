import React from 'react'

interface ScheduleTypeDropdownProps {
    className?: string
}

const ScheduleTypeDropdown: React.FC<ScheduleTypeDropdownProps> = ({ className }) => {
    return (
        <div className={className}>
            <select
                value="alternating-ab"
                className="settings-select"
            >
                <option value="alternating-ab">Alternating A/B Days</option>
            </select>
        </div>
    )
}

export default ScheduleTypeDropdown
