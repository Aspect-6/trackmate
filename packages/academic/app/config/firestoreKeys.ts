/**
 * Firestore collection and document keys for all persisted data.
 * These map directly to Firestore path segments under users/{userId}/academic/
 */

export const FIRESTORE_KEYS = {
    // Collections (arrays of items with `id` fields)
    ASSIGNMENTS: "assignments",
    CLASSES: "classes",
    TERMS: "terms",
    EVENTS: "events",
    NO_SCHOOL: "noSchool",
    
    // Documents (single objects)
    SCHEDULES: "schedules",
    SETTINGS: "settings",
} as const

export type FirestoreKey = typeof FIRESTORE_KEYS[keyof typeof FIRESTORE_KEYS]

// Keys that are collections (vs documents)
export const COLLECTION_KEYS: FirestoreKey[] = [
    FIRESTORE_KEYS.ASSIGNMENTS,
    FIRESTORE_KEYS.CLASSES,
    FIRESTORE_KEYS.TERMS,
    FIRESTORE_KEYS.EVENTS,
    FIRESTORE_KEYS.NO_SCHOOL,
]
