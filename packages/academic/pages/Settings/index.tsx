import React, { useState, useCallback } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useAcademicTerms, useSchedules, useNoSchool } from "@/app/hooks/entities"
import { useSettings } from "@/app/hooks/useSettings"
import { useAssignmentTypeSettings } from "@/pages/Settings/hooks/useAssignmentTypeSettings"
import { useTemplateSettings } from "@/pages/Settings/hooks/useTemplateSettings"
import { TabSwitcher, Tab } from "@shared/components/TabSwitcher"
// Base settings module imports
import {
    BaseModuleHeader,
    BaseModuleDescription
} from "@/pages/Settings/components/BaseModule"
// Theme settings imports
import ThemeSettings, {
    ThemeSettingsContent,
    ThemeButton
} from "@/pages/Settings/components/ThemeSettings"
// Assignment type settings imports
import AssignmentTypeSettings, {
    AssignmentTypeSettingsContent,
    AssignmentTypeList,
    AssignmentTypeListRow,
    AddTypeForm,
    AddTypeInput,
    AddTypeButton
} from "@/pages/Settings/components/AssignmentTypeSettings"
// Assignment template settings imports
import TemplateSettings, {
    TemplateSettingsContent,
    TemplateList,
    TemplateRow,
    AddTemplateButton,
    NoTemplatesYetButton
} from "@/pages/Settings/components/TemplateSettings"
// Schedule settings imports
import ScheduleSettings, {
    ScheduleSettingsContent,
    ScheduleTypeDropdown,
    ScheduleTypeDropdownOption,
    PeriodCountDropdown,
    CurrentDayCalculation,
    SetDayTypeButton
} from "@/pages/Settings/components/ScheduleSettings"
// Term settings imports
import TermSettings, {
    TermSettingsContent,
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
} from "@/pages/Settings/components/TermSettings"
// Canvas integration imports
import CanvasIntegrationSettings, {
    CanvasIntegrationContent,
    ConnectionForm,
    ConnectionInput,
    ConnectionButton,
    SyncStatus,
    CourseMappingTable,
    DisconnectButton,
    SyncNowButton
} from "@/pages/Settings/components/CanvasIntegrationSettings"
import { useCanvasIntegrationSettings } from "@/pages/Settings/hooks/useCanvasIntegrationSettings"
// Danger zone settings imports
import DangerZoneSettings, {
    DangerZoneBadge,
    DangerZoneSettingsContent,
    DangerZoneRow,
    DangerZoneRowDetails,
    DangerZoneRowButton
} from "@/pages/Settings/components/DangerZone"
// App info footer import
import AppInfoFooter from "@/pages/Settings/components/AppInfoFooter"
// Other imports
import { collection, getDocs } from "firebase/firestore"
import { todayString, formatDate, db, auth } from "@shared/lib"
import { isAlternatingAB } from "@/app/lib/schedule"
import { Sun, Moon, Download } from "lucide-react"
import { SETTINGS } from "@/app/styles/colors"
import "./index.css"

