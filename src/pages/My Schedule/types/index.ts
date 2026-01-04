import { Class, DayType, Semester, SemesterScheduleData } from '@/app/types'

// ========================================
// Shared Type Aliases
// ========================================

/** Semester name type - reuses existing Semester interface */
export type SemesterName = Semester['name']

/** Non-nullable day type for A/B days */
export type ScheduleDayType = NonNullable<DayType>

// Re-export for convenience
export type { SemesterScheduleData }

/** Draft schedule containing term ID and both Fall and Spring semesters */
export interface DraftSchedule {
    termId: string | null
    Fall: SemesterScheduleData
    Spring: SemesterScheduleData
}

// ========================================
// DaySchedule Component Types (Old Schedule Page)
// ========================================

export namespace DaySchedule {
    export interface Props {
        children: React.ReactNode
    }
    // ======================

    export interface HeaderProps {
        title: string
    }

    export namespace Body {
        export interface Props {
            children: React.ReactNode
        }
        // ======================

        export interface ScheduleSlotProps {
            dayType: ScheduleDayType
            index: number
            classId: string | null
            getClassById: (id: string) => Class
            onRemove: (dayType: ScheduleDayType, index: number) => void
            onSelect: (dayType: ScheduleDayType, index: number) => void
        }

        export interface EmptySlotProps {
            onClick: () => void
        }

        export namespace FilledSlot {
            export interface Props {
                classInfo: Class
                children: React.ReactNode
            }
            // ======================

            export interface FilledSlotHeaderProps {
                name: string
                teacherName: string | null
            }

            export interface FilledSlotFooterProps {
                roomNumber: string | number | null
                onRemove: () => void
            }
        }
    }
}

// ========================================
// SemesterSchedule Component Types (New Schedule Page)
// ========================================

export namespace SemesterSchedule {
    export interface Props {
        title: string
        children: React.ReactNode
    }

    export namespace ScheduleTable {
        export interface Props {
            children: React.ReactNode
        }

        export namespace Row {
            export interface Props {
                isLastRow: boolean
                dayType: ScheduleDayType
                children: React.ReactNode
            }

            export interface EmptyCellProps {
                isLastRow: boolean
                onClick: () => void
            }

            export namespace FilledCell {
                export interface Props {
                    isLastRow: boolean
                    classData: Class
                    onRemove: () => void
                }

                export interface ClassNameProps {
                    name: string
                }

                export interface RoomNumberProps {
                    roomNumber: string
                }

                export interface RemoveButtonProps {
                    onClick: () => void
                }
            }
        }
    }
}
