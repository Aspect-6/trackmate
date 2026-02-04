import { useCachedFirestoreDoc, useCachedFirestoreItems } from "@shared/contexts/FirestoreCacheContext"
import { DocumentData } from "firebase/firestore"
import { type FirestoreKey } from "@/app/config/firestoreKeys"

/**
 * Hook for Firestore documents that store arrays of items.
 * Each entity (assignments, classes, etc.) is stored as a single document
 * with an `items` array, reducing reads from N to 1.
 * 
 * Used for: assignments, classes, terms, events, noSchool
 */
export function useFirestoreItems<T extends { id: string }>(key: FirestoreKey) {
    return useCachedFirestoreItems<T>("academic", key)
}

/**
 * Hook for Firestore documents (single objects).
 * Uses cached subscriptions that persist across navigations.
 * Used for: settings, schedules
 */
export function useFirestoreDoc<T extends DocumentData>(key: FirestoreKey, initialValue: T) {
    return useCachedFirestoreDoc<T>("academic", key, initialValue)
}
