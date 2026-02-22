import React, { useEffect, useState } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useToast } from "@shared/contexts/ToastContext"
import { useEvents } from "@/app/hooks/entities"
import { useSettings } from "@/app/hooks/useSettings"
import { todayString, generateId } from "@shared/lib"
import type { EventTemplate } from "@/app/types"
import { MODALS } from "@/app/styles/colors"
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
    ModalCharacterCountDisplay,
} from "@shared/components/modal"

interface EventFormModalProps {
    onClose: () => void
    eventId?: string // If provided, modal is in edit mode
    mode?: "default" | "template"
    templateId?: string
    templateData?: EventTemplate
}

export const EventFormModal: React.FC<EventFormModalProps> = ({
    onClose,
    eventId,
    mode = "default",
    templateId,
    templateData
}) => {
    const { events, addEvent, updateEvent } = useEvents()
    const { eventTemplates, addTemplate, updateTemplate } = useSettings()
    const { openModal } = useModal()
    const { showToast } = useToast()
    const [formData, setFormData] = useState({
        templateName: "",
        title: "",
        date: todayString(),
        startTime: "",
        endTime: "",
        description: "",
        color: MODALS.EVENT.COLORS[0]!
    })

    const isEditMode = !!eventId || !!templateId
    const isTemplateMode = mode === "template"
    const focusColor = MODALS.EVENT.PRIMARY_BG

    // Populate form with existing event data in edit mode (only on mount)
    useEffect(() => {
        if (eventId) {
            const event = events.find(e => e.id === eventId)
            if (event) {
                setFormData({
                    templateName: "",
                    title: event.title,
                    date: event.date,
                    startTime: event.startTime || "",
                    endTime: event.endTime || "",
                    description: event.description || "",
                    color: event.color
                })
            }
        } else if (templateData) {
            setFormData({
                templateName: "",
                title: templateData.title,
                date: todayString(),
                startTime: templateData.startTime || "",
                endTime: templateData.endTime || "",
                description: templateData.description || "",
                color: templateData.color
            })
        }
    }, [eventId, events, templateData, templateId])

    // Load template data for editing
    useEffect(() => {
        if (templateId && eventTemplates) {
            const template = eventTemplates.find(t => t.id === templateId)
            if (template) {
                setFormData(prev => ({
                    ...prev,
                    templateName: template.templateName,
                    title: template.title,
                    startTime: template.startTime || "",
                    endTime: template.endTime || "",
                    description: template.description || "",
                    color: template.color
                }))
            }
        }
    }, [templateId, eventTemplates])

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

        if (isTemplateMode && !formData.templateName.trim()) {
            showToast("Please enter a template name", "error")
            return
        }

        if (!safeData.title.trim()) {
            showToast("Please enter a title", "error")
            return
        }

        if (!safeData.date || isNaN(new Date(safeData.date).getTime())) {
            safeData.date = todayString()
        }

        if (isTemplateMode) {
            const { date: _removed, ...templateFields } = safeData
            const templatePayload = { ...templateFields, templateName: formData.templateName, kind: "event" as const }
            if (templateId) {
                updateTemplate(templateId, templatePayload)
            } else {
                const newTemplate: EventTemplate = {
                    ...templatePayload,
                    id: generateId(),
                    createdAt: todayString()
                }
                addTemplate(newTemplate)
            }
        } else {
            if (isEditMode && eventId) {
                updateEvent(eventId, safeData)
                showToast("Successfully updated event", "success")
            } else {
                addEvent(safeData)
                showToast("Successfully added event", "success")
            }
        }
        onClose()
    }

    const handleDelete = () => {
        onClose()
        if (!isTemplateMode) {
            openModal("delete-event", eventId)
        }
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.EVENT.HEADING}>
                {isTemplateMode
                    ? (templateId ? "Edit Template" : "Add New Template")
                    : (isEditMode ? "Edit Event" : "Add New Event")
                }
            </ModalHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                {isTemplateMode && (
                    <div>
                        <ModalLabel>Template Name</ModalLabel>
                        <ModalTextInput
                            name="templateName"
                            value={formData.templateName}
                            onChange={e => setFormData({ ...formData, templateName: e.target.value })}
                            placeholder="Band Practice"
                            focusColor={focusColor}
                        />
                    </div>
                )}
                <div>
                    <ModalLabel>{isTemplateMode ? "Event Title" : "Title"}</ModalLabel>
                    <ModalTextInput
                        name="title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Marching Band Practice"
                        required
                        focusColor={focusColor}
                    />
                </div>
                {!isTemplateMode && (
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
                )}
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
                    <ModalLabel>{isEditMode ? "Description" : "Description (Optional)"}</ModalLabel>
                    <ModalTextareaInput
                        name="description"
                        rows={2}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        maxLength={150}
                        focusColor={focusColor}
                    />
                    <ModalCharacterCountDisplay
                        current={formData.description.length}
                        max={150}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Color Code</label>
                    <div className="color-tile-grid custom-scrollbar-horizontal">
                        {MODALS.EVENT.COLORS.map(color => (
                            <div
                                key={color}
                                onClick={() => setFormData({ ...formData, color })}
                                className={`color-tile ${formData.color === color ? "selected" : ""}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <ModalFooter>
                    {isEditMode && !isTemplateMode && <ModalDeleteButton className="mr-auto" onClick={handleDelete} />}
                    <ModalCancelButton onClick={onClose} />
                    <ModalSubmitButton
                        type="submit"
                        bgColor={MODALS.EVENT.PRIMARY_BG}
                        bgColorHover={MODALS.EVENT.PRIMARY_BG_HOVER}
                        textColor={MODALS.EVENT.PRIMARY_TEXT}
                    >
                        {isTemplateMode ? "Save Template" : (isEditMode ? "Save Changes" : "Add Event")}
                    </ModalSubmitButton>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}
