import { useCachedFirestoreDoc, useCachedFirestoreCollection } from "@shared/contexts/FirestoreCacheContext"
import { DocumentData } from "firebase/firestore"
import { type FirestoreKey } from "@/app/config/firestoreKeys"

/**
 * Hook for Firestore collections (arrays of items with `id` fields).
 * Uses cached subscriptions that persist across navigations.
 * Used for: assignments, classes, terms, events, noSchool
 */
export function useFirestoreCollection<T extends { id: string }>(key: FirestoreKey, initialValue: T[]) {
    return useCachedFirestoreCollection<T>("academic", key, initialValue)
}

/**
 * Hook for Firestore documents (single objects).
 * Uses cached subscriptions that persist across navigations.
 * Used for: settings, schedules
 */
export function useFirestoreDoc<T extends DocumentData>(key: FirestoreKey, initialValue: T) {
    return useCachedFirestoreDoc<T>("academic", key, initialValue)
}
