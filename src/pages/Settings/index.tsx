import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { todayString } from '@/app/lib/utils';
import ScheduleSettings from '@/pages/Settings/components/ScheduleSettings';
import DangerZone from '@/pages/Settings/components/DangerZone';
import ThemeSettings from '@/pages/Settings/components/ThemeSettings';
import AssignmentTypeSettings from '@/pages/Settings/components/AssignmentTypeSettings';
import './index.css';
import { APP_NAME, CURRENT_APP_VERSION, DEVELOPER_NAME } from '@/app/config/brand';

const Settings: React.FC = () => {
    const {
        openModal,
        setReferenceDayType,
        getDayTypeForDate,
        theme,
        setTheme: setThemeMode,
        assignmentTypes,
        addAssignmentType,
        removeAssignmentType,
        reorderAssignmentTypes
    } = useApp();
    const today = todayString();
    const currentDayType = getDayTypeForDate(today);

    return (
        <div className="max-w-2xl mx-auto">
            <ThemeSettings
                currentTheme={theme}
                onChangeTheme={setThemeMode}
            />

            <AssignmentTypeSettings
                types={assignmentTypes}
                onAddType={addAssignmentType}
                onRemoveType={removeAssignmentType}
                onReorderTypes={reorderAssignmentTypes}
            />

            <ScheduleSettings 
                currentDayType={currentDayType}
                onSetDayType={setReferenceDayType}
            />

            <DangerZone 
                onOpenClearAssignmentsModal={() => openModal('clear-assignments')}
                onOpenClearEventsModal={() => openModal('clear-events')}
                onOpenClearDataModal={() => openModal('clear-all-data')}
            />

            <div className="mt-8 text-center text-gray-500 text-sm">
                <p>{APP_NAME} (v{CURRENT_APP_VERSION}) – {DEVELOPER_NAME}</p>
            </div>
        </div>
    );
};

export default Settings;
