import React from "react"
import type { FixedWeeklySchedule } from "@/pages/My Schedule/types"
import { DEFAULT_FIXED_WEEKLY_WEEKDAYS } from "@/app/lib/schedule"
import { MY_SCHEDULE } from "@/app/styles/colors"

const ScheduleTable: React.FC<FixedWeeklySchedule.ScheduleTable.Props> = ({ children }) => {
    const lastDayIndex = DEFAULT_FIXED_WEEKLY_WEEKDAYS.length - 1

    return (
        <div className="overflow-x-auto custom-scrollbar p-1">
            <div
                className="overflow-x-hidden shadow-sm rounded-lg w-full"
                style={{
                    border: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                    minWidth: "max-content"
                }}
            >
                <table
                    className="w-full"
                    style={{
                        borderCollapse: "separate",
                        borderSpacing: 0
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: MY_SCHEDULE.BACKGROUND_PRIMARY }}>
                            {DEFAULT_FIXED_WEEKLY_WEEKDAYS.map((day, dayIndex) => (
                                <th
                                    key={day}
                                    className="p-3 text-center font-semibold text-sm"
                                    style={{
                                        color: MY_SCHEDULE.TEXT_SECONDARY,
                                        borderBottom: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                                        borderRight: dayIndex < lastDayIndex
                                            ? `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`
                                            : undefined,
                                    }}
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ScheduleTable
