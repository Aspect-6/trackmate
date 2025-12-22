import React from 'react'
import type { TodaysClasses } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'

const NoSchool: React.FC<TodaysClasses.Body.NoSchoolProps> = ({ noSchool }) => {
    return (
        <div className="text-center py-8">
            <p className="font-semibold text-lg mb-1" style={{ color: DASHBOARD.NO_SCHOOL_TEXT }}>No School</p>
            <p style={{ color: DASHBOARD.TEXT_GRAY_400 }}>{noSchool.name}</p>
        </div>
    )
}

export default NoSchool
