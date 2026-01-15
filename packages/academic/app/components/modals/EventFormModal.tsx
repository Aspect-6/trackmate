import React, { useEffect, useState } from 'react'
import { useModal } from '@/app/contexts/ModalContext'
import { useToast } from '@shared/contexts/ToastContext'
import { useEvents } from '@/app/hooks/entities'
import { todayString } from '@shared/lib'
import { MODALS } from '@/app/styles/colors'
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalLabel,
    ModalTextInput,
    ModalDateInput,
    ModalTimeInput,
    ModalTextareaInput,
    ModalCancelButton,
    ModalDeleteButton,
    ModalSubmitButton,
} from '@/app/components/modals/fields'

interface EventFormModalProps {
    onClose: () => void
    eventId?: string // If provided, modal is in edit mode
}

export const EventFormModal: React.FC<EventFormModalProps> = ({ onClose, eventId }) => {
    const { events, addEvent, updateEvent } = useEvents()
    const { openModal } = useModal()
    const { showToast } = useToast()
    const [formData, setFormData] = useState({
        title: '',
        date: todayString(),
        startTime: '',
        endTime: '',
        description: '',
        color: MODALS.EVENT.COLORS[0]!
    })

    const isEditMode = !!eventId
    const focusColor = MODALS.EVENT.PRIMARY_BG

    // Populate form with existing event data in edit mode (only on mount)
    useEffect(() => {
        if (isEditMode) {
            const event = events.find(e => e.id === eventId)
            if (event) {
                setFormData({
                    title: event.title,
                    date: event.date,
                    startTime: event.startTime || '',
                    endTime: event.endTime || '',
                    description: event.description || '',
                    color: event.color
                })
            }
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const safeData = {
            title: formData.title,
            date: formData.date || todayString(),
            startTime: formData.startTime || null,
            endTime: formData.endTime || null,
            description: formData.description,
            color: formData.color
        }

        if (!safeData.date || isNaN(new Date(safeData.date).getTime())) {
            safeData.date = todayString()
        }

        if (isEditMode) {
            updateEvent(eventId, safeData)
            showToast('Successfully updated event', 'success')
        } else {
            addEvent(safeData)
            showToast('Successfully added event', 'success')
        }
        onClose()
    }

    const handleDelete = () => {
        onClose()
        openModal('delete-event', eventId)
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.EVENT.HEADING}>
                {isEditMode ? 'Edit Event' : 'Add New Event'}
            </ModalHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <ModalLabel>Event Title</ModalLabel>
                    <ModalTextInput
                        name="title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Club Meeting"
                        required
                        focusColor={focusColor}
                    />
                </div>
                <div>
                    <ModalLabel>Date</ModalLabel>
                    <ModalDateInput
                        name="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        required
                        focusColor={focusColor}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <ModalLabel>Start Time (Optional)</ModalLabel>
                        <ModalTimeInput
                            name="startTime"
                            value={formData.startTime}
                            onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                            focusColor={focusColor}
                        />
                    </div>
                    <div>
                        <ModalLabel>End Time (Optional)</ModalLabel>
                        <ModalTimeInput
                            name="endTime"
                            value={formData.endTime}
                            onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                            focusColor={focusColor}
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-400">Leave blank for all-day.</p>
                <div>
                    <ModalLabel>{isEditMode ? 'Description' : 'Description (Optional)'}</ModalLabel>
                    <ModalTextareaInput
                        name="description"
                        rows={2}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        focusColor={focusColor}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                    <div className="color-tile-grid custom-scrollbar-horizontal">
                        {MODALS.EVENT.COLORS.map(color => (
                            <div
                                key={color}
                                onClick={() => setFormData({ ...formData, color })}
                                className={`color-tile ${formData.color === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <ModalFooter>
                    {isEditMode && <ModalDeleteButton className="mr-auto" onClick={handleDelete} />}
                    <ModalCancelButton onClick={onClose} />
                    <ModalSubmitButton
                        type="submit"
                        bgColor={MODALS.EVENT.PRIMARY_BG}
                        bgColorHover={MODALS.EVENT.PRIMARY_BG_HOVER}
                        textColor={MODALS.EVENT.PRIMARY_TEXT}
                    >
                        {isEditMode ? 'Save Changes' : 'Add Event'}
                    </ModalSubmitButton>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}
