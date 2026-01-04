import { Assignment, Class, Status, Event, NoSchoolPeriod } from '@/app/types'

export namespace AssignmentCard {
    export interface Props {
        assignment: Assignment
    }
    // ======================

    export interface MobileFooterProps {
        assignment: Assignment
    }
    export interface StatusButtonProps {
        status: string
        isCompleting: boolean
        onClick: (e: React.MouseEvent) => void
    }
    export namespace Details {
        export interface Props {
            children: React.ReactNode
        }
        // ======================
        export interface TitleProps {
            status: Status
            children: React.ReactNode
        }
        export namespace Body {
            export interface Props {
                children: React.ReactNode
            }
            // ======================
            export interface AssignmentDetailsClassProps {
                assignmentClass: Class
            }
            export interface AssignmentDetailsDueProps {
                assignment: Assignment
            }
        }
    }
}

export namespace TodaysClasses {
    export interface Props {
        classIds: (string | null)[]
        noSchool?: NoSchoolPeriod
        getClassById: (id: string) => Class
        openModal: (modalType: string, id?: string) => void
        isMobile?: boolean
        isCollapsed?: boolean
        onToggleCollapse?: () => void
    }
    // ======================

    export interface HeaderProps {
        isMobile?: boolean
        isCollapsed?: boolean
        onToggleCollapse?: () => void
    }
    export namespace Body {
        export interface Props {
            isMobile?: boolean
            isCollapsed?: boolean
            children: React.ReactNode
        }
        // ======================
        export interface NoClassesScheduledProps { }
        export interface NoSchoolProps {
            noSchool: NoSchoolPeriod
        }
        export namespace ClassList {
            export interface Props {
                classIds: (string | null)[]
                getClassById: (id: string) => Class
                openModal: (modalType: string, id?: string) => void
            }
            // ======================
            export interface ClassItemProps {
                classInfo: Class
                period: number
                openModal: (modalType: string, id?: string) => void
            }
        }
    }
}

export namespace TodaysEvents {
    export interface Props {
        events: Event[]
        onEventClick: (id: string) => void
        isMobile?: boolean
        isCollapsed?: boolean
        onToggleCollapse?: () => void
    }
    // ======================

    export interface HeaderProps {
        isMobile?: boolean
        isCollapsed?: boolean
        onToggleCollapse?: () => void
    }
    export namespace Body {
        export interface Props {
            isMobile?: boolean
            isCollapsed?: boolean
            children: React.ReactNode
        }
        // ======================
        export interface NoEventsScheduledProps {}
        export namespace EventList {
            export interface Props {
                events: Event[]
                onEventClick: (id: string) => void
            }
            // ======================
            export interface EventItemProps {
                event: Event
                onClick: () => void
            }
        }
    }
}