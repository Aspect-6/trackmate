/**
 * Centralized localStorage keys for all persisted data.
 * Import from here to prevent key drift across hooks and bulk operations.
 */

export const STORAGE_KEYS = {
    ASSIGNMENTS: "trackmateAssignments",
    CLASSES: "trackmateClasses",
    TERMS: "trackmateTerms",
    EVENTS: "trackmateEvents",
    NO_SCHOOL: "trackmateNoSchool",
    SCHEDULES: "trackmateSchedules",
    SETTINGS: "trackmateSettings",
} as const

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]
