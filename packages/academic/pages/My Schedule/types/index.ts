import { Class, DayType, Semester } from "@/app/types"

/** Semester name type */
export type SemesterName = Semester["name"]

/** Non-nullable day type for A/B days */
export type ScheduleDayType = NonNullable<DayType>

export namespace AlternatingDaysSchedule {
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
