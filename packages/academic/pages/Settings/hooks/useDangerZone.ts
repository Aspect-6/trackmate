import { useCallback } from "react"
import { STORAGE_KEYS } from "@/app/config/storageKeys"

/**
 * Hook for dangerous bulk delete operations.
 * Used exclusively in the Settings Danger Zone.
 */
export const useDangerZone = () => {
    const deleteAllAssignments = useCallback((): void => {
        localStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS)
        window.location.reload()
    }, [])

    const deleteAllEvents = useCallback((): void => {
        localStorage.removeItem(STORAGE_KEYS.EVENTS)
        window.location.reload()
    }, [])

    const clearAllData = useCallback((): void => {
        localStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS)
        localStorage.removeItem(STORAGE_KEYS.CLASSES)
        localStorage.removeItem(STORAGE_KEYS.SCHEDULES)
        localStorage.removeItem(STORAGE_KEYS.EVENTS)
        localStorage.removeItem(STORAGE_KEYS.NO_SCHOOL)
        localStorage.removeItem(STORAGE_KEYS.TERMS)
        localStorage.removeItem(STORAGE_KEYS.SETTINGS)
        window.location.reload()
    }, [])

    return {
        deleteAllAssignments,
        deleteAllEvents,
        clearAllData,
    }
}
