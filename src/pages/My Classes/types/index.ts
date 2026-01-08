import { Class } from '@/app/types'

export namespace ClassBoard {
    export interface Props {
        classes: Class[]
        onReorder: (classes: Class[]) => void
        onAddClass: () => void
        openEditClass: (id: string) => void
    }
    // ======================

    export interface EmptyStateProps {
        onAddClass: () => void
    }

    export namespace Card {
        export interface Props {
            classInfo: Class
            children: React.ReactNode
        }
        // ======================

        export interface ColorStripProps {
            color: string
        }
        export interface ContainerProps {
            children: React.ReactNode
        }

        export namespace Header {
            export interface Props {
                children: React.ReactNode
            }
            // ======================

            export interface TitleProps {
                name: string
            }
            export interface ButtonsProps {
                onEdit: () => void
                onDelete: () => void
            }
        }

        export namespace Body {
            export interface Props {
                children: React.ReactNode
            }
            // ======================

            export interface InstructorProps {
                teacherName?: string | null
            }
            export interface RoomProps {
                roomNumber?: string | number | null
            }
            export interface ColorProps {
                color?: string | null
            }
            export interface TermProps {
                termId?: string
                semesterId?: string
            }
        }
    }
}
