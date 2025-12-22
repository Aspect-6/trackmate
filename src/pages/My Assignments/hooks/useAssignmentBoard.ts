import { useEffect, useState, useMemo, useCallback } from "react"
import { useApp } from "@/app/context/AppContext"
import { Status } from "@/app/types"
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragCancelEvent,
  DragOverEvent,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import type { UseAssignmentBoard } from "@/pages/My Assignments/types"

const MOBILE_BREAKPOINT = "(max-width: 1023px)"

const createMobileColumnState = (): Record<Status, boolean> => ({
  "To Do": true,
  "In Progress": false,
  Done: false,
})

const createDesktopColumnState = (): Record<Status, boolean> => ({
  "To Do": true,
  "In Progress": true,
  Done: true,
})

export const useAssignmentBoard = () => {
  const { assignments, updateAssignment } = useApp()

  // Mobile state
  const [isMobile, setIsMobile] = useState(false)
  const [openColumns, setOpenColumns] = useState<Record<Status, boolean>>(
    createMobileColumnState(),
  )

  // Drag state
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(
    null,
  )
  const [overId, setOverId] = useState<string | null>(null)

  const dragEnabled = !isMobile

  // Column configuration
  const columnConfigs = useMemo<UseAssignmentBoard.ColumnConfig[]>(
    () => [
      { status: "To Do", title: "Upcoming" },
      { status: "In Progress", title: "In Progress" },
      { status: "Done", title: "Done" },
    ],
    [],
  )

  const columnIds = useMemo(
    () => columnConfigs.map((c) => c.status),
    [columnConfigs],
  )

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Drag event handlers
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      if (!dragEnabled) return
      setActiveAssignmentId(event.active.id as string)
      setOverId(null)
    },
    [dragEnabled],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!dragEnabled) return
      const { active, over } = event
      setActiveAssignmentId(null)
      setOverId(null)
      if (!over) return

      const activeId = active.id as string
      const currentOverId = over.id as string

      if (activeId === currentOverId) return

      const activeAssignment = assignments.find((a) => a.id === activeId)
      if (!activeAssignment) return

      const overAssignment = assignments.find((a) => a.id === currentOverId)
      const overStatus = overAssignment
        ? overAssignment.status
        : columnIds.includes(currentOverId as Status)
          ? (currentOverId as Status)
          : null

      if (!overStatus) return

      if (activeAssignment.status !== overStatus) {
        updateAssignment(activeId, { status: overStatus })
      }
    },
    [dragEnabled, assignments, columnIds, updateAssignment],
  )

  const handleDragCancel = useCallback(
    (_event: DragCancelEvent) => {
      if (!dragEnabled) return
      setActiveAssignmentId(null)
      setOverId(null)
    },
    [dragEnabled],
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      if (!dragEnabled) return
      setOverId(event.over ? (event.over.id as string) : null)
    },
    [dragEnabled],
  )

  // Toggle column visibility (mobile only)
  const toggleColumn = useCallback(
    (status: Status) => {
      if (!isMobile) return
      setOpenColumns((prev) => ({
        ...prev,
        [status]: !prev[status],
      }))
    },
    [isMobile],
  )

  // Mobile detection effect
  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)
    const applyMatch = (matches: boolean) => setIsMobile(matches)

    applyMatch(mediaQuery.matches)
    const handleChange = (event: MediaQueryListEvent) =>
      applyMatch(event.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Sync open columns with mobile state
  useEffect(() => {
    setOpenColumns(
      isMobile ? createMobileColumnState() : createDesktopColumnState(),
    )
  }, [isMobile])

  // Reset drag state when drag is disabled
  useEffect(() => {
    if (!dragEnabled) {
      setActiveAssignmentId(null)
      setOverId(null)
    }
  }, [dragEnabled])

  return {
    columnConfigs,
    sensors,
    collisionDetection: closestCenter,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleDragOver,
    isMobile,
    openColumns,
    toggleColumn,
    activeAssignmentId,
    overId,
    dragEnabled,
  }
}
