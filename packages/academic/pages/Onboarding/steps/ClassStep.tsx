import React, { useEffect } from "react"
import { useToast } from "@shared/contexts/ToastContext"
import { useClasses, useAcademicTerms } from "@/app/hooks/entities"
import { useFormFields } from "@/app/hooks/ui/useFormFields"
import {
    ModalLabel,
    ModalTextInput,
    ModalSubmitButton,
    ModalColorPicker,
} from "@shared/components/modal"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface ClassStepProps {
    onNext: () => void
}

export const ClassStep: React.FC<ClassStepProps> = ({ onNext }) => {
    const { addClass } = useClasses()
    const { academicTerms } = useAcademicTerms()
    const { showToast } = useToast()

    const focusColor = MODALS.CLASS.PRIMARY_BG
    const defaultTermId = academicTerms.length > 0 ? academicTerms[0]!.id : ""

    const { formData, setField, field } = useFormFields({
        name: "",
        color: MODALS.CLASS.COLORS[0]!,
        teacherName: "",
        roomNumber: "",
        termId: defaultTermId,
    })

    useEffect(() => {
        if (!formData.termId && academicTerms.length > 0) {
            setField("termId", academicTerms[0]!.id)
        }
    }, [academicTerms, formData.termId, setField])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData.name.trim()) {
            showToast("Please enter a class name", "error")
            return
        }

        const selectedTerm = academicTerms.find(t => t.id === formData.termId)
        const defaultSemesterId = selectedTerm?.semesters?.[0]?.id

        const classData = {
            name: formData.name,
            color: formData.color,
            teacherName: formData.teacherName,
            roomNumber: formData.roomNumber,
            termId: formData.termId || undefined,
            semesterId: defaultSemesterId || undefined,
        }

        const success = addClass({ ...classData, isArchived: false })
        if (success) {
            onNext()
        }
    }

    return (
        <div className="flex flex-col animate-slide-up-fade">
            <h1 className="text-3xl font-bold mb-2" style={{ color: MODALS.CLASS.HEADING }}>
                Add your first class
            </h1>
            <p className="text-lg mb-8" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                Now let's add a class to the term you just created.
            </p>

            <div
                className="p-6 rounded-2xl"
                style={{
                    backgroundColor: GLOBAL.BACKGROUND_SECONDARY,
                    border: `1px solid ${GLOBAL.BORDER_PRIMARY}`
                }}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <ModalLabel>Class Name</ModalLabel>
                        <ModalTextInput
                            {...field("name")}
                            placeholder="World History"
                            focusColor={focusColor}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <ModalLabel>Instructor Name (Optional)</ModalLabel>
                            <ModalTextInput
                                {...field("teacherName")}
                                placeholder="Ms. Johnson"
                                focusColor={focusColor}
                            />
                        </div>
                        <div>
                            <ModalLabel>Room Number (Optional)</ModalLabel>
                            <ModalTextInput
                                {...field("roomNumber")}
                                placeholder="101"
                                focusColor={focusColor}
                            />
                        </div>
                    </div>
                    
                    <ModalColorPicker
                        colors={MODALS.CLASS.COLORS}
                        value={formData.color}
                        onChange={(color) => setField("color", color)}
                    />

                    <div className="flex justify-end pt-4">
                        <ModalSubmitButton
                            type="submit"
                            bgColor={MODALS.CLASS.PRIMARY_BG}
                            bgColorHover={MODALS.CLASS.PRIMARY_BG_HOVER}
                            textColor={MODALS.CLASS.PRIMARY_TEXT}
                        >
                            Next Step
                        </ModalSubmitButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