const Settings: React.FC = () => {
    const { openModal } = useModal()
    const {
        setReferenceDayType,
        getDayTypeForDate
    } = useSchedules()

    const { theme, setTheme } = useSettings()

    const { academicTerms, getActiveTermForDate } = useAcademicTerms()
    const { noSchoolPeriods } = useNoSchool()

    // Day type for today calculation
    const today = todayString()
    const activeTermForToday = getActiveTermForDate(today)
    const currentDayType = getDayTypeForDate(today, activeTermForToday, noSchoolPeriods)
    const activeScheduleType = activeTermForToday?.scheduleType
    const showAlternatingABScheduleSettings = isAlternatingAB(activeScheduleType)
    const showPeriodCountSettings = activeScheduleType !== "fixed-weekly"

    const {
        assignmentTypes,
        newType,
        sensors,
        setNewType,
        handleAdd,
        handleRemove,
        handleDragEnd,
        moveType,
    } = useAssignmentTypeSettings()

    const [activeTemplateTab, setActiveTemplateTab] = useState<"assignment" | "event">("assignment")

    const {
        templates: assignmentTemplates,
        sensors: assignmentTemplateSensors,
        handleAddTemplate: handleAddAssignmentTemplate,
        handleEditTemplate: handleEditAssignmentTemplate,
        handleRemoveTemplate: handleRemoveAssignmentTemplate,
        handleDragEnd: handleAssignmentTemplateDragEnd,
    } = useTemplateSettings("assignment")

    const {
        templates: eventTemplates,
        sensors: eventTemplateSensors,
        handleAddTemplate: handleAddEventTemplate,
        handleEditTemplate: handleEditEventTemplate,
        handleRemoveTemplate: handleRemoveEventTemplate,
        handleDragEnd: handleEventTemplateDragEnd,
    } = useTemplateSettings("event")

    const isAssignmentTab = activeTemplateTab === "assignment"
    const activeTemplates = isAssignmentTab ? assignmentTemplates : eventTemplates
    const activeSensors = isAssignmentTab ? assignmentTemplateSensors : eventTemplateSensors
    const activeDragEnd = isAssignmentTab ? handleAssignmentTemplateDragEnd : handleEventTemplateDragEnd
    const activeAddTemplate = isAssignmentTab ? handleAddAssignmentTemplate : handleAddEventTemplate

    const {
        integration,
        isAnalyzing,
        analyzeError,
        isSyncing,
        handleAnalyze,
        handleSyncNow,
        setCanvasEnabled,
        updateCourseMappings,
        removeCanvasIntegration,
        icsUrl,
        setIcsUrl
    } = useCanvasIntegrationSettings()

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
                        active={theme === "light"}
                        onClick={() => setTheme("light")}
                    />
                    <ThemeButton
                        label="Dark Mode"
                        description="Soft glow for relaxed eyes."
                        Icon={Moon}
                        active={theme === "dark"}
                        onClick={() => setTheme("dark")}
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
                                onMoveUp={() => moveType(type, "up")}
                                onMoveDown={() => moveType(type, "down")}
                                onRemove={() => handleRemove(type)}
                            />
                        ))}
                    </AssignmentTypeList>

                    <AddTypeForm>
                        <AddTypeInput value={newType} onChange={setNewType} />
                        <AddTypeButton onClick={handleAdd}>Add Type</AddTypeButton>
                    </AddTypeForm>
                </AssignmentTypeSettingsContent>
            </AssignmentTypeSettings>

            <TemplateSettings>
                <BaseModuleHeader title="Templates" />

                <BaseModuleDescription>
                    Create reusable templates to quickly add recurring assignments or events.
                </BaseModuleDescription>

                <div className="mb-6 mt-2">
                    <TabSwitcher ariaLabel="Template types">
                        <Tab value="assignment" isActive={activeTemplateTab === "assignment"} onClick={() => setActiveTemplateTab("assignment")}>
                            Assignments
                        </Tab>
                        <Tab value="event" isActive={activeTemplateTab === "event"} onClick={() => setActiveTemplateTab("event")}>
                            Events
                        </Tab>
                    </TabSwitcher>
                </div>

                <TemplateSettingsContent>
                    {activeTemplates.length === 0 ? (
                        <NoTemplatesYetButton onClick={activeAddTemplate}>
                            No {activeTemplateTab} templates yet. Click to add one.
                        </NoTemplatesYetButton>
                    ) : (
                        <>
                            <TemplateList
                                sensors={activeSensors}
                                onDragEnd={activeDragEnd}
                                items={activeTemplates.map(t => t.id)}
                            >
                                {activeTemplates.map(template => (
                                    <TemplateRow
                                        key={template.id}
                                        template={template}
                                        onEdit={() => template.kind === "assignment" ? handleEditAssignmentTemplate(template.id) : handleEditEventTemplate(template.id)}
                                        onRemove={() => template.kind === "assignment" ? handleRemoveAssignmentTemplate(template.id) : handleRemoveEventTemplate(template.id)}
                                    />
                                ))}
                            </TemplateList>

                            <AddTemplateButton onClick={activeAddTemplate}>
                                Add {isAssignmentTab ? "Assignment" : "Event"} Template
                            </AddTemplateButton>
                        </>
                    )}
                </TemplateSettingsContent>
            </TemplateSettings>

            <ScheduleSettings>
                <BaseModuleHeader title="Schedule Settings" />
                <BaseModuleDescription className="mb-7">
                    Configure how your schedule is calculated for every day.
                </BaseModuleDescription>

                {!activeTermForToday ? (
                    <span style={{ color: SETTINGS.TEXT_TERTIARY }}>No active term. Must be in an active term to use this feature.</span>
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
                                <ScheduleSettingsContent>
                                    <CurrentDayCalculation currentDayType={currentDayType || ""} />

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full mb-10">
                                        <SetDayTypeButton dayType="A" onClick={() => setReferenceDayType("A", activeTermForToday.id, activeScheduleType!, todayString())}>
                                            Set Today as A-Day
                                        </SetDayTypeButton>
                                        <SetDayTypeButton dayType="B" onClick={() => setReferenceDayType("B", activeTermForToday.id, activeScheduleType!, todayString())}>
                                            Set Today as B-Day
                                        </SetDayTypeButton>
                                    </div>
                                </ScheduleSettingsContent>
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
            </ScheduleSettings>

            <TermSettings>
                <div className="flex items-center justify-between mb-4">
                    <BaseModuleHeader title="Academic Terms" />
                </div>

                <BaseModuleDescription className="mb-4">
                    Define your school years and semesters to configure your schedule.
                </BaseModuleDescription>

                <TermSettingsContent>
                    {academicTerms.length === 0 ? (
                        <NoTermsYetButton>
                            No academic terms yet. Click to add term.
                        </NoTermsYetButton>
                    ) : (
                        <>
                            <TermList>
                                {academicTerms.map((term) => (
                                    <TermItem key={term.id}>
                                        <TermItemHeader>
                                            <div className="flex flex-col gap-1">
                                                <TermItemHeaderName>{term.name}</TermItemHeaderName>
                                                <TermItemHeaderDates>{formatDate("medium", term.startDate)} — {formatDate("medium", term.endDate)}</TermItemHeaderDates>
                                            </div>
                                            <div className="flex items-center gap-1 -mr-2 -mt-2">
                                                <TermItemHeaderEditButton term={term} />
                                                <TermItemHeaderDeleteButton term={term} />
                                            </div>
                                        </TermItemHeader>

                                        <TermItemBody>
                                            <TermItemBodySemester
                                                name="Fall"
                                                startDate={term.semesters.find(sem => sem.name === "Fall")!.startDate}
                                                endDate={term.semesters.find(sem => sem.name === "Fall")!.endDate}
                                            />
                                            <TermItemBodySemester
                                                name="Spring"
                                                startDate={term.semesters.find(sem => sem.name === "Spring")!.startDate}
                                                endDate={term.semesters.find(sem => sem.name === "Spring")!.endDate}
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

            <CanvasIntegrationSettings>
                <div className="flex items-center justify-between mb-4">
                    <BaseModuleHeader title="Canvas Integration" />
                </div>

                <BaseModuleDescription className="mb-7">
                    Automatically sync assignments from your live Canvas Calendar into TrackMate.
                </BaseModuleDescription>

                <CanvasIntegrationContent>
                    {!integration ? (
                        !activeTermForToday ? (
                            <span style={{ color: SETTINGS.TEXT_TERTIARY }}>No active term. Must be in an active term to use this feature.</span>
                        ) : (
                            <ConnectionForm>
                                <BaseModuleDescription className="!mb-0">Canvas ICS URL</BaseModuleDescription>
                                <ConnectionInput value={icsUrl} onChange={setIcsUrl} />
                                {analyzeError && <div className="text-red-500 text-sm">{analyzeError}</div>}
                                <ConnectionButton
                                    onClick={() => handleAnalyze(activeTermForToday.id)}
                                    disabled={!icsUrl}
                                    isAnalyzing={isAnalyzing}
                                >
                                    Analyze Feed
                                </ConnectionButton>
                            </ConnectionForm>
                        )
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2 mt-2">
                                <SyncStatus
                                    enabled={integration.enabled}
                                    onToggleEnabled={setCanvasEnabled}
                                    lastSyncAt={integration.lastSyncAt}
                                    lastSyncStatus={integration.lastSyncStatus}
                                    lastSyncError={integration.lastSyncError}
                                />
                                <SyncNowButton
                                    onSyncNow={handleSyncNow}
                                    isSyncing={isSyncing}
                                />
                            </div>

                            <BaseModuleDescription className="!mb-0">
                                Map each of your Canvas courses to a currently existing TrackMate class.
                            </BaseModuleDescription>
                            <CourseMappingTable
                                termId={integration.termId}
                                mappings={integration.courseMappings}
                                onMappingChange={(idx, newClassId) => {
                                    const newMappings = [...integration.courseMappings]
                                    const target = newMappings[idx]
                                    if (target) {
                                        target.classId = newClassId
                                        updateCourseMappings(newMappings)
                                    }
                                }}
                            />

                            <DisconnectButton onDisconnect={removeCanvasIntegration} />
                        </>
                    )}
                </CanvasIntegrationContent>
            </CanvasIntegrationSettings>

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
                        <DangerZoneRowButton onClick={() => openModal("delete-assignments")}>
                            Delete All
                        </DangerZoneRowButton>
                    </DangerZoneRow>
                    <DangerZoneRow>
                        <DangerZoneRowDetails title="Delete All Events">
                            Delete every calendar event from your account.
                        </DangerZoneRowDetails>
                        <DangerZoneRowButton onClick={() => openModal("delete-events")}>
                            Delete All
                        </DangerZoneRowButton>
                    </DangerZoneRow>
                    <DangerZoneRow>
                        <DangerZoneRowDetails title="Clear All Data">
                            Clear all data from your account. There is no going back.
                        </DangerZoneRowDetails>
                        <DangerZoneRowButton onClick={() => openModal("clear-all-data")}>
                            Clear All
                        </DangerZoneRowButton>
                    </DangerZoneRow>
                </DangerZoneSettingsContent>
            </DangerZoneSettings>

            {/* DEV ONLY: Export all Firestore data */}
            <ExportFirestoreButton />

            <AppInfoFooter />
        </div>
    )
}

const ExportFirestoreButton: React.FC = () => {
    const [exporting, setExporting] = useState(false)

    const handleExport = useCallback(async () => {
        const user = auth.currentUser
        if (!user) {
            alert("Not logged in")
            return
        }

        setExporting(true)
        try {
            const academicRef = collection(db, "users", user.uid, "academic")
            const snapshot = await getDocs(academicRef)

            const data: Record<string, unknown> = {}
            snapshot.forEach(docSnap => {
                data[docSnap.id] = docSnap.data()
            })

            const blob = new Blob(
                [JSON.stringify(data, null, 2)],
                { type: "application/json" }
            )
            const url = URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = `trackmate-export-${new Date().toISOString().slice(0, 10)}.json`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error("Export failed:", err)
            alert("Export failed — check console")
        } finally {
            setExporting(false)
        }
    }, [])

    return (
        <div style={{
            margin: "32px 0 16px",
            padding: "16px",
            border: "2px dashed #f59e0b",
            borderRadius: "12px",
            background: "rgba(245, 158, 11, 0.06)"
        }}>
            <div style={{ fontSize: "12px", color: "#f59e0b", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Dev Tool
            </div>
            <button
                onClick={handleExport}
                disabled={exporting}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    background: exporting ? "#6b7280" : "#f59e0b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: exporting ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                    width: "100%",
                    justifyContent: "center"
                }}
            >
                <Download size={16} />
                {exporting ? "Exporting…" : "Export All Firestore Data"}
            </button>
        </div>
    )
}

export default Settings
