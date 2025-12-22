import { Assignment, Status, Class } from "@/app/types"

export interface AssignmentCardContentProps {
  assignment: Assignment
  classColor: string
  className: string
  showGrip?: boolean
}

export interface AssignmentDragOverlayProps {
  assignmentId: string
  getClassById: (id: string) => Class
}

export namespace AssignmentBoard {
  export interface Props {
    status: Status
    title: string
    isMobile: boolean
    openColumns: Record<Status, boolean>
    toggleColumn: (status: Status) => void
    activeAssignmentId: string | null
    overId: string | null
    dragEnabled: boolean
  }
  // ======================

  export namespace Header {
    export interface Props {
      status: Status
      children: React.ReactNode
      isMobile: boolean
      openColumns: Record<Status, boolean>
      toggleColumn: (status: Status) => void
    }
    // ======================

    export interface TitleProps {
      status: Status
      children: React.ReactNode
      isMobile: boolean
      openColumns: Record<Status, boolean>
    }
    export interface AssignmentCountProps {
      status: Status
    }
  }

  export namespace Body {
    export interface Props {
      status: Status
      itemsInView: Assignment[]
      isMobile: boolean
      isCollapsed: boolean
      isOver: boolean
      droppableRef: (node: HTMLElement | null) => void
      children: React.ReactNode
    }
    // ======================

    export interface ListProps {
      items: Assignment[]
      showPlaceholder: boolean
      insertionIndex: number
      onAssignmentClick: (id: string) => void
      getClassById: (id: string) => Class
      dragEnabled: boolean
    }
    export interface AssignmentItemProps {
      assignment: Assignment
      onClick: (id: string) => void
      getClassById: (id: string) => Class
      dragEnabled: boolean
    }
  }
}

// Hooks
export namespace UseAssignmentBoard {
  export interface ColumnConfig {
    status: Status
    title: string
  }

  export interface DragState {
    activeAssignmentId: string | null
    overId: string | null
    dragEnabled: boolean
  }

  export interface ColumnState {
    isMobile: boolean
    openColumns: Record<Status, boolean>
    toggleColumn: (status: Status) => void
  }
}
