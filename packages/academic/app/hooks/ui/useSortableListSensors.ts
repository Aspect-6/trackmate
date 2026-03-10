import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"

/**
 * Shared drag-and-drop sensors for sortable lists.
 */
export const useSortableListSensors = () => {
    return useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
    )
}
