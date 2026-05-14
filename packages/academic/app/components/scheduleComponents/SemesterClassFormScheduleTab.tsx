import React, { useEffect } from "react"
import { useAcademicTerms } from "@/app/hooks/entities"
import type { ClassFormScheduleTabProps } from "@/app/contexts/ScheduleComponentsContext"
import {
    ModalLabel,
    ModalSelectInput,
    ModalSelectInputOption,
} from "@shared/components/modal"
import { DASHBOARD } from "@/app/styles/colors"

/**
 * Class form Settings tab for the semester schedule.
 *
 * Every class belongs to exactly one semester (Fall xor Spring) since the two
 * semesters have completely independent rows. There is no "year-long" option.
 * Default selection is the term's Fall semester.
 */
const SemesterClassFormScheduleTab: React.FC<ClassFormScheduleTabProps> = ({
    formData,
    setFormData,
    focusColor,
}) => {
    const { academicTerms } = useAcademicTerms()
    const selectedTerm = academicTerms.find(term => term.id === formData.termId)

    const fallSemesterId = selectedTerm?.semesters.find(s => s.name === "Fall")?.id ?? ""

    const handleTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextTermId = e.target.value
        const nextTerm = academicTerms.find(t => t.id === nextTermId)
        const defaultFallId = nextTerm?.semesters.find(s => s.name === "Fall")?.id ?? ""
        setFormData({
            ...formData,
            termId: nextTermId,
            semesterId: nextTermId ? defaultFallId : ""
        })
    }

    // If a term is selected but no semester is, fall back to Fall so the
    // class always lands in exactly one semester (semester format has no
    // year-long concept).
    useEffect(() => {
        if (formData.termId && !formData.semesterId && fallSemesterId) {
            setFormData({ ...formData, semesterId: fallSemesterId })
        }
    }, [formData, fallSemesterId, setFormData])

    return (
        <>
            <div>
                <ModalLabel>Academic Term (Optional)</ModalLabel>
                <ModalSelectInput
                    value={formData.termId}
                    onChange={handleTermChange}
                    focusColor={focusColor}
                >
                    <ModalSelectInputOption value="">No Term Assigned</ModalSelectInputOption>
                    {academicTerms.map(term => (
                        <ModalSelectInputOption key={term.id} value={term.id}>
                            {term.name}
                        </ModalSelectInputOption>
                    ))}
                </ModalSelectInput>
            </div>
            {selectedTerm && selectedTerm.semesters.length > 0 && (
                <div>
                    <ModalLabel>Semester</ModalLabel>
                    <ModalSelectInput
                        value={formData.semesterId || fallSemesterId}
                        onChange={e => setFormData({ ...formData, semesterId: e.target.value })}
                        focusColor={focusColor}
                    >
                        {selectedTerm.semesters.map(sem => (
                            <ModalSelectInputOption key={sem.id} value={sem.id}>
                                {sem.name}
                            </ModalSelectInputOption>
                        ))}
                    </ModalSelectInput>
                </div>
            )}
            <p className="text-xs" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
                Each class will appear in the selected semester&apos;s schedule.
            </p>
        </>
    )
}

export default SemesterClassFormScheduleTab
