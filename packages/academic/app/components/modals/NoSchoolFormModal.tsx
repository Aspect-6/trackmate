import React, { useEffect, useState } from 'react'
import { useModal } from '@/app/contexts/ModalContext'
import { useNoSchool } from '@/app/hooks/entities'
import { todayString } from '@shared/lib'
import { MODALS } from '@/app/styles/colors'
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
} from '@shared/components/modal'

interface NoSchoolFormModalProps {
    onClose: () => void
    noSchoolId?: string // If provided, modal is in edit mode
}

export const NoSchoolFormModal: React.FC<NoSchoolFormModalProps> = ({ onClose, noSchoolId }) => {
    const { noSchoolPeriods, addNoSchool, updateNoSchool } = useNoSchool()
    const { openModal } = useModal()
    const [formData, setFormData] = useState({
        name: '',
        startDate: todayString(),
        endDate: todayString()
    })

    const isEditMode = !!noSchoolId
    const focusColor = MODALS.SCHEDULE.PRIMARY_BG

    // Populate form with existing no school data in edit mode (only on mount)
    useEffect(() => {
        if (isEditMode) {
            const period = noSchoolPeriods.find((ns: { id: string }) => ns.id === noSchoolId)
            if (period) {
                setFormData({
                    name: period.name,
                    startDate: period.startDate,
                    endDate: period.endDate
                })
            }
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const safeData = { ...formData }
        if (!safeData.startDate || isNaN(new Date(safeData.startDate).getTime())) {
            safeData.startDate = todayString()
        }
        if (!safeData.endDate || isNaN(new Date(safeData.endDate).getTime())) {
            safeData.endDate = todayString()
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
        openModal('delete-no-school', noSchoolId)
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.SCHEDULE.HEADING}>
                {isEditMode ? 'Edit No School Period' : 'Add No School Period'}
            </ModalHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <ModalLabel>Reason / Name</ModalLabel>
                    <ModalTextInput
                        name="name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Winter Break"
                        required
                        focusColor={focusColor}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <ModalLabel>Start Date</ModalLabel>
                        <ModalDateInput
                            name="startDate"
                            value={formData.startDate}
                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            required
                            focusColor={focusColor}
                        />
                    </div>
                    <div>
                        <ModalLabel>End Date</ModalLabel>
                        <ModalDateInput
                            name="endDate"
                            value={formData.endDate}
                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            required
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
                        {isEditMode ? 'Save Changes' : 'Add Period'}
                    </ModalSubmitButton>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}
