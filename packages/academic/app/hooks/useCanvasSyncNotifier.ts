import { useEffect, useRef } from "react"
import { useModal } from "@/app/contexts/ModalContext"
import { useSettings } from "@/app/hooks/useSettings"

export const useCanvasSyncNotifier = () => {
    const { settings } = useSettings()
    const { openModal, activeModal } = useModal()
    
    const hasRun = useRef(false)

    useEffect(() => {
        const newlyCreated = settings.canvasIntegration?.newlyAutoCreatedClasses

        if (!newlyCreated || newlyCreated.length === 0) {
            hasRun.current = false
            return
        }

        if (hasRun.current || activeModal) return

        hasRun.current = true
        const timeoutId = setTimeout(() => {
            openModal("canvas-auto-created-classes", newlyCreated)
        }, 1000)

        return () => clearTimeout(timeoutId)
    }, [settings.canvasIntegration?.newlyAutoCreatedClasses, activeModal, openModal])
}
