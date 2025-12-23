import { AssignmentType, DayType } from '@/app/types'
import { DragEndEvent, SensorDescriptor, SensorOptions } from '@dnd-kit/core'
import { LucideIcon } from 'lucide-react'

// SettingsModule namespace
export namespace BaseSettingsModule {
    export interface HeaderProps {
        title: string
        color?: string
        className?: string
    }
    export interface DescriptionProps {
        children: React.ReactNode
    }
}

// ThemeSettings namespace
export namespace ThemeSettings {
    export interface Props {
        children: React.ReactNode
    }
    // ======================

    export namespace Content {
        export interface Props {
            children: React.ReactNode
        }
        // ======================
        export interface ThemeButtonProps {
            label: string
            description: string
            Icon: LucideIcon
            active: boolean
            onClick: () => void
        }
    }
}

// AssignmentTypeSettings namespace
export namespace AssignmentTypeSettings {
    export interface Props {
        children: React.ReactNode
    }
    // ======================

    export namespace Content {
        export interface Props {
            children: React.ReactNode
        }
        // ======================

        export namespace AssignmentTypeList {
            export interface Props {
                sensors: SensorDescriptor<SensorOptions>[]
                onDragEnd: (event: DragEndEvent) => void
                items: string[]
                children: React.ReactNode
            }
            // ======================
            export interface AssignmentTypeListRowProps {
                type: AssignmentType
                isFirst: boolean
                isLast: boolean
                isOnly: boolean
                onMoveUp: () => void
                onMoveDown: () => void
                onRemove: () => void
            }
        }
        export namespace AddTypeForm {
            export interface Props {
                children: React.ReactNode
            }
            // ======================

            export interface AddTypeInputProps {
                value: string
                onChange: (value: string) => void
                placeholder?: string
            }
            export interface AddTypeButtonProps {
                onClick: () => void
                children: React.ReactNode
            }
        }
    }
}

// ScheduleSettings namespace
export namespace ScheduleSettings {
    export interface Props {
        children: React.ReactNode
    }
    // ======================

    export namespace Content {
        export interface Props {
            children: React.ReactNode
        }
        // ======================

        export interface CurrentDayCalculationProps {
            currentDayType: string
        }
        export interface SetDayTypeButtonProps {
            dayType: NonNullable<DayType>
            onClick: () => void
            children: React.ReactNode
        }
    }
}

// DangerZone namespace
export namespace DangerZone {
    export interface Props {
        children: React.ReactNode
    }
    // ======================

    export interface BadgeProps {
        children: React.ReactNode
    }

    export namespace Content {
        export interface Props {
            children: React.ReactNode
        }
        // ======================

        export namespace DangerRow {
            export interface Props {
                children: React.ReactNode
            }
            // ======================

            export interface DetailsProps {
                title: string
                children: React.ReactNode
            }
            export interface ButtonProps {
                onClick: () => void
                children: React.ReactNode
            }
        }
    }
}