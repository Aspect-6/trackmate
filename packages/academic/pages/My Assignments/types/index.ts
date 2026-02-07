import { Assignment, Status, Class } from "@/app/types"

export namespace ActionBar {
	export interface Props {
		searchQuery: string
		onSearchChange: (value: string) => void
		typeFilter: string[]
		onTypeFilterChange: (values: string[]) => void
		priorityFilter: string[]
		onPriorityFilterChange: (values: string[]) => void
	}
	// ====================== 

	export interface FilterChipProps {
		label: string
		isActive: boolean
		onClick: () => void
		color?: string
	}
}

export namespace AssignmentColumn {
	export interface Props {
		status: Status
		title: string
		isMobile: boolean
		isOpen: boolean
		onToggle: () => void
		activeAssignmentId: string | null
		overId: string | null
		dragEnabled: boolean
		searchQuery?: string
		typeFilter?: string[]
		priorityFilter?: string[]
	}
	// ====================== 

	export interface HeaderProps {
		status: Status
		title: string
		totalCount: number
		isMobile: boolean
		isCollapsed: boolean
		onToggle: () => void
	}
	// ====================== 

	export namespace Body {
		export interface Props {
			status: Status
			items: Assignment[]
			droppableRef: (node: HTMLElement | null) => void
			isOver: boolean
			isMobile: boolean
			dragEnabled: boolean
			activeAssignmentId: string | null
			overId: string | null
		}
		// ====================== 

		export interface AssignmentCardProps {
			assignment: Assignment
			classInfo: Class
			dragEnabled: boolean
			onClick: (id: string) => void
		}
		export interface DragPlaceholderProps { }
	}
}

export interface AssignmentDragOverlayProps {
	assignmentId: string
}