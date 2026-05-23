import React from "react"
import { useAcademicTerms, useClasses } from "@/app/hooks/entities"
import { useModal } from "@/app/contexts/ModalContext"
import { todayString } from "@shared/lib"
import { getActiveTerm } from "@/app/lib/schedule"
import type { ScheduleSettings } from "@/pages/Settings/types"
import type { ScheduleType } from "@/app/types"
import type { ClassMigrationModalData } from "@/app/components/modals/ClassMigrationModal"
import { GLOBAL } from "@/app/styles/colors"

const ScheduleTypeDropdown: React.FC<ScheduleSettings.Content.ScheduleTypeDropdown.Props> = ({ className, children }) => {
    const { academicTerms, updateAcademicTerm } = useAcademicTerms()
    const { classes } = useClasses()
    const { openModal } = useModal()

    const today = todayString()
    const activeTerm = getActiveTerm(today, academicTerms)
    const currentType: ScheduleType = activeTerm?.scheduleType ?? "alternating-ab"

    // Switch schedule formats without erasing each one's data
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!activeTerm) return
        const next = e.target.value as ScheduleType
        if (next === currentType) return

        // When switching away from alternating-ab, check for year-long classes to turn into semester ones
        if (currentType === "alternating-ab" && next !== "alternating-ab") {
            const orphanedClasses = classes.filter(c => {
                return c.termId === activeTerm.id && !c.semesterId
            })

            if (orphanedClasses.length > 0) {
                openModal("class-migration", {
                    orphanedClasses,
                    semesters: activeTerm.semesters,
                    onConfirm: () => updateAcademicTerm(activeTerm.id, { scheduleType: next }),
                } as ClassMigrationModalData)
                return
            }
        }

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
