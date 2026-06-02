import React, { useState } from "react"
import { useBreakpoints } from "@/app/hooks/ui/useBreakpoints"
import { useTemplateSettings } from "@/pages/Settings/hooks/useTemplateSettings"
import { TabSwitcher, Tab } from "@shared/components/TabSwitcher"
import { BaseModuleHeader, BaseModuleDescription } from "@/pages/Settings/components/BaseModule"
import TemplateList from "./TemplateList"
import TemplateListRow from "./TemplateListRow"
import AddTemplateButton from "./AddTemplateButton"
import NoTemplatesYetButton from "./NoTemplatesYetButton"
import { SETTINGS } from "@/app/styles/colors"

const TemplateSettings: React.FC = () => {
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

    const { isMobile } = useBreakpoints()

    return (
        <div
            className="settings-card p-5 sm:p-6 rounded-xl shadow-md mb-6 space-y-4"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
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

            <div className="flex flex-col gap-4">
                {activeTemplates.length === 0 ? (
                    <NoTemplatesYetButton onClick={activeAddTemplate}>
                        No {activeTemplateTab} templates yet.
                        {isMobile ? <br /> : " "}
                        Click to add one.
                    </NoTemplatesYetButton>
                ) : (
                    <>
                        <TemplateList
                            sensors={activeSensors}
                            onDragEnd={activeDragEnd}
                            items={activeTemplates.map(t => t.id)}
                        >
                            {activeTemplates.map(template => (
                                <TemplateListRow
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
            </div>
        </div>
    )
}

export default TemplateSettings
