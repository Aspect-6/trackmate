import React, { useEffect, useState } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useAssignments, useClasses } from "@/app/hooks/entities"
import { useSettings } from "@/app/hooks/useSettings"
import { useToast } from "@shared/contexts/ToastContext"
import { DEFAULT_ASSIGNMENT_TYPES } from "@/app/hooks/useSettings"
import { todayString } from "@shared/lib"
import { AssignmentType, Priority, Status } from "@/app/types"
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
    assignmentId?: string // If provided, modal is in edit mode
}

export const AssignmentFormModal: React.FC<AssignmentFormModalProps> = ({ onClose, assignmentId }) => {
    const { classes } = useClasses()
    const { assignments, addAssignment, updateAssignment } = useAssignments()
    const { assignmentTypes } = useSettings()
    const { openModal } = useModal()
    const { showToast } = useToast()
    const [activeTab, setActiveTab] = useState<"details" | "settings">("details")
    const [formData, setFormData] = useState<{
        title: string
        classId: string
        description: string
        dueDate: string
        dueTime: string
        priority: Priority
        status: Status
        type: AssignmentType
    }>({
        title: "",
        classId: "",
        description: "",
        dueDate: todayString(),
        dueTime: "23:59",
        priority: "Low",
        status: "To Do",
        type: ""
    })

    const isEditMode = !!assignmentId
    const currentTypes = assignmentTypes.length ? assignmentTypes : DEFAULT_ASSIGNMENT_TYPES
    const focusColor = MODALS.ASSIGNMENT.PRIMARY_BG

    // Populate form with existing assignment data in edit mode (only on mount)
    useEffect(() => {
        if (isEditMode) {
            const assignment = assignments.find(a => a.id === assignmentId)
            if (assignment) {
                setFormData({
                    title: assignment.title,
                    classId: assignment.classId,
                    description: assignment.description || "",
                    dueDate: assignment.dueDate,
                    dueTime: assignment.dueTime || "23:59",
                    priority: assignment.priority,
                    status: assignment.status,
                    type: assignment.type || ""
                })
            }
        }
    }, [assignmentId, assignments, isEditMode])

    // Select a class for an assignment if not set (only for Add Assignment)
    useEffect(() => {
        if (classes.length > 0 && !formData.classId) {
            const firstClassId = classes[0]?.id || ""
            if (firstClassId) {
                setFormData(prev => ({ ...prev, classId: prev.classId || firstClassId }))
            }
        }
    }, [classes, formData.classId])

    // Select a type for an assignment if not set (only for Add Assignment)
    useEffect(() => {
        if (isEditMode) return
        if (!formData.type && assignmentTypes.length) {
            setFormData(prev => ({ ...prev, type: assignmentTypes[0]! }))
        }
    }, [assignmentTypes, formData.type, isEditMode])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validPriorities: Priority[] = ["High", "Medium", "Low"]
        const validStatuses: Status[] = ["To Do", "In Progress", "Done"]
        const validTypes: AssignmentType[] = currentTypes.length ? currentTypes : DEFAULT_ASSIGNMENT_TYPES

        const safeData = { ...formData }

        if (!safeData.title.trim()) {
            showToast("Please enter a title", "error")
            return
        }

        if (!safeData.classId && classes.length > 0) {
            safeData.classId = classes[0]?.id || ""
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

        const fallbackType = validTypes[0] ?? ""
        // Allow "No Type" explicitly
        if (!safeData.type || (safeData.type !== "No Type" && !validTypes.includes(safeData.type as AssignmentType))) {
            safeData.type = fallbackType
        }

        if (isEditMode) {
            updateAssignment(assignmentId, safeData)
            showToast("Successfully updated assignment", "success")
        } else {
            addAssignment(safeData)
            showToast("Successfully added assignment", "success")
        }
        onClose()
    }

    const handleDelete = () => {
        onClose()
        openModal("delete-assignment", assignmentId)
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.ASSIGNMENT.HEADING}>
                {isEditMode ? "Edit Assignment" : "Add New Assignment"}
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
                        <div>
                            <ModalLabel>Title</ModalLabel>
                            <ModalTextInput
                                name="title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Read Chapter 4"
                                focusColor={focusColor}
                            />
                        </div>
                        <div>
                            <ModalLabel>Class</ModalLabel>
                            <ModalSelectInput
                                name="classId"
                                value={formData.classId}
                                onChange={e => setFormData({ ...formData, classId: e.target.value })}
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
                                    value={formData.dueDate}
                                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                    required
                                    focusColor={focusColor}
                                />
                            </div>
                            <div>
                                <ModalLabel>Due Time</ModalLabel>
                                <ModalTimeInput
                                    name="dueTime"
                                    value={formData.dueTime}
                                    onChange={e => setFormData({ ...formData, dueTime: e.target.value || "23:59" })}
                                    required
                                    focusColor={focusColor}
                                />
                            </div>
                        </div>
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
                    </ModalTabPanel>
                    <ModalTabPanel isActive={activeTab === "settings"}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <ModalLabel>Priority</ModalLabel>
                                <ModalSelectInput
                                    name="priority"
                                    value={formData.priority}
                                    onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
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
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
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
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value as AssignmentType })}
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
                    {isEditMode && <ModalDeleteButton onClick={handleDelete} className="mr-auto" />}
                    <ModalCancelButton onClick={onClose} />
                    <ModalSubmitButton
                        type="submit"
                        bgColor={MODALS.ASSIGNMENT.PRIMARY_BG}
                        bgColorHover={MODALS.ASSIGNMENT.PRIMARY_BG_HOVER}
                        textColor={MODALS.ASSIGNMENT.PRIMARY_TEXT}
                    >
                        {isEditMode ? "Save Changes" : "Add Assignment"}
                    </ModalSubmitButton>
                </ModalFooter>
            </form>
        </ModalContainer>
    )
}
