import { useCallback } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { clearCollection, deleteDocument } from "@shared/lib/firestore"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"

/**
 * Hook for dangerous bulk delete operations.
 * Used exclusively in the Settings Danger Zone.
 */
export const useDangerZone = () => {
    const { user } = useAuth()

    const deleteAllAssignments = useCallback(async (): Promise<void> => {
        if (!user) return
        await clearCollection(user.uid, "academic", FIRESTORE_KEYS.ASSIGNMENTS)
        window.location.reload()
    }, [user])

    const deleteAllEvents = useCallback(async (): Promise<void> => {
        if (!user) return
        await clearCollection(user.uid, "academic", FIRESTORE_KEYS.EVENTS)
        window.location.reload()
    }, [user])

    const clearAllData = useCallback(async (): Promise<void> => {
        if (!user) return
        
        // Clear all collections
        await Promise.all([
            clearCollection(user.uid, "academic", FIRESTORE_KEYS.ASSIGNMENTS),
            clearCollection(user.uid, "academic", FIRESTORE_KEYS.CLASSES),
            clearCollection(user.uid, "academic", FIRESTORE_KEYS.EVENTS),
            clearCollection(user.uid, "academic", FIRESTORE_KEYS.NO_SCHOOL),
            clearCollection(user.uid, "academic", FIRESTORE_KEYS.TERMS),
        ])
        
        // Delete documents
        await Promise.all([
            deleteDocument(user.uid, "academic", FIRESTORE_KEYS.SCHEDULES),
            deleteDocument(user.uid, "academic", FIRESTORE_KEYS.SETTINGS),
        ])
        
        window.location.reload()
    }, [user])

    return {
        deleteAllAssignments,
        deleteAllEvents,
        clearAllData,
    }
}
