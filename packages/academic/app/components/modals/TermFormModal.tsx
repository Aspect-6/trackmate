import React, { useEffect } from "react"
import { AcademicTerm } from "@/app/types"
import { useAcademicTerms } from "@/app/hooks/entities"
import { useFormFields } from "@/app/hooks/ui/useFormFields"
import { useToast } from "@shared/contexts/ToastContext"
import { generateId } from "@shared/lib"
import { GLOBAL, MODALS } from "@/app/styles/colors"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalLabel,
    ModalTextInput,
    ModalDateInput,
    ModalCancelButton,
    ModalSubmitButton,
} from "@shared/components/modal"

interface TermFormModalProps {
    onClose: () => void
    termId?: string // If provided, modal is in edit mode
}

export const TermFormModal: React.FC<TermFormModalProps> = ({ onClose, termId }) => {
    const { academicTerms, addAcademicTerm, updateAcademicTerm } = useAcademicTerms()
    const { showToast } = useToast()

    const isEditMode = !!termId
    const existingTerm = isEditMode ? academicTerms.find(t => t.id === termId) : null
    const fallSemester = existingTerm?.semesters?.find(s => s.name === "Fall")
    const springSemester = existingTerm?.semesters?.find(s => s.name === "Spring")

    const focusColor = MODALS.ACADEMICTERM.PRIMARY_BG

    // Form state
    const { formData, setFormData, field } = useFormFields({
        name: "",
        termStart: "",
        termEnd: "",
        fallEnd: "",
        springStart: "",
    })

    // Populate form with existing term data in edit mode (only on mount)
    useEffect(() => {
        if (isEditMode && existingTerm) {
            setFormData({
                name: existingTerm.name || "",
                termStart: existingTerm.startDate || "",
                termEnd: existingTerm.endDate || "",
                fallEnd: fallSemester?.endDate || "",
                springStart: springSemester?.startDate || "",
            })
        }
    }, [existingTerm, fallSemester, springSemester, isEditMode, setFormData])

    if (isEditMode && !existingTerm) return null

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { name, termStart, termEnd, fallEnd, springStart } = formData

        if (!name || !termStart || !termEnd) {
            showToast("All fields are required.", "error")
            return
        }
        if (!fallEnd || !springStart) {
            showToast("All fields are required.", "error")
            return
        }

        // Check for duplicate name
        if (academicTerms.some(t => (isEditMode ? t.id !== termId : true) && t.name.toLowerCase() === name.trim().toLowerCase())) {
            showToast("A term with this name already exists.", "error")
            return
        }

        const newStart = new Date(termStart)
        const newEnd = new Date(termEnd)

        const hasOverlap = academicTerms.some(t => {
            if (isEditMode && t.id === termId) return false
            const existingStart = new Date(t.startDate)
            const existingEnd = new Date(t.endDate)
            return (
                (newStart >= existingStart && newStart <= existingEnd) ||
                (newEnd >= existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)
            )
        })

        if (hasOverlap) {
            showToast("This term overlaps with an existing term.", "error")
            return
        }

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
            scheduleType: existingTerm?.scheduleType ?? "semester",
            hasAutoArchived: existingTerm?.hasAutoArchived ?? (newEnd < new Date()),
            semesters: [
                { id: fallSemester?.id || generateId(), name: "Fall", startDate: termStart, endDate: fallEnd },
                { id: springSemester?.id || generateId(), name: "Spring", startDate: springStart, endDate: termEnd }
            ]
        }


        if (isEditMode) {
            updateAcademicTerm(termId, termData)
            showToast("Academic term updated!", "success")
        } else {
            addAcademicTerm(termData)
            showToast("Academic term added!", "success")
        }
        onClose()
    }

    return (
        <ModalContainer className="overflow-y-auto custom-scrollbar max-h-[90vh]">
            <ModalHeader color={MODALS.ACADEMICTERM.HEADING}>
                {isEditMode ? "Edit Academic Term" : "Add Academic Term"}
            </ModalHeader>

            {!isEditMode && (
                <>
                    <div className="text-sm my-4 text-left" style={{ color: GLOBAL.TEXT_TERTIARY }}>
                        Add a term with Fall and Spring semesters.
                    </div>
                    <div className="width-full"><div className="border-t mb-4" style={{ borderColor: GLOBAL.BORDER_PRIMARY }}></div></div>
                </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <ModalLabel>Term Name</ModalLabel>
                    <ModalTextInput
                        {...field("name")}
                        placeholder="2025-2026"
                        focusColor={focusColor}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
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

                <ModalFooter>
                    <ModalCancelButton onClick={onClose} />
                    <ModalSubmitButton
                        type="submit"
                        bgColor={MODALS.ACADEMICTERM.PRIMARY_BG}
                        bgColorHover={MODALS.ACADEMICTERM.PRIMARY_BG_HOVER}
                        textColor={MODALS.ACADEMICTERM.PRIMARY_TEXT}
                    >
                        {isEditMode ? "Save Changes" : "Add Term"}
                    </ModalSubmitButton>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}
