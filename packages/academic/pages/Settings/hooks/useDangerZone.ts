import { useCallback } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { deleteDocument } from "@shared/lib/firestore"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"

/**
 * Hook for dangerous bulk delete operations.
 * Used exclusively in the Settings Danger Zone.
 */
export const useDangerZone = () => {
    const { user } = useAuth()

    const deleteAllAssignments = useCallback(async (): Promise<void> => {
        if (!user) return
        await deleteDocument(user.uid, "academic", FIRESTORE_KEYS.ASSIGNMENTS)
        window.location.reload()
    }, [user])

    const deleteAllEvents = useCallback(async (): Promise<void> => {
        if (!user) return
        await deleteDocument(user.uid, "academic", FIRESTORE_KEYS.EVENTS)
        window.location.reload()
    }, [user])

    const clearAllData = useCallback(async (): Promise<void> => {
        if (!user) return

        // Delete documents
        await Promise.all([
            deleteDocument(user.uid, "academic", FIRESTORE_KEYS.ASSIGNMENTS),
            deleteDocument(user.uid, "academic", FIRESTORE_KEYS.CLASSES),
            deleteDocument(user.uid, "academic", FIRESTORE_KEYS.EVENTS),
            deleteDocument(user.uid, "academic", FIRESTORE_KEYS.NO_SCHOOL),
            deleteDocument(user.uid, "academic", FIRESTORE_KEYS.TERMS),
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
