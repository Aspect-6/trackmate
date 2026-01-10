import React from 'react'
import { useApp } from '@/app/contexts/AppContext'
import { useAcademicTerms } from '@/app/hooks/entities'
import { useAssignmentTypeSettings } from '@/pages/Settings/hooks/useAssignmentTypeSettings'
// Base settings module imports
import {
    BaseModuleHeader,
    BaseModuleDescription
} from '@/pages/Settings/components/BaseModule'
// Theme settings imports
import ThemeSettings, {
    ThemeSettingsContent,
    ThemeButton
} from '@/pages/Settings/components/ThemeSettings'
// Assignment type settings imports
import AssignmentTypeSettings, {
    AssignmentTypeSettingsContent,
    AssignmentTypeList,
    AssignmentTypeListRow,
    AddTypeForm,
    AddTypeInput,
    AddTypeButton
} from '@/pages/Settings/components/AssignmentTypeSettings'
// Schedule settings imports
import ScheduleSettings, {
    ScheduleSettingsContent,
    ScheduleTypeDropdown,
    ScheduleTypeDropdownOption,
    CurrentDayCalculation,
    SetDayTypeButton
} from '@/pages/Settings/components/ScheduleSettings'
// Term settings imports
import TermSettings, {
    TermSettingsContent,
    TermModeDropdown,
    TermModeDropdownOption,
    TermList,
    TermItem,
    TermItemHeader,
    TermItemHeaderName,
    TermItemHeaderDates,
    TermItemHeaderEditButton,
    TermItemHeaderDeleteButton,
    TermItemBody,
    TermItemBodySemester,
    AddTermButton,
    NoTermsYetButton
} from '@/pages/Settings/components/TermSettings'
// Danger zone settings imports
import DangerZoneSettings, {
    DangerZoneBadge,
    DangerZoneSettingsContent,
    DangerZoneRow,
    DangerZoneRowDetails,
    DangerZoneRowButton
} from '@/pages/Settings/components/DangerZone'
// App info footer import
import AppInfoFooter from '@/pages/Settings/components/AppInfoFooter'
// Other imports
import { Sun, Moon } from 'lucide-react'
import { todayString, formatDate } from '@/app/lib/utils'
import { SETTINGS } from '@/app/styles/colors'
import './index.css'

