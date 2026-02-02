import { useState } from "react"
import { useAssignments } from "@/app/hooks/entities"
import { useSettings } from "@/app/hooks/useSettings"
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

/**
 * Hook that manages all assignment type settings logic:
 * - Adding new types
 * - Removing types
 * - Drag-and-drop reordering
 * - Manual up/down movement
 */
export const useAssignmentTypeSettings = () => {
    const {
        assignmentTypes,
        addAssignmentType,
        removeAssignmentType,
        reorderAssignmentTypes
    } = useSettings()

    const { assignments } = useAssignments()

    // State for the "add new type" input
    const [newType, setNewType] = useState("")

    // Sensors for drag-and-drop functionality
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
    )

    // Handler for adding a new assignment type
    const handleAdd = () => {
        const success = addAssignmentType(newType)
        if (success) setNewType("")
    }

    // Handler for removing an assignment type
    const handleRemove = (type: string) => {
        removeAssignmentType(type, assignments)
    }

    // Handler for drag-and-drop reordering
    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const oldIndex = assignmentTypes.findIndex(t => t === active.id)
        const newIndex = assignmentTypes.findIndex(t => t === over.id)
        if (oldIndex === -1 || newIndex === -1) return
        const updated = arrayMove(assignmentTypes, oldIndex, newIndex)
        reorderAssignmentTypes(updated)
    }

    // Handler for manual up/down movement via buttons
    const moveType = (type: string, direction: "up" | "down") => {
        const index = assignmentTypes.findIndex(t => t === type)
        if (index === -1) return
        const targetIndex = direction === "up"
            ? Math.max(0, index - 1)
            : Math.min(assignmentTypes.length - 1, index + 1)
        if (targetIndex === index) return
        reorderAssignmentTypes(arrayMove(assignmentTypes, index, targetIndex))
    }

    return {
        // Data
        assignmentTypes,
        newType,
        sensors,
        // Actions
        setNewType,
        handleAdd,
        handleDragEnd,
        moveType,
        handleRemove
    }
}
