import React from "react"
import { useAcademicTerms } from "@/app/hooks/entities"
import type { ClassFormScheduleTabProps } from "@/app/contexts/ScheduleComponentsContext"
import {
    ModalLabel,
    ModalSelectInput,
    ModalSelectInputOption,
} from "@shared/components/modal"
import { DASHBOARD } from "@/app/styles/colors"

const AlternatingABClassFormScheduleTab: React.FC<ClassFormScheduleTabProps> = ({
    formData,
    setFormData,
    focusColor,
}) => {
    const { academicTerms } = useAcademicTerms()
    const selectedTerm = academicTerms.find(term => term.id === formData.termId)

    const handleTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            termId: e.target.value,
            semesterId: ""
        })
    }

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
                    <ModalLabel>Semester (Optional)</ModalLabel>
                    <ModalSelectInput
                        value={formData.semesterId}
                        onChange={e => setFormData({ ...formData, semesterId: e.target.value })}
                        focusColor={focusColor}
                    >
                        <ModalSelectInputOption value="">Year-long (Both Semesters)</ModalSelectInputOption>
                        {selectedTerm.semesters.map(sem => (
                            <ModalSelectInputOption key={sem.id} value={sem.id}>
                                {sem.name}
                            </ModalSelectInputOption>
                        ))}
                    </ModalSelectInput>
                </div>
            )}
            <p className="text-xs" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
                Classes added to a year-long term will occur every other day, while classes marked for a semester will occur every day for that semester.
            </p>
        </>
    )
}

export default AlternatingABClassFormScheduleTab
