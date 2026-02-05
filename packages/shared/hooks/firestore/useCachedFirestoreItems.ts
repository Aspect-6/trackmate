import { useCallback, useRef, useSyncExternalStore, useMemo } from "react"
import { type AppName } from "@shared/lib/firestore"
import { useFirestoreCache } from "@shared/contexts/FirestoreCacheContext"

/**
 * Hook for Firestore documents that store arrays of items.
 * Used for entities like assignments, classes, events, terms, noSchool.
 * 
 * The document structure is: { items: T[] }
 * This hook abstracts that away, returning just the items array.
 */
export function useCachedFirestoreItems<T extends { id: string }>(
    app: AppName,
    key: string
) {
    const cache = useFirestoreCache()

    const initialDoc = useRef({ items: [] as T[] }).current

    const subscribe = useCallback(
        (callback: () => void) => cache.subscribeDoc(app, key, initialDoc, callback),
        [cache, app, key, initialDoc]
    )

    const getSnapshot = useCallback(
        () => {
            const doc = cache.getDocData<{ items: T[] }>(app, key, initialDoc)
            return doc.items
        },
        [cache, app, key, initialDoc]
    )

    const rawItems = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

    const itemsStr = JSON.stringify(rawItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const items = useMemo(() => rawItems, [itemsStr])
    const loading = cache.getDocLoading(app, key)
    const error = cache.getDocError(app, key)

    const setItems = useCallback(async (valueOrUpdater: T[] | ((prev: T[]) => T[])) => {
        const currentDoc = cache.getDocData<{ items: T[] }>(app, key, initialDoc)
        const currentItems = currentDoc.items
        const newItems = typeof valueOrUpdater === "function"
            ? (valueOrUpdater as (prev: T[]) => T[])(currentItems)
            : valueOrUpdater
        await cache.setDocData(app, key, { items: newItems })
    }, [cache, app, key, initialDoc])

    return [items, setItems, { loading, error }] as const
}
