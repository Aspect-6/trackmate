import React from 'react'
import { DASHBOARD } from '@/app/styles/colors'

const NoUpcomingAssignments: React.FC = () => {
    return (
        <div className="text-center py-6">
            <p className="pt-4" style={{ color: DASHBOARD.TEXT_TERTIARY }}>No upcoming assignments to display.</p>
        </div>
    )
}

export default NoUpcomingAssignments
