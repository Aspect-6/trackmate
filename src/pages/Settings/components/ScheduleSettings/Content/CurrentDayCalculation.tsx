import React from 'react'
import type { ScheduleSettings } from '@/pages/Settings/types'
import { SETTINGS, GLOBAL } from '@/app/styles/colors'

const CurrentDayCalculation: React.FC<ScheduleSettings.Content.CurrentDayCalculationProps> = ({ currentDayType }) => {
    return (
        <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-2 sm:gap-0"
            style={{ backgroundColor: SETTINGS.CARD_BG, borderColor: SETTINGS.CARD_BORDER }}
        >
            <span style={{ color: GLOBAL.TEXT_SECONDARY }}>Current Calculation for Today:</span>
            <span className={`font-bold ${currentDayType === 'A' ? 'text-day-a' : currentDayType === 'B' ? 'text-day-b' : 'text-gray-500'}`}>
                {currentDayType ? `${currentDayType}-Day` : 'No School / Weekend'}
            </span>
        </div>
    )
}

export default CurrentDayCalculation
