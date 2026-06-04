import React from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { useModal } from "@/app/contexts/ModalContext"
import { useAcademicTerms } from "@/app/hooks/entities"
import { useCanvasIntegrationSettings } from "@/pages/Settings/hooks/useCanvasIntegrationSettings"
import { todayString } from "@shared/lib"
import { BaseModuleHeader, BaseModuleDescription } from "@/pages/Settings/components/BaseModule"
import ConnectionInput from "./ConnectionInput"
import ConnectionButton from "./ConnectionButton"
import SyncStatus from "./SyncStatus"
import SyncNowButton from "./SyncNowButton"
import CourseMappingTable from "./CourseMappingTable"
import DisconnectButton from "./DisconnectButton"
import { SETTINGS } from "@/app/styles/colors"

const CanvasIntegrationSettingsComponent: React.FC = () => {
    const { isPremium } = useAuth()
    const { openModal } = useModal()
    const { getActiveTermForDate, getTermById } = useAcademicTerms()
    const activeTermForToday = getActiveTermForDate(todayString())

    const {
        integration,
        icsUrl,
        setIcsUrl,
        isAnalyzing,
        analyzeError,
        handleAnalyze,
        isSyncing,
        handleSyncNow,
        setCanvasEnabled,
        updateCourseMappings,
        removeCanvasIntegration,
    } = useCanvasIntegrationSettings()

    let integrationTermActive = false
    if (integration) {
        const term = getTermById(integration.termId)
        if (term) {
            const today = todayString()
            integrationTermActive = today >= term.startDate && today <= term.endDate
        }
    }

    return (
        <div
            className="p-6 rounded-xl mb-6 shadow-md"
            style={{
                backgroundColor: SETTINGS.BACKGROUND_PRIMARY,
                border: `1px solid ${SETTINGS.BORDER_PRIMARY}`,
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <BaseModuleHeader title="Canvas Integration" />
            </div>

            <BaseModuleDescription className="mb-7">
                Automatically sync assignments from your live Canvas Calendar into TrackMate.
            </BaseModuleDescription>

            <div className="flex flex-col gap-4">
                {!integration ? (
                    !activeTermForToday ? (
                        <span style={{ color: SETTINGS.TEXT_TERTIARY }}>Must be in an active academic term to use this feature.</span>
                    ) : (
                        <div className="flex flex-col gap-3">
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
                        </div>
                    )
                ) : !integrationTermActive ? (
                    <>
                        <span style={{ color: SETTINGS.TEXT_TERTIARY }}>
                            Syncing is paused because the linked term has ended. Disconnect this integration to set up a new one.
                        </span>
                        <DisconnectButton onDisconnect={removeCanvasIntegration} />
                    </>
                ) : (
                    <>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2 mt-2">
                            <SyncStatus
                                enabled={isPremium ? integration.enabled : false}
                                onToggleEnabled={(val) => {
                                    if (!isPremium) {
                                        openModal("premium-upgrade", { title: "Upgrade to Sync Canvas" })
                                        return
                                    }
                                    setCanvasEnabled(val)
                                }}
                                lastSyncAt={integration.lastSyncAt}
                                lastSyncStatus={integration.lastSyncStatus}
                                lastSyncError={integration.lastSyncError}
                            />
                            <SyncNowButton
                                onSyncNow={() => {
                                    if (!isPremium) {
                                        openModal("premium-upgrade", { title: "Upgrade to Sync Canvas" })
                                        return
                                    }
                                    handleSyncNow()
                                }}
                                isSyncing={isSyncing}
                            />
                        </div>

                        <BaseModuleDescription className="!mb-0">
                            Map each of your Canvas courses to a currently existing TrackMate class.
                        </BaseModuleDescription>
                        <CourseMappingTable
                            termId={integration.termId}
                            mappings={integration.courseMappings}
                            isPremium={isPremium}
                            onUpgradeRequired={() => openModal("premium-upgrade", { title: "Upgrade to Edit Canvas Mappings" })}
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
            </div>
        </div>
    )
}

export default CanvasIntegrationSettingsComponent
