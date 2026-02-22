import { useState, useCallback, useEffect } from "react"
import { useAssignments } from "@/app/hooks/entities/useAssignments"
import { Status } from "@/app/types"
import {
    closestCenter,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
    DragCancelEvent,
    DragOverEvent,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"

const COLUMN_IDS: Status[] = ["To Do", "In Progress", "Done"]

export const useAssignmentDrag = (dragEnabled: boolean, isTablet: boolean) => {
    const { getAssignmentById, updateAssignment } = useAssignments()

    const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null)
    const [overId, setOverId] = useState<string | null>(null)

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 8 },
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 0, tolerance: 5 },
    })
    const keyboardSensor = useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    })

    const sensors = useSensors(
        mouseSensor,
        ...(isTablet ? [touchSensor] : []),
        keyboardSensor,
    )

    const handleDragStart = useCallback((event: DragStartEvent) => {
        if (!dragEnabled) return
        setActiveAssignmentId(event.active.id as string)
        setOverId(null)
        document.body.style.cursor = "grabbing"
    }, [dragEnabled])

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        if (!dragEnabled) return
        const { active, over } = event
        setActiveAssignmentId(null)
        setOverId(null)
        document.body.style.cursor = "auto"
        if (!over) return

        const activeId = active.id as string
        const currentOverId = over.id as string

        if (activeId === currentOverId) return

        const activeAssignment = getAssignmentById(activeId)
        if (!activeAssignment) return

        const overAssignment = getAssignmentById(currentOverId)
        const overStatus = overAssignment
            ? overAssignment.status
            : COLUMN_IDS.includes(currentOverId as Status)
                ? (currentOverId as Status)
                : null

        if (!overStatus) return

        if (activeAssignment.status !== overStatus) {
            updateAssignment(activeId, { status: overStatus })
        }
    }, [dragEnabled, getAssignmentById, updateAssignment])

    const handleDragCancel = useCallback((_event: DragCancelEvent) => {
        if (!dragEnabled) return
        setActiveAssignmentId(null)
        setOverId(null)
    }, [dragEnabled])

    const handleDragOver = useCallback((event: DragOverEvent) => {
        if (!dragEnabled) return
        setOverId(event.over ? (event.over.id as string) : null)
    }, [dragEnabled])

    // Reset drag state when drag is disabled
    useEffect(() => {
        if (!dragEnabled) {
            setActiveAssignmentId(null)
            setOverId(null)
        }
    }, [dragEnabled])

    return {
        sensors,
        collisionDetection: closestCenter,
        handleDragStart,
        handleDragEnd,
        handleDragCancel,
        handleDragOver,
        activeAssignmentId,
        overId,
    }
}
