import React from "react"
import type { ScheduleSettings } from "@/pages/Settings/types"
import { SETTINGS, GLOBAL } from "@/app/styles/colors"

const CurrentDayCalculation: React.FC<ScheduleSettings.Content.CurrentDayCalculationProps> = ({ currentDayType }) => {
    return (
        <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-2 sm:gap-0"
            style={{ backgroundColor: SETTINGS.BACKGROUND_SECONDARY, borderColor: SETTINGS.BORDER_PRIMARY }}
        >
            <span style={{ color: GLOBAL.TEXT_SECONDARY }}>Current Calculation for Today:</span>
            <span style={{ color: currentDayType === "A" ? SETTINGS.TEXT_A_DAY : currentDayType === "B" ? SETTINGS.TEXT_B_DAY : GLOBAL.TEXT_TERTIARY }}>
                {currentDayType ? `${currentDayType}-Day` : "No School / Weekend"}
            </span>
        </div>
    )
}

export default CurrentDayCalculation
