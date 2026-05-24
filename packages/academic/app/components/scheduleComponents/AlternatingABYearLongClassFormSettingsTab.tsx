import React from "react"
import { useAcademicTerms } from "@/app/hooks/entities"
import type { ClassFormSettingsTabProps } from "@/app/contexts/ScheduleComponentsContext"
import {
    ModalLabel,
    ModalSelectInput,
    ModalSelectInputOption,
} from "@shared/components/modal"
import { DASHBOARD } from "@/app/styles/colors"

const AlternatingABYearLongClassFormSettingsTab: React.FC<ClassFormSettingsTabProps> = ({
    formData,
    setFormData,
    focusColor,
}) => {
    const { academicTerms } = useAcademicTerms()

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
            <p className="text-xs" style={{ color: DASHBOARD.TEXT_TERTIARY }}>
                All classes on this schedule are year-long and appear on every A/B rotation.
            </p>
        </>
    )
}

export default AlternatingABYearLongClassFormSettingsTab
