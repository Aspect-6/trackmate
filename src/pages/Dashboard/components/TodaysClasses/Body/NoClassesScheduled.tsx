import React from 'react'
import type { TodaysClasses } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'

const NoClassesScheduled: React.FC<TodaysClasses.Body.NoClassesScheduledProps> = () => {
    return (
        <p className="text-center py-4" style={{ color: DASHBOARD.TEXT_GRAY_500 }}>
            No classes scheduled for today.
        </p>
    )
}

export default NoClassesScheduled
