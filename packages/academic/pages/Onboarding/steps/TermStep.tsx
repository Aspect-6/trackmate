import React from "react"
import { useToast } from "@shared/contexts/ToastContext"
import { useAcademicTerms } from "@/app/hooks/entities"
import { useFormFields } from "@/app/hooks/ui/useFormFields"
import { AcademicTerm } from "@/app/types"
import { generateId } from "@shared/lib"
import {
    ModalLabel,
    ModalTextInput,
    ModalDateInput,
    ModalSubmitButton,
} from "@shared/components/modal"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface TermStepProps {
    onNext: () => void
}

export const TermStep: React.FC<TermStepProps> = ({ onNext }) => {
    const { addAcademicTerm } = useAcademicTerms()
    const { showToast } = useToast()

    const focusColor = MODALS.ACADEMICTERM.PRIMARY_BG

    // Form state
    const { formData, field } = useFormFields({
        name: "",
        termStart: "",
        termEnd: "",
        fallEnd: "",
        springStart: "",
    })

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { name, termStart, termEnd, fallEnd, springStart } = formData

        if (!name || !termStart || !termEnd || !fallEnd || !springStart) {
            showToast("All fields are required.", "error")
            return
        }

        const newEnd = new Date(termEnd)

        if (termStart >= termEnd) {
            showToast("Year start must be before end.", "error")
            return
        }

        if (termStart >= fallEnd) { showToast("Year start must be before Fall end.", "error"); return }
        if (fallEnd >= springStart) { showToast("Fall end must be before Spring start.", "error"); return }
        if (springStart >= termEnd) { showToast("Spring start must be before year end.", "error"); return }

        let termData: Omit<AcademicTerm, "id"> = {
            name,
            startDate: termStart,
            endDate: termEnd,
            scheduleType: "semester",
            hasAutoArchived: (newEnd < new Date()),
            semesters: [
                { id: generateId(), name: "Fall", startDate: termStart, endDate: fallEnd },
                { id: generateId(), name: "Spring", startDate: springStart, endDate: termEnd }
            ]
        }

        addAcademicTerm(termData)
        showToast("Academic term added!", "success")
        onNext()
    }

    return (
        <div className="flex flex-col animate-slide-up-fade">
            <h1 className="text-3xl font-bold mb-2" style={{ color: MODALS.ACADEMICTERM.HEADING }}>
                Welcome to TrackMate!
            </h1>
            <p className="text-lg mb-8" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                Let's get started by creating your first academic term. 
                This usually represents a full school year.
            </p>

            <div className="p-6 rounded-2xl border" style={{ backgroundColor: GLOBAL.BACKGROUND_SECONDARY, borderColor: GLOBAL.BORDER_PRIMARY }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <ModalLabel>Term Name</ModalLabel>
                        <ModalTextInput
                            {...field("name")}
                            placeholder="2025-2026"
                            focusColor={focusColor}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <ModalLabel>Year Start</ModalLabel>
                            <ModalDateInput
                                {...field("termStart")}
                                focusColor={focusColor}
                            />
                        </div>
                        <div>
                            <ModalLabel>Year End</ModalLabel>
                            <ModalDateInput
                                {...field("termEnd")}
                                focusColor={focusColor}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col h-full">
                            <ModalLabel>Fall Semester End</ModalLabel>
                            <div className="mt-auto">
                                <ModalDateInput {...field("fallEnd")} focusColor={focusColor} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.BODY }}>Starts on Year Start</span>
                            </div>
                        </div>
                        <div className="flex flex-col h-full">
                            <ModalLabel>Spring Semester Start</ModalLabel>
                            <div className="mt-auto">
                                <ModalDateInput {...field("springStart")} focusColor={focusColor} />
                                <span className="text-xs opacity-50 block mt-1" style={{ color: MODALS.BASE.BODY }}>Ends on Year End</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <ModalSubmitButton
                            type="submit"
                            bgColor={MODALS.ACADEMICTERM.PRIMARY_BG}
                            bgColorHover={MODALS.ACADEMICTERM.PRIMARY_BG_HOVER}
                            textColor={MODALS.ACADEMICTERM.PRIMARY_TEXT}
                        >
                            Next Step
                        </ModalSubmitButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
