import { useCallback, useRef, useSyncExternalStore } from "react"
import { DocumentData } from "firebase/firestore"
import { type AppName } from "@shared/lib/firestore"
import { useFirestoreCache } from "@shared/contexts/FirestoreCacheContext"

/**
 * Hook for Firestore documents with real-time sync and caching.
 * Used for documents with defined property values (e.g. settings and schedules).
 */
export function useCachedFirestoreDoc<T extends DocumentData>(
    app: AppName,
    key: string,
    initialValue: T
) {
    const cache = useFirestoreCache()
    const stableInitialValue = useRef(initialValue).current
    const snapshotRef = useRef<{ data: T; loading: boolean }>({ data: stableInitialValue, loading: true })

    const subscribe = useCallback((callback: () => void) => {
        return cache.subscribeDoc(app, key, stableInitialValue, callback)
    }, [cache, app, key, stableInitialValue])

    const getSnapshot = useCallback(() => {
        const data = cache.getDocData<T>(app, key, stableInitialValue)
        const loading = cache.getDocLoading(app, key)
        const prev = snapshotRef.current
        if (prev.data !== data || prev.loading !== loading) {
            snapshotRef.current = { data, loading }
        }
        return snapshotRef.current
    }, [cache, app, key, stableInitialValue])

    const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    const error = cache.getDocError(app, key)

    const setData = useCallback(async (valueOrUpdater: T | ((prev: T) => T)) => {
        const currentData = cache.getDocData<T>(app, key, stableInitialValue)
        const newValue = typeof valueOrUpdater === "function"
            ? (valueOrUpdater as (prev: T) => T)(currentData)
            : valueOrUpdater
        await cache.setDocData(app, key, newValue)
    }, [cache, app, key, stableInitialValue])

    return [snapshot.data, setData, { loading: snapshot.loading, error }] as const
}
