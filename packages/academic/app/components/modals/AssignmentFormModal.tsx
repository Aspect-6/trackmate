import React, { useEffect, useRef, useState } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useCalendarContext } from "@/app/contexts/CalendarContext"
import { useAssignments, useClasses } from "@/app/hooks/entities"
import { useSettings } from "@/app/hooks/useSettings"
import { useFormFields } from "@/app/hooks/ui/useFormFields"
import { useToast } from "@shared/contexts/ToastContext"
import { DEFAULT_ASSIGNMENT_TYPES } from "@/app/hooks/useSettings"
import { todayString, generateId } from "@shared/lib"
import { AssignmentType, Priority, Status, AssignmentTemplate } from "@/app/types"
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
    ModalSelectInput,
    ModalSelectInputOption,
    ModalCancelButton,
    ModalDeleteButton,
    ModalSubmitButton,
    ModalTabSwitcher,
    ModalTab,
    ModalTabPanelsContainer,
    ModalTabPanel,
    ModalCharacterCountDisplay,
} from "@shared/components/modal"

interface AssignmentFormModalProps {
    onClose: () => void
    assignmentId?: string // If provided, modal is in edit mode for assignment
    templateId?: string // If provided, modal is in edit mode for template
    mode?: "default" | "template"
    templateData?: AssignmentTemplate
}

