import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { useToast } from "@shared/contexts/ToastContext"
import { useModal } from "@/app/contexts/ModalContext"
import { useCalendarContext } from "@/app/contexts/CalendarContext"
import { useAssignments, useClasses } from "@/app/hooks/entities"
import { useSettings } from "@/app/hooks/useSettings"
import { useFormFields } from "@/app/hooks/ui/useFormFields"
import { DEFAULT_ASSIGNMENT_TYPES } from "@/app/hooks/useSettings"
import { todayString, generateId } from "@shared/lib"
import { parseSubtaskDisplayId } from "@/app/lib/subtaskIds"
import type { AssignmentType, Priority, Status, AssignmentTemplate, Subtask } from "@/app/types"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalLabel,
    ModalTextInput,
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
import ClassSelectDropdown from "./ClassSelectDropdown"
import DueDateTimeRow from "./DueDateTimeRow"
import DueTimeField from "./DueTimeField"
import SubtasksSection from "./SubtasksSection"
import { MODALS } from "@/app/styles/colors"

interface AssignmentFormModalProps {
    onClose: () => void
    assignmentId?: string // If provided, modal is in edit mode for assignment
    templateId?: string // If provided, modal is in edit mode for template
    mode?: "default" | "template"
    templateData?: AssignmentTemplate
    focusSubtaskId?: string // If provided, modal will open to Settings tab initially
}

const resolveParentId = (id: string): string =>
    parseSubtaskDisplayId(id)?.parentId ?? id

export const AssignmentFormModal: React.FC<AssignmentFormModalProps> = ({
    onClose,
    assignmentId,
    templateId,
    mode = "default",
    templateData,
    focusSubtaskId,
}) => {
    const { isPremium } = useAuth()
    const { classes } = useClasses()
    const { addAssignment, updateParent, getParentAssignmentById } = useAssignments()
    const { assignmentTypes, addTemplate, updateTemplate, getAssignmentTemplateById } = useSettings()
    const { openModal } = useModal()
    const { selectedDateString } = useCalendarContext()
    const { showToast } = useToast()
    const [activeTab, setActiveTab] = useState<"details" | "settings">(
        focusSubtaskId ? "settings" : "details"
    )
    const [subtasks, setSubtasks] = useState<Subtask[]>([])
    const maxSubtasks = isPremium ? 40 : 2
    const { formData, setFormData, field } = useFormFields({
        templateName: "",
        title: "",
        classId: "",
        description: "",
        dueDate: selectedDateString || todayString(),
        dueTime: "23:59",
        priority: "Low" as Priority,
        status: "To Do" as Status,
        type: "" as AssignmentType,
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
            const parent = getParentAssignmentById(assignmentId)
            if (!parent) return

            setFormData({
                templateName: "",
                title: parent.title,
                classId: parent.classId,
                description: parent.description ?? "",
                dueDate: parent.dueDate,
                dueTime: parent.dueTime,
                priority: parent.priority ?? ("Low" as Priority),
                status: parent.status,
                type: parent.type ?? "",
            })
            setSubtasks(parent.subtasks ?? [])
            hasInitializedForm.current = true
            return
        }

        if (templateId) {
            const template = getAssignmentTemplateById(templateId)
            if (!template) return

            setFormData({
                ...template,
                dueDate: selectedDateString || todayString(),
                description: template.description ?? "",
                priority: template.priority ?? ("Low" as Priority),
                type: template.type ?? "",
            })
            hasInitializedForm.current = true
            return
        }

        const { kind: _k, templateName: _tn, ...templateFields } = templateData ?? ({} as Partial<AssignmentTemplate>)
        const initialData = {
            title: "",
            classId: "",
            description: "",
            dueTime: "23:59",
            priority: "Low" as Priority,
            status: "To Do" as Status,
            type: "" as AssignmentType,
            ...templateFields,
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
    }, [assignmentId, templateId, templateData, classes, assignmentTypes, isEditMode, selectedDateString, getParentAssignmentById, getAssignmentTemplateById, setFormData])

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

        let normalizedSubtasks: Subtask[] = []
        if (!isTemplateMode) {
            for (const subtask of subtasks) {
                if (!subtask.title.trim()) {
                    showToast("Please enter a title for each subtask", "error")
                    setActiveTab("settings")
                    return
                }
                const dueDate = subtask.dueDate && !isNaN(new Date(subtask.dueDate).getTime())
                    ? subtask.dueDate
                    : safeData.dueDate
                const dueTime = subtask.dueTime && typeof subtask.dueTime === "string"
                    ? subtask.dueTime
                    : safeData.dueTime

                normalizedSubtasks.push({
                    id: subtask.id || generateId(),
                    title: subtask.title.trim(),
                    dueDate,
                    dueTime,
                    status: subtask.status,
                })
            }
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
                    createdAt: todayString(),
                    subtasks: []
                }
                addTemplate(newTemplate)
            }
        } else {
            const { templateName: _, ...assignmentData } = safeData
            const payload = { ...assignmentData, subtasks: normalizedSubtasks }
            if (isEditMode && assignmentId) {
                updateParent(resolveParentId(assignmentId), payload)
                showToast("Successfully updated assignment", "success")
            } else {
                addAssignment(payload)
                showToast("Successfully added assignment", "success")
            }
        }
        onClose()
    }

    const handleDelete = () => {
        onClose()
        if (!isTemplateMode && assignmentId) {
            openModal("delete-assignment", resolveParentId(assignmentId))
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
                                <ClassSelectDropdown
                                    classes={classes}
                                    value={formData.classId}
                                    onChange={(e) => setFormData(prev => ({ ...prev, classId: e.target.value }))}
                                    focusColor={focusColor}
                                />
                                <DueTimeField
                                    value={formData.dueTime}
                                    onChange={(value) => setFormData(prev => ({ ...prev, dueTime: value || "23:59" }))}
                                    focusColor={focusColor}
                                />
                            </div>
                        ) : (
                            <>
                                <ClassSelectDropdown
                                    classes={classes}
                                    value={formData.classId}
                                    onChange={(e) => setFormData(prev => ({ ...prev, classId: e.target.value }))}
                                    focusColor={focusColor}
                                />
                                <DueDateTimeRow
                                    dueDate={formData.dueDate}
                                    onChangeDueDate={(value) => setFormData(prev => ({ ...prev, dueDate: value }))}
                                    dueTime={formData.dueTime}
                                    onChangeDueTime={(value) => setFormData(prev => ({ ...prev, dueTime: value || "23:59" }))}
                                    focusColor={focusColor}
                                />
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
                        {!isTemplateMode && (
                            <SubtasksSection
                                subtasks={subtasks}
                                onChange={setSubtasks}
                                maxCount={maxSubtasks}
                                focusColor={focusColor}
                                focusSubtaskId={focusSubtaskId}
                            />
                        )}
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
