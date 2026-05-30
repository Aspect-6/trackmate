import React from "react"
import { useAcademicTerms, useClasses } from "@/app/hooks/entities"
import { useModal } from "@/app/contexts/ModalContext"
import { todayString } from "@shared/lib"
import { isAlternatingAB } from "@/app/lib/schedule"
import type { ScheduleSettings } from "@/pages/Settings/types"
import type { ScheduleType } from "@/app/types"
import type { ClassMigrationModalData } from "@/app/components/modals/ClassMigrationModal"
import type { ClassYearlongMigrationModalData } from "@/app/components/modals/ClassYearlongMigrationModal"
import { GLOBAL } from "@/app/styles/colors"

const ScheduleTypeDropdown: React.FC<ScheduleSettings.Content.ScheduleTypeDropdown.Props> = ({ className, children }) => {
    const { updateAcademicTerm, getActiveTermForDate } = useAcademicTerms()
    const { classes } = useClasses()
    const { openModal } = useModal()

    const today = todayString()
    const activeTerm = getActiveTermForDate(today)
    const currentType: ScheduleType = activeTerm?.scheduleType ?? "semester"

    // Switch schedule formats without erasing each one's data
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!activeTerm) return
        const next = e.target.value as ScheduleType
        if (next === currentType) return

        // When switching from alternating-ab-semester to alternating-ab, check for semester classes to turn year-long
        if (currentType === "alternating-ab-semester" && next === "alternating-ab") {
            const semesterClasses = classes.filter(c => {
                return c.termId === activeTerm.id && c.semesterId
            })

            if (semesterClasses.length > 0) {
                openModal("class-yearlong-migration", {
                    semesterClasses,
                    semesters: activeTerm.semesters,
                    onConfirm: () => updateAcademicTerm(activeTerm.id, { scheduleType: next }),
                } as ClassYearlongMigrationModalData)
                return
            }
        }

        // When switching away from either AB variant, check for year-long classes to turn into semester ones
        if (isAlternatingAB(currentType) && !isAlternatingAB(next)) {
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
