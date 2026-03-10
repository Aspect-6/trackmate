import React, { useEffect } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useCalendarContext } from "@/app/contexts/CalendarContext"
import { useToast } from "@shared/contexts/ToastContext"
import { useNoSchool } from "@/app/hooks/entities"
import { useFormFields } from "@/app/hooks/ui/useFormFields"
import { todayString } from "@shared/lib"
import { MODALS } from "@/app/styles/colors"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalLabel,
    ModalTextInput,
    ModalDateInput,
    ModalCancelButton,
    ModalDeleteButton,
    ModalSubmitButton,
} from "@shared/components/modal"

interface NoSchoolFormModalProps {
    onClose: () => void
    noSchoolId?: string // If provided, modal is in edit mode
}

export const NoSchoolFormModal: React.FC<NoSchoolFormModalProps> = ({ onClose, noSchoolId }) => {
    const { noSchoolPeriods, addNoSchool, updateNoSchool } = useNoSchool()
    const { openModal } = useModal()
    const { selectedDateString } = useCalendarContext()
    const { showToast } = useToast()
    const { formData, setFormData, field } = useFormFields({
        name: "",
        startDate: selectedDateString || todayString(),
        endDate: selectedDateString || todayString()
    })

    const isEditMode = !!noSchoolId
    const focusColor = MODALS.SCHEDULE.PRIMARY_BG

    // Populate form with existing no school data in edit mode (only on mount)
    useEffect(() => {
        if (isEditMode) {
            const period = noSchoolPeriods.find((noSchool) => noSchool.id === noSchoolId)
            if (period) {
                setFormData({
                    name: period.name,
                    startDate: period.startDate,
                    endDate: period.endDate
                })
            }
        }
    }, [isEditMode, noSchoolId, noSchoolPeriods])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData.name.trim()) {
            showToast("Please enter a name", "error")
            return
        }

        const safeData = { ...formData }
        if (!safeData.startDate || isNaN(new Date(safeData.startDate).getTime())) {
            safeData.startDate = todayString()
        }
        if (!safeData.endDate || isNaN(new Date(safeData.endDate).getTime())) {
            safeData.endDate = todayString()
        }
        if (safeData.endDate < safeData.startDate) {
            showToast("End date cannot be before start date", "error")
            return
        }

        if (isEditMode) {
            updateNoSchool(noSchoolId, safeData)
        } else {
            addNoSchool(safeData)
        }
        onClose()
    }

    const handleDelete = () => {
        onClose()
        openModal("delete-no-school", noSchoolId)
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.SCHEDULE.HEADING}>
                {isEditMode ? "Edit No School Period" : "Add No School Period"}
            </ModalHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <ModalLabel>Reason / Name</ModalLabel>
                    <ModalTextInput
                        name="name"
                        {...field("name")}
                        placeholder="Winter Break"
                        focusColor={focusColor}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <ModalLabel>Start Date</ModalLabel>
                        <ModalDateInput
                            name="startDate"
                            {...field("startDate")}
                            focusColor={focusColor}
                        />
                    </div>
                    <div>
                        <ModalLabel>End Date</ModalLabel>
                        <ModalDateInput
                            name="endDate"
                            {...field("endDate")}
                            focusColor={focusColor}
                        />
                    </div>
                </div>

                <ModalFooter>
                    {isEditMode && <ModalDeleteButton className="mr-auto" onClick={handleDelete} />}
                    <ModalCancelButton onClick={onClose} />
                    <ModalSubmitButton
                        type="submit"
                        bgColor={MODALS.SCHEDULE.PRIMARY_BG}
                        bgColorHover={MODALS.SCHEDULE.PRIMARY_BG_HOVER}
                        textColor={MODALS.SCHEDULE.PRIMARY_TEXT}
                    >
                        {isEditMode ? "Save Changes" : "Add Period"}
                    </ModalSubmitButton>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}
