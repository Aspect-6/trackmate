import { AssignmentType, AlternatingABDayType, AcademicTerm, Template } from "@/app/types"
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
    export interface ThemeButtonProps {
        label: string
        description: string
        Icon: LucideIcon
        active: boolean
        onClick: () => void
    }
}

// AssignmentTypeSettings namespace
export namespace AssignmentTypeSettings {
    export interface AssignmentTypeListProps {
        sensors: SensorDescriptor<SensorOptions>[]
        onDragEnd: (event: DragEndEvent) => void
        items: string[]
        children: React.ReactNode
    }
    export interface AssignmentTypeListRowProps {
        type: AssignmentType
        isFirst: boolean
        isLast: boolean
        isOnly: boolean
        onMoveUp: () => void
        onMoveDown: () => void
        onRemove: () => void
    }
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

// TemplateSettings namespace
export namespace TemplateSettings {
    export interface TemplateListProps {
        sensors: SensorDescriptor<SensorOptions>[]
        onDragEnd: (event: DragEndEvent) => void
        items: string[]
        children: React.ReactNode
    }
    export interface TemplateListRowProps {
        template: Template
        onEdit: () => void
        onRemove: () => void
    }
    export interface NoTemplatesYetButtonProps {
        onClick: () => void
        children: React.ReactNode
    }
    export interface AddTemplateButtonProps {
        onClick: () => void
        children: React.ReactNode
    }
}

// TermSettings namespace
export namespace TermSettings {
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
            }
        }
    }

    export interface NoTermsYetButtonProps {
        children: React.ReactNode
    }
    export interface AddTermButtonProps {
        children: React.ReactNode
    }
}

// ScheduleSettings namespace
export namespace ScheduleSettings {
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

    export interface PeriodCountDropdownProps {
        className?: string
    }
    export interface CurrentDayCalculationProps {
        currentDayType: string
    }
    export interface SetDayTypeButtonProps {
        dayType: NonNullable<AlternatingABDayType>
        onClick: () => void
        children: React.ReactNode
    }
}

// CanvasIntegrationSettings namespace
export namespace CanvasIntegrationSettings {
    export interface ConnectionInputProps {
        value: string
        onChange: (value: string) => void
    }
    export interface ConnectionButtonProps {
        onClick: () => void
        disabled: boolean
        isAnalyzing: boolean
        children: React.ReactNode
    }
    export interface SyncStatusProps {
        enabled: boolean
        onToggleEnabled: (enabled: boolean) => void
        lastSyncAt: string | null
        lastSyncStatus: string
        lastSyncError: string | null
    }
    export interface SyncNowButtonProps {
        onSyncNow: () => void
        isSyncing: boolean
    }
    export interface CourseMappingTableProps {
        termId: string
        mappings: { canvasCourseName: string, classId: string }[]
        isPremium?: boolean
        onUpgradeRequired?: () => void
        onMappingChange: (index: number, newClassId: string) => void
    }
    export interface DisconnectButtonProps {
        onDisconnect: () => void
    }
}

// DangerZone namespace
export namespace DangerZone {
    export interface BadgeProps {
        children: React.ReactNode
    }
    export interface DangerRowProps {
        children: React.ReactNode
    }
    export interface DangerRowDetailsProps {
        title: string
        children: React.ReactNode
    }
    export interface DangerRowButtonProps {
        onClick: () => void
        children: React.ReactNode
    }
}