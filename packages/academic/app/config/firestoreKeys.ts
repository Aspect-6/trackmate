/**
 * Firestore collection and document keys for all persisted data.
 * These map directly to Firestore path segments under users/{userId}/academic/
 */

export const FIRESTORE_KEYS = {
    // Entity documents (arrays of items stored as { items: T[] })
    ASSIGNMENTS: "assignments",
    CLASSES: "classes",
    TERMS: "terms",
    EVENTS: "events",
    NO_SCHOOL: "noSchool",

    // Premium entity documents (require premium claim to write)
    ASSIGNMENTS_PREMIUM: "assignments-premium",
    ASSIGNMENTS_PREMIUM_ARCHIVE: "assignments-premium-archive",

    // Archive documents (old completed assignments and past events)
    ASSIGNMENTS_ARCHIVE: "assignments-archive",
    EVENTS_ARCHIVE: "events-archive",

    // Config documents (single objects)
    SCHEDULES: "schedules",
    SETTINGS: "settings",
} as const

export type FirestoreKey = typeof FIRESTORE_KEYS[keyof typeof FIRESTORE_KEYS]

// Archive configuration
export const ARCHIVE_CONFIG = {
    // Items older than this many days are archived
    ARCHIVE_AFTER_DAYS: 365,
} as const
