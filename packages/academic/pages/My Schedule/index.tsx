import React from "react"
import { useHover } from "@shared/hooks/ui/useHover"
import { useFocus } from "@shared/hooks/ui/useFocus"
import { useScheduleComponents } from "@/app/contexts/ScheduleComponentsContext"
import { useScheduleData } from "./hooks/useScheduleData"
import { MY_SCHEDULE } from "@/app/styles/colors"

import "./index.css"

const MySchedule: React.FC = () => {
    const {
        selectedTermId,
        setTermId,
        filteredAcademicTerms,
        arrowStyle
    } = useScheduleData()

    const { ScheduleRenderer } = useScheduleComponents()
    const { isHovered, hoverProps } = useHover()
    const { isFocused, focusProps } = useFocus()

    return (
        <div className="my-schedule-page flex flex-col">
            <div
                className="overflow-x-hidden p-6 rounded-xl shadow-md flex flex-col transition-colors overflow-auto"
                style={{
                    border: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}`,
                    backgroundColor: MY_SCHEDULE.BACKGROUND_PRIMARY,
                }}
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                    <h2 className="text-xl font-bold flex flex-wrap items-baseline gap-2" style={{ color: MY_SCHEDULE.TEXT_PRIMARY }}>
                        <span>Schedule for</span>
                        <select
                            value={selectedTermId || ""}
                            onChange={(e) => setTermId(e.target.value || null)}
                            className="bg-right max-w-full text-ellipsis appearance-none outline-none bg-no-repeat cursor-pointer"
                            style={{
                                ...arrowStyle,
                                color: MY_SCHEDULE.GLOBAL_ACCENT,
                                borderBottom: `2px ${(isHovered || isFocused) ? "solid" : "dashed"} ${isFocused ? MY_SCHEDULE.GLOBAL_ACCENT : MY_SCHEDULE.BORDER_PRIMARY}`,
                                backgroundSize: "1em 1em",
                                padding: "0 1.25rem 0.125rem 0",
                            }}
                            {...hoverProps}
                            {...focusProps}
                        >
                            {filteredAcademicTerms.length === 0 && <option value="">no terms available</option>}
                            {filteredAcademicTerms.length > 0 && filteredAcademicTerms.map(term => (
                                <option key={term.id} value={term.id}>
                                    {term.name}
                                </option>
                            ))}
                        </select>
                    </h2>
                </div>

                <div
                    className="-mx-6 mb-6"
                    style={{ borderBottom: `1px solid ${MY_SCHEDULE.BORDER_PRIMARY}` }}
                />

                {!selectedTermId ? (
                    <div
                        className="text-center py-12"
                        style={{ color: MY_SCHEDULE.TEXT_TERTIARY }}
                    >
                        <p className="text-lg">
                            {filteredAcademicTerms.length === 0
                                ? "Add an academic term in Settings to get started."
                                : "Select an academic term to view and edit your schedule."}
                        </p>
                    </div>
                ) : ScheduleRenderer ? (
                    <ScheduleRenderer selectedTermId={selectedTermId} />
                ) : null}
            </div>
        </div>
    )
}

export default MySchedule
