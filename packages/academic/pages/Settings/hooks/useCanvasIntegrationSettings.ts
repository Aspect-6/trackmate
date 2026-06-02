import { useState } from "react"
import { useToast } from "@shared/contexts/ToastContext"
import { useModal } from "@/app/contexts/ModalContext"
import { useSettings } from "@/app/hooks/useSettings"
import { httpsCallable } from "firebase/functions"
import { functions } from "@shared/lib/firebase"

export const useCanvasIntegrationSettings = () => {
    const { settings, setCanvasEnabled, updateCourseMappings, removeCanvasIntegration } = useSettings()
    const { openModal } = useModal()
    const { showToast } = useToast()
    
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analyzeError, setAnalyzeError] = useState<string | null>(null)
    const [isSyncing, setIsSyncing] = useState(false)
    
    const [icsUrl, setIcsUrl] = useState("")
    
    const integration = settings.canvasIntegration

    const handleAnalyze = async (termId: string) => {
        if (!icsUrl) {
            showToast("Please enter a valid ICS URL", "error")
            return
        } else if (!icsUrl.endsWith(".ics") || !icsUrl.includes("/feeds/calendars/")) {
            showToast("Please enter a valid ICS URL", "error")
            return
        }

        if (!termId) {
            showToast("Must be in an active term to use this feature", "error")
            return
        }
        setIsAnalyzing(true)
        setAnalyzeError(null)
        try {
            const fetchCanvasCourses = httpsCallable(functions, "fetchCanvasCourses")
            
            const result = await fetchCanvasCourses({ icsUrl })
            const data = result.data as { courses: string[] }
            
            openModal("canvas-initial-mapping", {
                courses: data.courses,
                icsUrl,
                termId
            })
        } catch (err: any) {
            console.error("Analysis failed:", err)
            setAnalyzeError(err.message || "Failed to analyze feed.")
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleSyncNow = async () => {
        setIsSyncing(true)
        try {
            const syncCanvasCalendarNow = httpsCallable(functions, "syncCanvasCalendarNow")
            await syncCanvasCalendarNow()
        } catch (err) {
            console.error("Sync failed:", err)
        } finally {
            setIsSyncing(false)
        }
    }

    return {
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
    }
}
