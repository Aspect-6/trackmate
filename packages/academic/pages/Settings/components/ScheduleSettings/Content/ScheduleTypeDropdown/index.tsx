import React from "react"
import { useAcademicTerms } from "@/app/hooks/entities"
import { todayString } from "@shared/lib"
import { getActiveTerm } from "@/app/lib/schedule"
import type { ScheduleSettings } from "@/pages/Settings/types"
import type { ScheduleType } from "@/app/types"
import { GLOBAL } from "@/app/styles/colors"

const ScheduleTypeDropdown: React.FC<ScheduleSettings.Content.ScheduleTypeDropdown.Props> = ({ className, children }) => {
    const { academicTerms, updateAcademicTerm } = useAcademicTerms()
    const today = todayString()
    const activeTerm = getActiveTerm(today, academicTerms)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!activeTerm) return
        updateAcademicTerm(activeTerm.id, { scheduleType: e.target.value as ScheduleType })
    }

    if (!activeTerm) {
        return (
            <div className={className}>
                <span style={{ color: GLOBAL.TEXT_TERTIARY }}>No active term</span>
            </div>
        )
    }

    return (
        <div className={className}>
            <select
                value={activeTerm.scheduleType ?? "alternating-ab"}
                onChange={handleChange}
                className="app-select-dropdown"
            >
                {children}
            </select>
        </div>
    )
}

export default ScheduleTypeDropdown