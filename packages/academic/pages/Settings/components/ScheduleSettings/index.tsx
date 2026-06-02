import React from "react"
import { useAcademicTerms, useSchedules, useNoSchool } from "@/app/hooks/entities"
import { todayString } from "@shared/lib"
import { isAlternatingAB } from "@/app/lib/schedule"
import { BaseModuleHeader, BaseModuleDescription } from "@/pages/Settings/components/BaseModule"
import ScheduleTypeDropdown from "./ScheduleTypeDropdown"
import ScheduleTypeDropdownOption from "./ScheduleTypeDropdown/ScheduleTypeDropdownOption"
import PeriodCountDropdown from "./PeriodCountDropdown"
import CurrentDayCalculation from "./CurrentDayCalculation"
import SetDayTypeButton from "./SetDayTypeButton"
import { SETTINGS } from "@/app/styles/colors"

const ScheduleSettingsComponent: React.FC = () => {
    const {
        setReferenceDayType,
        getDayTypeForDate
    } = useSchedules()

    const { getActiveTermForDate } = useAcademicTerms()
    const { noSchoolPeriods } = useNoSchool()

    const today = todayString()
    const activeTermForToday = getActiveTermForDate(today)
    const currentDayType = getDayTypeForDate(today, activeTermForToday, noSchoolPeriods)
    const activeScheduleType = activeTermForToday?.scheduleType
    const showAlternatingABScheduleSettings = isAlternatingAB(activeScheduleType)
    const showPeriodCountSettings = activeScheduleType !== "fixed-weekly"

    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl shadow-md mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            <BaseModuleHeader title="Schedule Settings" />
            <BaseModuleDescription className="mb-7">
                Configure how your schedule is calculated for every day.
            </BaseModuleDescription>

            {!activeTermForToday ? (
                <span style={{ color: SETTINGS.TEXT_TERTIARY }}>Must be in an active academic term to use this feature.</span>
            ) : (
                <>
                    <BaseModuleDescription>
                        Select the kind of class schedule that your institution uses.
                    </BaseModuleDescription>
                    <ScheduleTypeDropdown className={showAlternatingABScheduleSettings || showPeriodCountSettings ? "mb-10" : undefined}>
                        <ScheduleTypeDropdownOption value="alternating-ab">Alternating A/B Days</ScheduleTypeDropdownOption>
                        <ScheduleTypeDropdownOption value="alternating-ab-semester">Alternating A/B Days + Semester</ScheduleTypeDropdownOption>
                        <ScheduleTypeDropdownOption value="semester">Semester</ScheduleTypeDropdownOption>
                        <ScheduleTypeDropdownOption value="fixed-weekly">Fixed Weekly</ScheduleTypeDropdownOption>
                    </ScheduleTypeDropdown>

                    {showAlternatingABScheduleSettings && (
                        <>
                            <BaseModuleDescription>
                                Manually set the current day type to correct the A/B day rotation.
                                Future days will alternate based on this setting.
                            </BaseModuleDescription>
                            <div className="flex flex-col gap-4">
                                <CurrentDayCalculation currentDayType={currentDayType || ""} />

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full mb-10">
                                    <SetDayTypeButton dayType="A" onClick={() => setReferenceDayType("A", activeTermForToday.id, activeScheduleType!, todayString())}>
                                        Set Today as A-Day
                                    </SetDayTypeButton>
                                    <SetDayTypeButton dayType="B" onClick={() => setReferenceDayType("B", activeTermForToday.id, activeScheduleType!, todayString())}>
                                        Set Today as B-Day
                                    </SetDayTypeButton>
                                </div>
                            </div>
                        </>
                    )}

                    {showPeriodCountSettings && (
                        <>
                            <BaseModuleDescription>
                                Set the number of class periods in your daily schedule.
                            </BaseModuleDescription>
                            <PeriodCountDropdown />
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default ScheduleSettingsComponent
