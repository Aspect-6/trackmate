import React from "react"
import type { AlternatingDaysSchedule } from "@/pages/My Schedule/types"
import { MY_SCHEDULE } from "@/app/styles/colors"

const ScheduleTable: React.FC<AlternatingDaysSchedule.ScheduleTable.Props> = ({ periodCount, children }) => {
    const periods = Array.from({ length: periodCount }, (_, i) => i + 1)

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
                            <th
                                className="p-3 text-left font-semibold text-sm"
                                style={{
                                    color: MY_SCHEDULE.TEXT_SECONDARY,
                                    borderBottom: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                                    borderRight: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`
                                }}
                            >
                                Day
                            </th>
                            {periods.map((period, index) => (
                                <th
                                    key={period}
                                    className="p-3 text-center font-semibold text-sm"
                                    style={{
                                        color: MY_SCHEDULE.TEXT_SECONDARY,
                                        borderBottom: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                                        borderRight: index < periodCount - 1 ? `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}` : "none"
                                    }}
                                >
                                    Period {period}
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
