import { AssignmentType, DayType, AcademicTerm } from "@/app/types"
import { DragEndEvent, SensorDescriptor, SensorOptions } from "@dnd-kit/core"
import { LucideIcon } from "lucide-react"

// SettingsModule namespace
export namespace BaseSettingsModule {
    export interface HeaderProps {
        title: string
        color?: string
        className?: string
    }
    export interface DescriptionProps {
        className?: string
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

// TermSettings namespace
export namespace TermSettings {
    export interface Props {
        children: React.ReactNode
    }
    // ======================

    export namespace Content {
        export interface Props {
            children: React.ReactNode
        }
        // ======================

        export namespace TermList {
            export interface Props {
                children: React.ReactNode
            }
            // ======================
            export namespace TermItem {
                export interface Props {
                    children: React.ReactNode
                }
                // ======================
                export namespace Header {
                    export interface Props {
                        children: React.ReactNode
                    }
                    // ======================
                    export interface NameProps {
                        children: React.ReactNode
                    }
                    export interface DatesProps {
                        children: React.ReactNode
                    }
                    export interface EditButtonProps {
                        term: AcademicTerm
                    }
                    export interface DeleteButtonProps {
                        term: AcademicTerm
                    }
                }

                export namespace Body {
                    export interface Props {
                        children: React.ReactNode
                    }
                    // ======================
                    export interface SemesterProps {
                        name: string
                        startDate: string
                        endDate: string
                        /** Quarters to display (only shown if provided) */
                        quarters?: Array<{
                            id: string
                            name: string
                            startDate: string
                            endDate: string
                        }>
                    }
                }
            }
        }

        export namespace TermModeDropdown {
            export interface Props {
                className?: string
                children: React.ReactNode
                /** Map of option values to their description messages */
                messages: Record<import("@/app/types").TermMode, string>
            }
            // ======================
            export interface OptionProps {
                value: string
                children: React.ReactNode
            }
        }

        export interface NoTermsYetButtonProps {
            children: React.ReactNode
        }
        export interface AddTermButtonProps {
            children: React.ReactNode
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

        export namespace ScheduleTypeDropdown {
            export interface Props {
                className?: string
                children: React.ReactNode
            }
            // ======================
            export interface OptionProps {
                value: string
                children: React.ReactNode
            }
        }

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