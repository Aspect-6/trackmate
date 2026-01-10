import React from 'react'
import { CALENDAR } from '@/app/styles/colors'

const NoClassesScheduled: React.FC = () => {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2" style={{ color: CALENDAR.CLASS_HEADING_TEXT }}>Classes</h4>
            <p className="text-sm italic" style={{ color: CALENDAR.TEXT_SECONDARY }}>
                No classes scheduled
            </p>
        </div>
    )
}

export default NoClassesScheduled
