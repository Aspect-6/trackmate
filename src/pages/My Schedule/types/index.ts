import { Class, DayType } from '@/app/types'

export interface FilledSlotProps {
    classInfo: Class
    onRemove: () => void
}

export interface EmptySlotProps {
    onClick: () => void
}

export interface ScheduleSlotProps {
    dayType: NonNullable<DayType>
    index: number
    classId: string | null
    getClassById: (id: string) => Class | undefined
    onRemove: (dayType: NonNullable<DayType>, index: number) => void
    onSelect: (dayType: NonNullable<DayType>, index: number) => void
}

export interface DayScheduleProps {
    title: string
    dayType: NonNullable<DayType>
    scheduleIds: (string | null)[]
    getClassById: (id: string) => Class | undefined
    onRemove: (dayType: NonNullable<DayType>, index: number) => void
    onSelect: (dayType: NonNullable<DayType>, index: number) => void
}
