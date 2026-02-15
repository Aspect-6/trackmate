import { useModal } from "@/app/contexts/ModalContext"
import { useSettings } from "@/app/hooks/useSettings"
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

/**
 * Hook that manages all assignment template settings logic
 */
export const useAssignmentTemplateSettings = () => {
    const {
        assignmentTemplates,
        removeAssignmentTemplate,
        reorderAssignmentTemplates
    } = useSettings()

    const { openModal } = useModal()

    // Sensors for drag-and-drop functionality
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
    )

    const handleAddTemplate = () => {
        openModal("add-assignment", { mode: "template" })
    }

    const handleEditTemplate = (templateId: string) => {
        openModal("add-assignment", { mode: "template", templateId })
    }

    const handleRemoveTemplate = (templateId: string) => {
        removeAssignmentTemplate(templateId)
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const oldIndex = assignmentTemplates.findIndex(t => t.id === active.id)
        const newIndex = assignmentTemplates.findIndex(t => t.id === over.id)
        if (oldIndex === -1 || newIndex === -1) return
        const updated = arrayMove(assignmentTemplates, oldIndex, newIndex)
        reorderAssignmentTemplates(updated)
    }

    return {
        // Data
        assignmentTemplates,
        sensors,

        // Actions
        handleAddTemplate,
        handleEditTemplate,
        handleRemoveTemplate,
        handleDragEnd,
    }
}
