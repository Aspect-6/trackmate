import { useCallback, useMemo, useRef, useEffect } from "react"
import { useCachedFirestoreDoc } from "@shared/contexts/FirestoreCacheContext"
import { ARCHIVE_CONFIG, type FirestoreKey } from "@/app/config/firestoreKeys"

/**
 * Hook for entities that need archiving (assignments, events).
 * 
 * Reads from both active and archive documents, merges them seamlessly.
 * On write, automatically moves old items to archive.
 * 
 * User sees all items as one unified list - archive is invisible to them.
 */
export function useFirestoreWithArchive<T extends { id: string }>(
    activeKey: FirestoreKey,
    archiveKey: FirestoreKey,
    getItemDate: (item: T) => string, // Function to get the relevant date from an item
    isArchivable: (item: T) => boolean // Function to determine if an item can be archived
) {
    const initialDoc = useRef({ items: [] as T[] }).current
    
    // Subscribe to both active and archive documents
    const [activeDoc, setActiveDoc] = useCachedFirestoreDoc<{ items: T[] }>("academic", activeKey, initialDoc)
    const [archiveDoc, setArchiveDoc] = useCachedFirestoreDoc<{ items: T[] }>("academic", archiveKey, initialDoc)

    // Merge items from both documents
    const items = useMemo(() => {
        const active = activeDoc.items || []
        const archived = archiveDoc.items || []
        return [...active, ...archived]
    }, [activeDoc.items, archiveDoc.items])

    // Stable ref for items to prevent unnecessary re-renders
    const itemsRef = useRef<T[]>([])
    if (JSON.stringify(items) !== JSON.stringify(itemsRef.current)) {
        itemsRef.current = items
    }

    // Calculate cutoff date for archiving (365 days ago)
    const getArchiveCutoff = useCallback(() => {
        const cutoff = new Date()
        cutoff.setDate(cutoff.getDate() - ARCHIVE_CONFIG.ARCHIVE_AFTER_DAYS)
        return cutoff.toISOString().split("T")[0]! // YYYY-MM-DD
    }, [])

    // Check if an item should be in archive based on its date
    const shouldBeArchived = useCallback((item: T) => {
        if (!isArchivable(item)) return false
        const itemDate = getItemDate(item)
        const cutoff = getArchiveCutoff()
        return itemDate < cutoff
    }, [getItemDate, isArchivable, getArchiveCutoff])

    // Run archival check on mount and when active items change
    const hasRunArchival = useRef(false)
    useEffect(() => {
        // Only run once per session and only if there are active items
        if (hasRunArchival.current || activeDoc.items.length === 0) return
        
        const itemsToArchive = activeDoc.items.filter(shouldBeArchived)
        if (itemsToArchive.length === 0) return
        
        hasRunArchival.current = true
        
        // Move old items to archive
        const remainingActive = activeDoc.items.filter(item => !shouldBeArchived(item))
        const newArchive = [...(archiveDoc.items || []), ...itemsToArchive]
        
        // Update both documents
        setActiveDoc({ items: remainingActive })
        setArchiveDoc({ items: newArchive })
        
        console.log(`Archived ${itemsToArchive.length} items`)
    }, [activeDoc.items, archiveDoc.items, shouldBeArchived, setActiveDoc, setArchiveDoc])

    // Set items - handles both active and archive
    const setItems = useCallback(
        async (valueOrUpdater: T[] | ((prev: T[]) => T[])) => {
            // Get current merged items
            const currentItems = [...(activeDoc.items || []), ...(archiveDoc.items || [])]
            
            // Calculate new items
            const newItems = typeof valueOrUpdater === "function"
                ? (valueOrUpdater as (prev: T[]) => T[])(currentItems)
                : valueOrUpdater
            
            // Split into active and archive based on date
            const cutoff = getArchiveCutoff()
            const newActive: T[] = []
            const newArchive: T[] = []
            
            for (const item of newItems) {
                if (isArchivable(item) && getItemDate(item) < cutoff) {
                    newArchive.push(item)
                } else {
                    newActive.push(item)
                }
            }
            
            // Update both documents
            await Promise.all([
                setActiveDoc({ items: newActive }),
                setArchiveDoc({ items: newArchive }),
            ])
        },
        [activeDoc.items, archiveDoc.items, getItemDate, isArchivable, getArchiveCutoff, setActiveDoc, setArchiveDoc]
    )

    return [itemsRef.current, setItems] as const
}
