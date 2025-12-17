import { DayType, ThemeMode } from '@/app/types';
import { AssignmentType } from '@/app/types';

export interface ScheduleSettingsProps {
    currentDayType: DayType;
    onSetDayType: (type: 'A' | 'B') => void;
}

export interface DangerZoneProps {
    onOpenClearAssignmentsModal: () => void;
    onOpenClearEventsModal: () => void;
    onOpenClearDataModal: () => void;
}

export interface ThemeSettingsProps {
    currentTheme: ThemeMode;
    onChangeTheme: (mode: ThemeMode) => void;
}

export interface AssignmentTypeSettingsProps {
    types: AssignmentType[];
    onAddType: (type: AssignmentType) => boolean;
    onRemoveType: (type: AssignmentType) => void;
    onReorderTypes: (types: AssignmentType[]) => void;
}
