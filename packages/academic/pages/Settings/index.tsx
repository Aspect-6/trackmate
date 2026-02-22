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
    CurrentDayCalculation,
    SetDayTypeButton
} from "@/pages/Settings/components/ScheduleSettings"
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
} from "@/pages/Settings/components/TermSettings"
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
import { Sun, Moon, Download } from "lucide-react"
import { todayString, formatDate } from "@shared/lib"
import { SETTINGS } from "@/app/styles/colors"
import { db, auth } from "@shared/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import "./index.css"

const Settings: React.FC = () => {
    const { openModal } = useModal()
    const {
        schedules,
        setReferenceDayType,
        getDayTypeForDate
    } = useSchedules()

    const { theme, setTheme, termMode } = useSettings()

    const { filteredAcademicTerms, getActiveTermForDate } = useAcademicTerms(termMode)
    const { noSchoolPeriods } = useNoSchool()

    // Day type for today calculation
    const today = todayString()
    const activeTermForToday = getActiveTermForDate(today)
    const currentDayType = getDayTypeForDate(today, activeTermForToday, noSchoolPeriods)

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

                <BaseModuleDescription>
                    Select the kind of class schedule that your institution uses.
                </BaseModuleDescription>
                <ScheduleTypeDropdown className="mb-10">
                    <ScheduleTypeDropdownOption value="alternating-ab">Alternating A/B Days</ScheduleTypeDropdownOption>
                </ScheduleTypeDropdown>

                <BaseModuleDescription>
                    {schedules.type === "alternating-ab" &&
                        `Manually set the current day type to correct the A/B day rotation.
                        Future days will alternate based on this setting.`
                    }
                </BaseModuleDescription>
                <ScheduleSettingsContent>
                    {schedules.type === "alternating-ab" && (
                        <>
                            <CurrentDayCalculation currentDayType={currentDayType || ""} />

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                                <SetDayTypeButton dayType="A" onClick={() => setReferenceDayType("A", activeTermForToday?.id || "")}>
                                    Set Today as A-Day
                                </SetDayTypeButton>
                                <SetDayTypeButton dayType="B" onClick={() => setReferenceDayType("B", activeTermForToday?.id || "")}>
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

                <BaseModuleDescription className=" mb-7">
                    Define your school years and semesters to configure your schedule.
                </BaseModuleDescription>

                <div className="mt-4 mb-4">
                    <BaseModuleDescription>
                        Select the kind of academic terms your institution uses.
                    </BaseModuleDescription>
                    <TermModeDropdown
                        messages={{
                            "Semesters Only": "Fall and Spring semesters",
                            "Semesters With Quarters": "Four quarters (Q1-Q4) split into Fall and Spring semesters"
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
                                                quarters={term.termType === "Semesters With Quarters"
                                                    ? term.semesters.find(sem => sem.name === "Fall")!.quarters
                                                    : undefined
                                                }
                                            />
                                            <TermItemBodySemester
                                                name="Spring"
                                                startDate={term.semesters.find(sem => sem.name === "Spring")!.startDate}
                                                endDate={term.semesters.find(sem => sem.name === "Spring")!.endDate}
                                                quarters={term.termType === "Semesters With Quarters"
                                                    ? term.semesters.find(sem => sem.name === "Spring")!.quarters
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
