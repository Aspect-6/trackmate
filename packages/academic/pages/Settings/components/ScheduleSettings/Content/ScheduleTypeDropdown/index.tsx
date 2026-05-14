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
    const currentType: ScheduleType = activeTerm?.scheduleType ?? "alternating-ab"

    // Each schedule format is stored under its own top-level key on the
    // schedules doc, so switching formats just changes which block the
    // renderer reads from — no existing data is lost. If the user switches
    // back later, their previous layout is still there.
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!activeTerm) return
        const next = e.target.value as ScheduleType
        if (next === currentType) return
        updateAcademicTerm(activeTerm.id, { scheduleType: next })
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
                value={currentType}
                onChange={handleChange}
                className="app-select-dropdown"
            >
                {children}
            </select>
        </div>
    )
}

export default ScheduleTypeDropdown
