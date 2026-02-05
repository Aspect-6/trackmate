import { ARCHIVE_CONFIG } from "@/app/config/firestoreKeys"
import { dateToLocalISOString } from "@shared/lib/date"

/**
 * Calculates the cutoff date for archiving (365 days ago).
 * @returns Date string in YYYY-MM-DD format
 */
export const getArchiveCutoffDate = (): string => {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - ARCHIVE_CONFIG.ARCHIVE_AFTER_DAYS)
    return dateToLocalISOString(cutoff)
}

/**
 * Determines if a single item belongs in the archive.
 */
export const shouldArchiveItem = <T>(
    item: T,
    cutoffDate: string,
    getItemDate: (item: T) => string,
    isArchivable: (item: T) => boolean
): boolean => {
    if (!isArchivable(item)) return false
    return getItemDate(item) < cutoffDate
}

/**
 * Partitions a list of items into active and archived buckets.
 */
export const partitionItems = <T>(
    items: T[],
    cutoffDate: string,
    getItemDate: (item: T) => string,
    isArchivable: (item: T) => boolean
): { active: T[]; archived: T[] } => {
    const active: T[] = []
    const archived: T[] = []

    for (const item of items) {
        if (shouldArchiveItem(item, cutoffDate, getItemDate, isArchivable)) {
            archived.push(item)
        } else {
            active.push(item)
        }
    }

    return { active, archived }
}
