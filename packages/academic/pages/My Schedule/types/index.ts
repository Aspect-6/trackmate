import { Class, AlternatingABDayType, Semester } from "@/app/types"

/** Semester name type */
export type SemesterName = Semester["name"]

/** Non-nullable day type for A/B days */
export type ScheduleDayType = NonNullable<AlternatingABDayType>

export namespace AlternatingDaysSchedule {
    export interface Props {
        title: string
        children: React.ReactNode
    }

    export namespace ScheduleTable {
        export interface Props {
            periodCount: number
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
                showColumnDivider?: boolean
                trailingOverlay?: React.ReactNode
            }

            export namespace FilledCell {
                export interface Props {
                    isLastRow: boolean
                    classData: Class
                    onRemove: () => void
                    showColumnDivider?: boolean
                    trailingOverlay?: React.ReactNode
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

export namespace SemesterSchedule {
    export interface Props {
        title?: string
        children: React.ReactNode
    }

    export namespace ScheduleTable {
        export interface Props {
            periodCount: number
            children: React.ReactNode
        }

        export namespace Row {
            export interface Props {
                isLastRow: boolean
                semester: SemesterName
                children: React.ReactNode
            }
        }
    }
}

export namespace FixedWeeklySchedule {
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
                children: React.ReactNode
            }
        }

        export namespace FooterRow {
            export interface Props {
                onAddRow: () => void
                onRemoveLastRow: () => void
                showRemoveLastRow: boolean
            }
        }

        export namespace AddRowButton {
            export interface Props {
                onClick: () => void
            }
        }

        export namespace RemoveLastRowButton {
            export interface Props {
                onClick: () => void
            }
        }
    }
}
