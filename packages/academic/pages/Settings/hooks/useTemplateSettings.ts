import { useModal } from "@/app/contexts/ModalContext"
import { useSettings } from "@/app/hooks/useSettings"
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import type { TemplateKind } from "@/app/types"

/**
 * Hook that manages template settings logic (for both assignments and events)
 */
export const useTemplateSettings = (kind: TemplateKind) => {
    const {
        templates,
        removeTemplate,
        reorderTemplates
    } = useSettings()

    const { openModal } = useModal()

    // Filter templates by requested kind
    const filteredTemplates = templates.filter(t => t.kind === kind)

    // Sensors for drag-and-drop functionality
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
    )

    const handleAddTemplate = () => {
        const modalName = kind === "assignment" ? "add-assignment" : "add-event"
        openModal(modalName, { mode: "template" })
    }

    const handleEditTemplate = (templateId: string) => {
        const modalName = kind === "assignment" ? "add-assignment" : "add-event"
        openModal(modalName, { mode: "template", templateId })
    }

    const handleRemoveTemplate = (templateId: string) => {
        removeTemplate(templateId)
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        // Find indices in the filtered list
        const oldFilteredIndex = filteredTemplates.findIndex(t => t.id === active.id)
        const newFilteredIndex = filteredTemplates.findIndex(t => t.id === over.id)
        if (oldFilteredIndex === -1 || newFilteredIndex === -1) return

        // Find indices in the MAIN templates array (since we want to save the entire array)
        const oldIndex = templates.findIndex(t => t.id === active.id)
        const newIndex = templates.findIndex(t => t.id === over.id)
        if (oldIndex === -1 || newIndex === -1) return

        // Handle drag and drop logic
        // We only move the item within its own kind's relative order
        // The simplest way is to reorder the entire array using arrayMove
        const updated = arrayMove(templates, oldIndex, newIndex)
        reorderTemplates(updated)
    }

    return {
        // Data
        templates: filteredTemplates,
        sensors,

        // Actions
        handleAddTemplate,
        handleEditTemplate,
        handleRemoveTemplate,
        handleDragEnd,
    }
}
