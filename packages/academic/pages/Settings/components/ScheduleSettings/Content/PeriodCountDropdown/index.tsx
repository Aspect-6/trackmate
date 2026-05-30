import React from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useAcademicTerms, useSchedules } from "@/app/hooks/entities"
import { termScheduleHasClasses } from "@/app/hooks/entities/useSchedules"
import { useSettings, MIN_PERIODS, MAX_PERIODS } from "@/app/hooks/useSettings"
import { todayString } from "@shared/lib"
import type { ScheduleType } from "@/app/types"
import type { ScheduleSettings } from "@/pages/Settings/types"
import { GLOBAL } from "@/app/styles/colors"

const PeriodCountDropdown: React.FC<ScheduleSettings.Content.PeriodCountDropdown.Props> = ({ className }) => {
    const { periodCount, setPeriodCount } = useSettings()
    const { schedules, resetTermSchedule } = useSchedules()
    const { getActiveTermForDate } = useAcademicTerms()
    const { openModal } = useModal()

    const activeTerm = getActiveTermForDate(todayString())
    if (!activeTerm) {
        return (
            <div className={className}>
                <span style={{ color: GLOBAL.TEXT_TERTIARY }}>No active term</span>
            </div>
        )
    }

    const options = Array.from({ length: MAX_PERIODS - MIN_PERIODS + 1 }, (_, i) => i + MIN_PERIODS)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const next = Number(e.target.value)
        if (!Number.isFinite(next) || next === periodCount) return

        const activeTermId = activeTerm?.id
        const scheduleType: ScheduleType = activeTerm?.scheduleType ?? "semester"
        const existingTermSchedule = activeTermId
            ? schedules[scheduleType]?.terms?.[activeTermId]
            : undefined
        const hasClasses = existingTermSchedule
            ? termScheduleHasClasses(existingTermSchedule)
            : false

        if (hasClasses && activeTermId) {
            openModal("change-period-count", {
                newPeriodCount: next,
                activeTermId,
                scheduleType
            })
            return
        }

        setPeriodCount(next)
        if (activeTermId && existingTermSchedule && scheduleType !== "fixed-weekly") {
            resetTermSchedule(activeTermId, next, scheduleType)
        }
    }

    return (
        <div className={className}>
            <select
                value={periodCount}
                onChange={handleChange}
                className="app-select-dropdown"
            >
                {options.map(n => (
                    <option key={n} value={n}>{n}</option>
                ))}
            </select>
        </div>
    )
}

export default PeriodCountDropdown
