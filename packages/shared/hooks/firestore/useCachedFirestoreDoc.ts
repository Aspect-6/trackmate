import { useCallback, useRef, useSyncExternalStore } from "react"
import { DocumentData } from "firebase/firestore"
import { type AppName } from "@shared/lib/firestore"
import { useFirestoreCache } from "@shared/contexts/FirestoreCacheContext"

/**
 * Hook for Firestore documents with real-time sync and caching.
 * Used for simple documents like settings and schedules.
 */
export function useCachedFirestoreDoc<T extends DocumentData>(
    app: AppName,
    key: string,
    initialValue: T
) {
    const cache = useFirestoreCache()
    const stableInitialValue = useRef(initialValue).current

    const subscribe = useCallback((callback: () => void) => {
        return cache.subscribeDoc(app, key, stableInitialValue, callback)
    }, [cache, app, key, stableInitialValue])

    const getSnapshot = useCallback(() => {
        return cache.getDocData<T>(app, key, stableInitialValue)
    }, [cache, app, key, stableInitialValue])

    const data = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    const loading = cache.getDocLoading(app, key)
    const error = cache.getDocError(app, key)

    const setData = useCallback(async (valueOrUpdater: T | ((prev: T) => T)) => {
        const currentData = cache.getDocData<T>(app, key, stableInitialValue)
        const newValue = typeof valueOrUpdater === "function"
            ? (valueOrUpdater as (prev: T) => T)(currentData)
            : valueOrUpdater
        await cache.setDocData(app, key, newValue)
    }, [cache, app, key, stableInitialValue])

    return [data, setData, { loading, error }] as const
}