const Settings: React.FC = () => {
    const {
        openModal,
        setReferenceDayType,
        getDayTypeForDate,
        theme,
        setTheme: setThemeMode,
        schedules
    } = useApp()

    const { filteredAcademicTerms } = useAcademicTerms()

    const {
        assignmentTypes,
        newType,
        sensors,
        setNewType,
        handleAdd,
        handleDragEnd,
        moveType,
        removeAssignmentType
    } = useAssignmentTypeSettings()

    const today = todayString()
    const currentDayType = getDayTypeForDate(today)

    return (
        <div className="w-full max-w-2xl mx-auto">
            <ThemeSettings>
                <BaseModuleHeader title="Theme" className="mb-4" />
                <BaseModuleDescription>
                    Choose the color theme TrackMate should use across the entire app.
                </BaseModuleDescription>

                <ThemeSettingsContent>
                    <ThemeButton
                        label="Light Mode"
                        description="Bright, paper-like interface"
                        Icon={Sun}
                        active={theme === 'light'}
                        onClick={() => setThemeMode('light')}
                    />
                    <ThemeButton
                        label="Dark Mode"
                        description="Soft glow for relaxed eyes."
                        Icon={Moon}
                        active={theme === 'dark'}
                        onClick={() => setThemeMode('dark')}
                    />
                </ThemeSettingsContent>
            </ThemeSettings>

            <AssignmentTypeSettings>
                <BaseModuleHeader title="Assignment Types" className="mb-4" />
                <BaseModuleDescription>
                    Reorder, add, or remove the items that show up in assignment type dropdowns.
                </BaseModuleDescription>

                <AssignmentTypeSettingsContent>
                    <AssignmentTypeList sensors={sensors} onDragEnd={handleDragEnd} items={assignmentTypes}>
                        {assignmentTypes.map((type, index) => (
                            <AssignmentTypeListRow
                                key={type}
                                type={type}
                                isFirst={index === 0}
                                isLast={index === assignmentTypes.length - 1}
                                isOnly={assignmentTypes.length === 1}
                                onMoveUp={() => moveType(type, 'up')}
                                onMoveDown={() => moveType(type, 'down')}
                                onRemove={() => removeAssignmentType(type)}
                            />
                        ))}
                    </AssignmentTypeList>

                    <AddTypeForm>
                        <AddTypeInput value={newType} onChange={setNewType} />
                        <AddTypeButton onClick={handleAdd}>Add Type</AddTypeButton>
                    </AddTypeForm>
                </AssignmentTypeSettingsContent>
            </AssignmentTypeSettings>

            <ScheduleSettings>
                <BaseModuleHeader title="Schedule Settings" />

                <BaseModuleDescription>
                    Select the kind of class schedule that your institution uses.
                </BaseModuleDescription>
                <ScheduleTypeDropdown className='mb-10'>
                    <ScheduleTypeDropdownOption value="alternating-ab">Alternating A/B Days</ScheduleTypeDropdownOption>
                </ScheduleTypeDropdown>

                <BaseModuleDescription>
                    {schedules.type === 'alternating-ab' &&
                        `Manually set the current day type to correct the A/B day rotation.
                        Future days will alternate based on this setting.`
                    }
                </BaseModuleDescription>
                <ScheduleSettingsContent>
                    {schedules.type === 'alternating-ab' && (
                        <>
                            <CurrentDayCalculation currentDayType={currentDayType || ''} />

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                                <SetDayTypeButton dayType="A" onClick={() => setReferenceDayType('A')}>
                                    Set Today as A-Day
                                </SetDayTypeButton>
                                <SetDayTypeButton dayType="B" onClick={() => setReferenceDayType('B')}>
                                    Set Today as B-Day
                                </SetDayTypeButton>
                            </div>
                        </>
                    )}
                </ScheduleSettingsContent>
            </ScheduleSettings>

            <TermSettings>
                <div className="flex items-center justify-between mb-4">
                    <BaseModuleHeader title="Academic Terms" />
                </div>
                {/* <BaseModuleDescription className=' mb-7'>
                    Define your school years and semesters to organize your schedule.
                </BaseModuleDescription> */}

                {/* Term Mode Selector */}
                <div className="mt-4 mb-4">
                    <BaseModuleDescription>
                        Select the kind of academic terms your institution uses.
                    </BaseModuleDescription>
                    <TermModeDropdown
                        messages={{
                            'Semesters Only': 'Fall and Spring semesters',
                            'Semesters With Quarters': 'Four quarters (Q1-Q4) split into Fall and Spring semesters'
                        }}
                    >
                        <TermModeDropdownOption value="Semesters Only">Semesters Only</TermModeDropdownOption>
                        <TermModeDropdownOption value="Semesters With Quarters">Semesters With Quarters</TermModeDropdownOption>
                    </TermModeDropdown>
                </div>

                <TermSettingsContent>
                    {filteredAcademicTerms.length === 0 ? (
                        <NoTermsYetButton>
                            No academic terms yet. Click to add term.
                        </NoTermsYetButton>
                    ) : (
                        <>
                            <TermList>
                                {filteredAcademicTerms.map((term) => (
                                    <TermItem key={term.id}>
                                        <TermItemHeader>
                                            <div className="flex flex-col gap-1">
                                                <TermItemHeaderName>{term.name}</TermItemHeaderName>
                                                <TermItemHeaderDates>{formatDate('medium', term.startDate)} — {formatDate('medium', term.endDate)}</TermItemHeaderDates>
                                            </div>
                                            <div className="flex items-center gap-1 -mr-2 -mt-2">
                                                <TermItemHeaderEditButton term={term} />
                                                <TermItemHeaderDeleteButton term={term} />
                                            </div>
                                        </TermItemHeader>

                                        <TermItemBody>
                                            <TermItemBodySemester
                                                name="Fall"
                                                startDate={term.semesters.find(sem => sem.name === 'Fall')!.startDate}
                                                endDate={term.semesters.find(sem => sem.name === 'Fall')!.endDate}
                                                quarters={term.termType === 'Semesters With Quarters'
                                                    ? term.semesters.find(sem => sem.name === 'Fall')!.quarters
                                                    : undefined
                                                }
                                            />
                                            <TermItemBodySemester
                                                name="Spring"
                                                startDate={term.semesters.find(sem => sem.name === 'Spring')!.startDate}
                                                endDate={term.semesters.find(sem => sem.name === 'Spring')!.endDate}
                                                quarters={term.termType === 'Semesters With Quarters'
                                                    ? term.semesters.find(sem => sem.name === 'Spring')!.quarters
                                                    : undefined
                                                }
                                            />
                                        </TermItemBody>
                                    </TermItem>
                                ))}
                            </TermList>
                            <AddTermButton>Add Term</AddTermButton>
                        </>
                    )}
                </TermSettingsContent>
            </TermSettings>

            <DangerZoneSettings>
                <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
                    <BaseModuleHeader title="Danger Zone" color={SETTINGS.TEXT_DANGER} />
                    <DangerZoneBadge>Irreversible</DangerZoneBadge>
                </div>
                <BaseModuleDescription>
                    Permanently delete your data. These actions cannot be undone.
                </BaseModuleDescription>

                <DangerZoneSettingsContent>
                    <DangerZoneRow>
                        <DangerZoneRowDetails title="Delete All Assignments">
                            Delete every assignment from your account.
                        </DangerZoneRowDetails>
                        <DangerZoneRowButton onClick={() => openModal('clear-assignments')}>
                            Delete All
                        </DangerZoneRowButton>
                    </DangerZoneRow>
                    <DangerZoneRow>
                        <DangerZoneRowDetails title="Delete All Events">
                            Delete every calendar event from your account.
                        </DangerZoneRowDetails>
                        <DangerZoneRowButton onClick={() => openModal('clear-events')}>
                            Delete All
                        </DangerZoneRowButton>
                    </DangerZoneRow>
                    <DangerZoneRow>
                        <DangerZoneRowDetails title="Clear All Data">
                            Clear all data from your account. There is no going back.
                        </DangerZoneRowDetails>
                        <DangerZoneRowButton onClick={() => openModal('clear-all-data')}>
                            Clear All
                        </DangerZoneRowButton>
                    </DangerZoneRow>
                </DangerZoneSettingsContent>
            </DangerZoneSettings>

            <AppInfoFooter />
        </div>
    )
}

export default Settings
