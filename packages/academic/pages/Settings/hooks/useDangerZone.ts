import { useCallback } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { setDocument, writeItemsDocument } from "@shared/lib/firestore"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"
import { DEFAULT_ASSIGNMENT_TYPES, DEFAULT_PERIOD_COUNT } from "@/app/hooks/useSettings"

/** Empty items document, used to reset entity documents. */
const EMPTY_ITEMS = { items: [] as unknown[] }

/** Default settings values, matching the shape required by security rules. */
const DEFAULT_SETTINGS = {
    theme: "light" as const,
    assignmentTypes: DEFAULT_ASSIGNMENT_TYPES,
    templates: [],
    periodCount: DEFAULT_PERIOD_COUNT,
}

/** Default schedules values, matching the shape required by security rules. */
const DEFAULT_SCHEDULES = {
    "alternating-ab": {
        termConfigs: {},
        terms: {}
    },
    "alternating-ab-semester": {
        termConfigs: {},
        terms: {}
    },
    "semester": {
        terms: {}
    },
    "fixed-weekly": {
        terms: {}
    }
}

/**
 * Hook for dangerous bulk reset operations.
 * Used exclusively in the Settings Danger Zone.
 */
export const useDangerZone = () => {
    const { user, isPremium } = useAuth()

    const deleteAllAssignments = useCallback(async (): Promise<void> => {
        if (!user) return
        await Promise.all([
            writeItemsDocument(FIRESTORE_KEYS.ASSIGNMENTS, EMPTY_ITEMS),
            writeItemsDocument(FIRESTORE_KEYS.ASSIGNMENTS_ARCHIVE, EMPTY_ITEMS),
            ...(isPremium ? [
                writeItemsDocument(FIRESTORE_KEYS.ASSIGNMENTS_PREMIUM, EMPTY_ITEMS),
                writeItemsDocument(FIRESTORE_KEYS.ASSIGNMENTS_PREMIUM_ARCHIVE, EMPTY_ITEMS),
            ] : []),
        ])
        window.location.reload()
    }, [user, isPremium])

    const deleteAllEvents = useCallback(async (): Promise<void> => {
        if (!user) return
        await Promise.all([
            writeItemsDocument(FIRESTORE_KEYS.EVENTS, EMPTY_ITEMS),
            writeItemsDocument(FIRESTORE_KEYS.EVENTS_ARCHIVE, EMPTY_ITEMS),
        ])
        window.location.reload()
    }, [user])

    const clearAllData = useCallback(async (): Promise<void> => {
        if (!user) return

        await Promise.all([
            writeItemsDocument(FIRESTORE_KEYS.ASSIGNMENTS, EMPTY_ITEMS),
            writeItemsDocument(FIRESTORE_KEYS.ASSIGNMENTS_ARCHIVE, EMPTY_ITEMS),
            writeItemsDocument(FIRESTORE_KEYS.CLASSES, EMPTY_ITEMS),
            writeItemsDocument(FIRESTORE_KEYS.EVENTS, EMPTY_ITEMS),
            writeItemsDocument(FIRESTORE_KEYS.EVENTS_ARCHIVE, EMPTY_ITEMS),
            writeItemsDocument(FIRESTORE_KEYS.NO_SCHOOL, EMPTY_ITEMS),
            writeItemsDocument(FIRESTORE_KEYS.TERMS, EMPTY_ITEMS),
            ...(isPremium ? [
                writeItemsDocument(FIRESTORE_KEYS.ASSIGNMENTS_PREMIUM, EMPTY_ITEMS),
                writeItemsDocument(FIRESTORE_KEYS.ASSIGNMENTS_PREMIUM_ARCHIVE, EMPTY_ITEMS),
            ] : []),
            setDocument(user.uid, "academic", FIRESTORE_KEYS.SCHEDULES, DEFAULT_SCHEDULES),
            setDocument(user.uid, "academic", FIRESTORE_KEYS.SETTINGS, DEFAULT_SETTINGS),
        ])

        window.location.reload()
    }, [user, isPremium])

    return {
        deleteAllAssignments,
        deleteAllEvents,
        clearAllData,
    }
}
