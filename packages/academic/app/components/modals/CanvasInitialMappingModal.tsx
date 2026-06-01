import React, { useState } from "react"
import { useFocus } from "@shared/hooks/ui/useFocus"
import { useSettings } from "@/app/hooks/useSettings"
import { useClasses, useAcademicTerms } from "@/app/hooks/entities"
import { httpsCallable } from "firebase/functions"
import { functions } from "@shared/lib/firebase"
import {
    ModalContainer,
    ModalHeader,
    ModalFooter,
    ModalBodyText,
    ModalSubmitButton,
    ModalCancelButton,
} from "@shared/components/modal"
import { GLOBAL, MODALS } from "@/app/styles/colors"

interface CanvasInitialMappingModalProps {
    onClose: () => void
    data: {
        courses: string[]
        icsUrl: string
        termId: string
    }
}

export const CanvasInitialMappingModal: React.FC<CanvasInitialMappingModalProps> = ({ onClose, data }) => {
    const { isFocused, focusProps } = useFocus()
    const { setCanvasIntegration } = useSettings()
    const { classes } = useClasses()
    const { getTermById } = useAcademicTerms()
    const [isSyncing, setIsSyncing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [mappings, setMappings] = useState<Record<string, string>>(
        data.courses.reduce((acc, course) => ({ ...acc, [course]: "CREATE_NEW" }), {})
    )

    const handleSelectChange = (course: string, value: string) => {
        setMappings(prev => ({ ...prev, [course]: value }))
    }

    const handleStartSyncing = async () => {
        setIsSyncing(true)
        setError(null)
        try {
            const courseMappings = Object.entries(mappings)
                .filter(([_, classId]) => classId !== "CREATE_NEW")
                .map(([canvasCourseName, classId]) => ({
                    canvasCourseName,
                    classId
                }))
            
            const config = {
                icsUrl: data.icsUrl,
                termId: data.termId,
                courseMappings,
                lastSyncAt: null,
                lastSyncStatus: "never" as const,
                lastSyncError: null,
                enabled: true,
                newlyAutoCreatedClasses: [],
                deletedCanvasUids: [],
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York"
            }
            
            setCanvasIntegration(config)
            
            // Trigger initial sync
            const syncCanvasCalendarNow = httpsCallable(functions, "syncCanvasCalendarNow")
            await syncCanvasCalendarNow()
            
            onClose()
        } catch (err: any) {
            console.error("Failed to sync:", err)
            setError(err.message || "An error occurred while syncing.")
            setIsSyncing(false)
        }
    }

    return (
        <ModalContainer>
            <ModalHeader color={MODALS.CLASS.HEADING}>
                Match Your Canvas Courses
            </ModalHeader>
            <ModalBodyText>
                We found the following courses in your Canvas Calendar.
                For each course, choose an existing TrackMate class in the term <strong>{getTermById(data.termId).name}</strong>
                to map it to, or select "Create New Class".
            </ModalBodyText>

            <div className="mt-4 max-h-[40vh] overflow-y-auto space-y-3 p-1">
                {data.courses.map(course => (
                    <div key={course} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border" style={{ borderColor: GLOBAL.BORDER_PRIMARY, backgroundColor: GLOBAL.BACKGROUND_SECONDARY }}>
                        <span className="font-medium text-sm truncate" style={{ color: GLOBAL.TEXT_PRIMARY }}>{course}</span>
                        <select
                            className="app-select-dropdown text-xs p-2 rounded basis-1/2"
                            style={{ 
                                backgroundColor: GLOBAL.BACKGROUND_PRIMARY, 
                                border: `1px solid ${isFocused ? MODALS.CLASS.PRIMARY_BG : GLOBAL.BORDER_PRIMARY}`,
                                color: GLOBAL.TEXT_PRIMARY,
                            }}
                            value={mappings[course]}
                            onChange={(e) => handleSelectChange(course, e.target.value)}
                            {...focusProps}
                        >
                            <option value="IGNORE">Do Not Sync</option>
                            <option value="CREATE_NEW">+ Create New Class</option>
                            <optgroup label="Existing Classes">
                                {classes.filter(c => c.termId === data.termId).map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                ))}
                {data.courses.length === 0 && (
                    <div className="text-sm italic" style={{ color: GLOBAL.TEXT_TERTIARY }}>No courses found in the feed.</div>
                )}
            </div>

            <div className="mt-4 p-3 rounded-lg border text-sm" style={{ backgroundColor: GLOBAL.BACKGROUND_QUATERNARY, borderColor: GLOBAL.BORDER_PRIMARY, color: GLOBAL.TEXT_PRIMARY }}>
                <strong>Note:</strong> All assignments synced from Canvas will be created with status <em>"To Do"</em> and priority <em>"Low"</em>. This is due to limitations on the data provided by Canvas calendar feeds. You can change these values after syncing.
            </div>

            {error && (
                <div className="mt-4 text-red-500 text-sm">{error}</div>
            )}

            <ModalFooter>
                <ModalCancelButton onClick={onClose}>
                    Cancel
                </ModalCancelButton>
                <ModalSubmitButton
                    type="button"
                    onClick={handleStartSyncing}
                    bgColor={MODALS.CLASS.PRIMARY_BG}
                    bgColorHover={MODALS.CLASS.PRIMARY_BG_HOVER}
                    textColor={MODALS.CLASS.PRIMARY_TEXT}
                >
                    {isSyncing ? "Syncing..." : "Start Syncing"}
                </ModalSubmitButton>
            </ModalFooter>
        </ModalContainer>
    )
}
