import { useCallback, useMemo, useRef, useEffect } from "react"
import { useCachedFirestoreDoc } from "@shared/hooks/firestore/useCachedFirestoreDoc"
import { type FirestoreKey } from "@/app/config/firestoreKeys"
import { getArchiveCutoffDate, shouldArchiveItem, partitionItems } from "@/app/lib/archive"

/**
 * Hook for entities that need archiving (assignments, events).
 * 
 * Reads from both active and archive documents, merges them when displayed.
 * On write, automatically moves old items to archive.
 */
export function useFirestoreWithArchive<T extends { id: string }>(
    activeKey: FirestoreKey,
    archiveKey: FirestoreKey,
    getItemDate: (item: T) => string,
    isArchivable: (item: T) => boolean
) {
    const initialDoc = useMemo(() => ({ items: [] as T[] }), [])

    const [activeDoc, setActiveDoc] = useCachedFirestoreDoc<{ items: T[] }>("academic", activeKey, initialDoc)
    const [archiveDoc, setArchiveDoc] = useCachedFirestoreDoc<{ items: T[] }>("academic", archiveKey, initialDoc)

    const rawItems = useMemo(() => {
        const active = activeDoc.items || []
        const archived = archiveDoc.items || []
        return [...active, ...archived]
    }, [activeDoc.items, archiveDoc.items])

    const itemsStr = JSON.stringify(rawItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const items = useMemo(() => rawItems, [itemsStr])

    // Run auto-archive check on mount and when active items change
    const hasRunArchival = useRef(false)
    useEffect(() => {
        if (hasRunArchival.current || activeDoc.items.length === 0) return

        const cutoff = getArchiveCutoffDate()
        const itemsToArchive = activeDoc.items.filter(item => {
            return shouldArchiveItem(item, cutoff, getItemDate, isArchivable)
        })

        if (itemsToArchive.length === 0) return
        hasRunArchival.current = true

        const remainingActive = activeDoc.items.filter(item => {
            return !shouldArchiveItem(item, cutoff, getItemDate, isArchivable)
        })
        const newArchive = [...(archiveDoc.items || []), ...itemsToArchive]

        setActiveDoc({ items: remainingActive })
        setArchiveDoc({ items: newArchive })
    }, [activeDoc.items, archiveDoc.items, getItemDate, isArchivable, setActiveDoc, setArchiveDoc])

    // Set function for the items array to mimic React useState
    const setItems = useCallback(async (valueOrUpdater: T[] | ((prev: T[]) => T[])) => {
        const currentItems = [...(activeDoc.items || []), ...(archiveDoc.items || [])]

        const newItems = typeof valueOrUpdater === "function"
            ? (valueOrUpdater as (prev: T[]) => T[])(currentItems)
            : valueOrUpdater

        const cutoff = getArchiveCutoffDate()
        const { active, archived } = partitionItems(newItems, cutoff, getItemDate, isArchivable)

        await Promise.all([
            setActiveDoc({ items: active }),
            setArchiveDoc({ items: archived }),
        ])
    }, [activeDoc.items, archiveDoc.items, getItemDate, isArchivable, setActiveDoc, setArchiveDoc])

    return [items, setItems] as const
}