export const AssignmentFormModal: React.FC<AssignmentFormModalProps> = ({
    onClose,
    assignmentId,
    templateId,
    mode = "default",
    templateData
}) => {
    const { classes } = useClasses()
    const { addAssignment, updateAssignment, getAssignmentById } = useAssignments()
    const { assignmentTypes, addTemplate, updateTemplate, getAssignmentTemplateById } = useSettings()
    const { openModal } = useModal()
    const { selectedDateString } = useCalendarContext()
    const { showToast } = useToast()
    const [activeTab, setActiveTab] = useState<"details" | "settings">("details")
    const { formData, setFormData, field, fieldWithTransform } = useFormFields({
        templateName: "",
        title: "",
        classId: "",
        description: "",
        dueDate: selectedDateString || todayString(),
        dueTime: "23:59",
        priority: "Low" as Priority,
        status: "To Do" as Status,
        type: "" as AssignmentType
    })

    const isEditMode = !!assignmentId || !!templateId
    const isTemplateMode = mode === "template"
    const currentTypes = assignmentTypes.length ? assignmentTypes : DEFAULT_ASSIGNMENT_TYPES
    const focusColor = MODALS.ASSIGNMENT.PRIMARY_BG

    // Initialize form data once per modal open
    const hasInitializedForm = useRef(false)
    useEffect(() => {
        if (hasInitializedForm.current) return

        if (assignmentId) {
            const assignment = getAssignmentById(assignmentId)
            if (!assignment) return

            setFormData({ templateName: "", ...assignment })
            hasInitializedForm.current = true
            return
        }

        if (templateId) {
            const template = getAssignmentTemplateById(templateId)
            if (!template) return

            setFormData({ ...template, dueDate: selectedDateString || todayString() })
            hasInitializedForm.current = true
            return
        }

        const initialData = {
            title: "",
            classId: "",
            description: "",
            dueTime: "23:59",
            priority: "Low" as Priority,
            status: "To Do" as Status,
            type: "" as AssignmentType,
            ...(templateData ?? {}),
            templateName: "",
            dueDate: selectedDateString || todayString(),
        }

        if (classes.length > 0 && !initialData.classId) {
            initialData.classId = classes[0]!.id
        }
        if (!isEditMode && !templateData && !initialData.type && assignmentTypes.length) {
            initialData.type = assignmentTypes[0]!
        }

        setFormData(initialData)
        hasInitializedForm.current = true
    }, [assignmentId, templateId, templateData, classes, assignmentTypes, isEditMode, selectedDateString, getAssignmentById, getAssignmentTemplateById, setFormData])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validPriorities: Priority[] = ["High", "Medium", "Low"]
        const validStatuses: Status[] = ["To Do", "In Progress", "Done"]
        const validTypes: AssignmentType[] = currentTypes

        const safeData = { ...formData }

        if (isTemplateMode && !safeData.templateName.trim()) {
            showToast("Please enter a template name", "error")
            return
        }

        if (!safeData.title.trim()) {
            showToast("Please enter a title", "error")
            return
        }

        if (!safeData.classId && classes.length > 0) {
            safeData.classId = classes[0]!.id
        }

        if (!validPriorities.includes(safeData.priority)) {
            safeData.priority = "Low"
        }

        if (!validStatuses.includes(safeData.status)) {
            safeData.status = "To Do"
        }

        if (!safeData.dueDate || isNaN(new Date(safeData.dueDate).getTime())) {
            safeData.dueDate = todayString()
        }

        if (!safeData.dueTime || typeof safeData.dueTime !== "string") {
            safeData.dueTime = "23:59"
        }

        const fallbackType = validTypes[0]!
        if (!validTypes.includes(safeData.type)) {
            safeData.type = fallbackType
        }

        if (isTemplateMode) {
            const { dueDate: _removed, ...templateFields } = safeData
            const templatePayload = { ...templateFields, templateName: safeData.templateName, kind: "assignment" as const }
            if (templateId) {
                updateTemplate(templateId, templatePayload)
            } else {
                const newTemplate: AssignmentTemplate = {
                    ...templatePayload,
                    id: generateId(),
                    createdAt: todayString()
                }
                addTemplate(newTemplate)
            }
        } else {
            if (isEditMode && assignmentId) {
                updateAssignment(assignmentId, safeData)
                showToast("Successfully updated assignment", "success")
            } else {
                addAssignment(safeData)
                showToast("Successfully added assignment", "success")
            }
        }
        onClose()
    }

    const handleDelete = () => {
        onClose()
        if (!isTemplateMode) {
            openModal("delete-assignment", assignmentId)
        }
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.ASSIGNMENT.HEADING}>
                {isTemplateMode
                    ? (templateId ? "Edit Template" : "Add New Template")
                    : (isEditMode ? "Edit Assignment" : "Add New Assignment")
                }
            </ModalHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <ModalTabSwitcher ariaLabel="Assignment form tabs">
                    <ModalTab value="details" isActive={activeTab === "details"} onClick={() => setActiveTab("details")}>
                        Details
                    </ModalTab>
                    <ModalTab value="settings" isActive={activeTab === "settings"} onClick={() => setActiveTab("settings")}>
                        Settings
                    </ModalTab>
                </ModalTabSwitcher>

                <ModalTabPanelsContainer>
                    <ModalTabPanel isActive={activeTab === "details"}>
                        {isTemplateMode && (
                            <div>
                                <ModalLabel>Template Name</ModalLabel>
                                <ModalTextInput
                                    name="templateName"
                                    {...field("templateName")}
                                    placeholder="Algebra Practice Problems"
                                    focusColor={focusColor}
                                />
                            </div>
                        )}
                        <div>
                            <ModalLabel>Title</ModalLabel>
                            <ModalTextInput
                                name="title"
                                {...field("title")}
                                placeholder="Lesson 2 Practice Problems"
                                focusColor={focusColor}
                            />
                        </div>
                        {isTemplateMode ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <ModalLabel>Class</ModalLabel>
                                    <ModalSelectInput
                                        name="classId"
                                        {...field("classId")}
                                        required
                                        focusColor={focusColor}
                                    >
                                        {classes.map(c => (
                                            <ModalSelectInputOption key={c.id} value={c.id}>
                                                {c.name}
                                            </ModalSelectInputOption>
                                        ))}
                                    </ModalSelectInput>
                                </div>
                                <div>
                                    <ModalLabel>Due Time</ModalLabel>
                                    <ModalTimeInput
                                        name="dueTime"
                                        {...fieldWithTransform("dueTime", value => value || "23:59")}
                                        required
                                        focusColor={focusColor}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <ModalLabel>Class</ModalLabel>
                                    <ModalSelectInput
                                        name="classId"
                                        {...field("classId")}
                                        required
                                        focusColor={focusColor}
                                    >
                                        {classes.map(c => (
                                            <ModalSelectInputOption key={c.id} value={c.id}>
                                                {c.name}
                                            </ModalSelectInputOption>
                                        ))}
                                    </ModalSelectInput>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <ModalLabel>Due Date</ModalLabel>
                                        <ModalDateInput
                                            name="dueDate"
                                            {...field("dueDate")}
                                            required
                                            focusColor={focusColor}
                                        />
                                    </div>
                                    <div>
                                        <ModalLabel>Due Time</ModalLabel>
                                        <ModalTimeInput
                                            name="dueTime"
                                            {...fieldWithTransform("dueTime", value => value || "23:59")}
                                            required
                                            focusColor={focusColor}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            <ModalLabel>{isEditMode ? "Description" : "Description (Optional)"}</ModalLabel>
                            <ModalTextareaInput
                                name="description"
                                rows={2}
                                {...field("description")}
                                maxLength={150}
                                focusColor={focusColor}
                            />
                            <ModalCharacterCountDisplay
                                current={formData.description.length}
                                max={150}
                            />
                        </div>
                    </ModalTabPanel>
                    <ModalTabPanel isActive={activeTab === "settings"}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <ModalLabel>Priority</ModalLabel>
                                <ModalSelectInput
                                    name="priority"
                                    {...field("priority")}
                                    focusColor={focusColor}
                                >
                                    <ModalSelectInputOption value="Low">Low</ModalSelectInputOption>
                                    <ModalSelectInputOption value="Medium">Medium</ModalSelectInputOption>
                                    <ModalSelectInputOption value="High">High</ModalSelectInputOption>
                                </ModalSelectInput>
                            </div>
                            <div>
                                <ModalLabel>Status</ModalLabel>
                                <ModalSelectInput
                                    name="status"
                                    {...field("status")}
                                    focusColor={focusColor}
                                >
                                    <ModalSelectInputOption value="To Do">To Do</ModalSelectInputOption>
                                    <ModalSelectInputOption value="In Progress">In Progress</ModalSelectInputOption>
                                    <ModalSelectInputOption value="Done">Done</ModalSelectInputOption>
                                </ModalSelectInput>
                            </div>
                        </div>
                        <div>
                            <ModalLabel>Type</ModalLabel>
                            <ModalSelectInput
                                name="type"
                                {...field("type")}
                                focusColor={focusColor}
                            >
                                {currentTypes.map((type: AssignmentType) => (
                                    <ModalSelectInputOption key={type} value={type}>
                                        {type}
                                    </ModalSelectInputOption>
                                ))}
                            </ModalSelectInput>
                        </div>
                    </ModalTabPanel>
                </ModalTabPanelsContainer>

                <ModalFooter>
                    {isEditMode && !isTemplateMode && <ModalDeleteButton onClick={handleDelete} className="mr-auto" />}
                    <ModalCancelButton onClick={onClose} />
                    <ModalSubmitButton
                        type="submit"
                        bgColor={MODALS.ASSIGNMENT.PRIMARY_BG}
                        bgColorHover={MODALS.ASSIGNMENT.PRIMARY_BG_HOVER}
                        textColor={MODALS.ASSIGNMENT.PRIMARY_TEXT}
                    >
                        {isTemplateMode ? "Save Template" : (isEditMode ? "Save Changes" : "Add Assignment")}
                    </ModalSubmitButton>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}
