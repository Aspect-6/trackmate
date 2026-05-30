import React from "react"
import type { TermSettings } from "@/pages/Settings/types"
import { SETTINGS, GLOBAL } from "@/app/styles/colors"
import { formatDate } from "@shared/lib"

const TermItemBodySemester: React.FC<TermSettings.Content.TermList.TermItem.Body.SemesterProps> = ({
    name,
    startDate,
    endDate,
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
                <div>{formatDate("medium", startDate)} — {formatDate("medium", endDate)}</div>
            </div>
        </div>
    )
}

export default TermItemBodySemester
