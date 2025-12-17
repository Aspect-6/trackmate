import React from 'react';
import { ScheduleSettingsProps } from '@/pages/Settings/types';
import { GLOBAL, SETTINGS } from '@/app/styles/colors';

const ScheduleSettings: React.FC<ScheduleSettingsProps> = ({ currentDayType, onSetDayType }) => {
    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.MODULE_BG,
                border: `1px solid ${SETTINGS.MODULE_BORDER}`,
                boxShadow: SETTINGS.MODULE_SHADOW,
            }}
        >
            <h2 className="text-lg sm:text-xl font-bold" style={{ color: SETTINGS.SCHEDULE_SETTINGS_HEADER }}>
                Schedule Settings
            </h2>
            <p className="text-sm sm:text-base" style={{ color: SETTINGS.BODY_TEXT }}>
                Manually set the current day type to correct the A/B day rotation.
                Future days will alternate based on this setting.
            </p>

            <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-2 sm:gap-0"
                style={{ backgroundColor: SETTINGS.CARD_BG, borderColor: SETTINGS.CARD_BORDER }}
            >
                <span style={{ color: GLOBAL.TEXT_SECONDARY }}>Current Calculation for Today:</span>
                <span className={`font-bold ${currentDayType === 'A' ? 'text-day-a' : currentDayType === 'B' ? 'text-day-b' : 'text-gray-500'}`}>
                    {currentDayType ? `${currentDayType}-Day` : 'No School / Weekend'}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                <button
                    onClick={() => onSetDayType('A')}
                    className="w-full sm:flex-1 py-2 px-4 settings-button-a text-white rounded-lg font-medium"
                >
                    Set Today as A-Day
                </button>
                <button
                    onClick={() => onSetDayType('B')}
                    className="w-full sm:flex-1 py-2 px-4 settings-button-b text-white rounded-lg font-medium"
                >
                    Set Today as B-Day
                </button>
            </div>
        </div>
    );
};

export default ScheduleSettings;
