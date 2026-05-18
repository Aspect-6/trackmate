import React from "react"
import { Info } from "lucide-react"
import { MY_SCHEDULE } from "@/app/styles/colors"

export interface PeriodMismatchWarningProps {
    schedulePeriodCount: number
    settingsPeriodCount: number
}

const PeriodMismatchWarning: React.FC<PeriodMismatchWarningProps> = ({
    schedulePeriodCount,
    settingsPeriodCount,
}) => {
    if (schedulePeriodCount === settingsPeriodCount) {
        return null
    }

    return (
        <div
            className="flex items-center gap-2 text-sm rounded-lg px-4 py-3 mb-6"
            style={{
                color: MY_SCHEDULE.PRIORITY_MEDIUM_TEXT,
                backgroundColor: MY_SCHEDULE.PRIORITY_MEDIUM_BG,
                border: `1px solid ${MY_SCHEDULE.PRIORITY_MEDIUM_BORDER}`,
            }}
        >
            <Info className="w-4 h-4 shrink-0" />
            <span>
                This schedule was created with {schedulePeriodCount} period
                {schedulePeriodCount === 1 ? "" : "s"}, and your current setting is{" "}
                {settingsPeriodCount} period{settingsPeriodCount === 1 ? "" : "s"}. Updating the
                number of periods will still work identically.
            </span>
        </div>
    )
}

export default PeriodMismatchWarning
