import React from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { BaseModuleHeader, BaseModuleDescription } from "@/pages/Settings/components/BaseModule"
import DangerZoneBadge from "./DangerZoneBadge"
import DangerZoneRow from "./DangerRow"
import DangerZoneRowDetails from "./DangerRowDetails"
import DangerZoneRowButton from "./DangerRowButton"
import { SETTINGS } from "@/app/styles/colors"

const DangerZoneSettings: React.FC = () => {
    const { openModal } = useModal()

    return (
        <div
            className="p-6 rounded-xl shadow-md max-w-4xl mx-auto"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
                <BaseModuleHeader title="Danger Zone" color={SETTINGS.TEXT_DANGER} />
                <DangerZoneBadge>Irreversible</DangerZoneBadge>
            </div>
            <BaseModuleDescription>
                Permanently delete your data. These actions cannot be undone.
            </BaseModuleDescription>

            <div className="flex flex-col gap-2">
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
            </div>
        </div>
    )
}

export default DangerZoneSettings
