import React from "react"
import ThemeSettings from "@/pages/Settings/components/ThemeSettings"
import AssignmentTypeSettings from "@/pages/Settings/components/AssignmentTypeSettings"
import TemplateSettings from "@/pages/Settings/components/TemplateSettings"
import TermSettings from "@/pages/Settings/components/TermSettings"
import ScheduleSettings from "@/pages/Settings/components/ScheduleSettings"
import CanvasIntegrationSettings from "@/pages/Settings/components/CanvasIntegrationSettings"
import DangerZoneSettings from "@/pages/Settings/components/DangerZone"
import AppInfoFooter from "@/pages/Settings/components/AppInfoFooter"
import "./index.css"

const Settings: React.FC = () => {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <ThemeSettings />

            <AssignmentTypeSettings />

            <TemplateSettings />

            <TermSettings />

            <ScheduleSettings />

            <CanvasIntegrationSettings />

            <DangerZoneSettings />

            <AppInfoFooter />
        </div>
    )
}

export default Settings
