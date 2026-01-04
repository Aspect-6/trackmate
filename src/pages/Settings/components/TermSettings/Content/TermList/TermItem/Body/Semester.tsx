import React from 'react'
import type { TermSettings } from '@/pages/Settings/types'
import { SETTINGS, GLOBAL } from '@/app/styles/colors'
import { formatMediumDate } from '@/app/lib/utils'

const TermItemBodySemester: React.FC<TermSettings.Content.TermList.TermItem.Body.SemesterProps> = ({
    name,
    startDate,
    endDate,
    quarters
}) => {
    return (
        <div
            className="p-3 rounded-lg border border-transparent"
            style={{ backgroundColor: SETTINGS.BACKGROUND_QUATERNARY }}
        >
            <div className="text-[10px] uppercase tracking-wider font-bold mb-1.5" style={{ color: GLOBAL.TEXT_TERTIARY }}>
                {name} Semester
            </div>
            <div className="text-sm font-medium space-y-1" style={{ color: SETTINGS.TEXT_SECONDARY }}>
                <div>{formatMediumDate(startDate)} — {formatMediumDate(endDate)}</div>
                {quarters && quarters.length > 0 && (
                    <div className="text-xs opacity-60 space-y-0.5 pt-1">
                        {quarters.map(quarter => (
                            <div key={quarter.id}>
                                {quarter.name}: {formatMediumDate(quarter.startDate)} — {formatMediumDate(quarter.endDate)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TermItemBodySemester
