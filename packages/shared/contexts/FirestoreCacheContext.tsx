import React, { createContext, useContext, useRef, useCallback, useSyncExternalStore, useEffect } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { DocumentData } from "firebase/firestore"
import {
    subscribeToDocument,
    setDocument,
    type AppName,
} from "@shared/lib/firestore"

// ============================================================================
// Types
// ============================================================================

interface CacheEntry<T> {
    data: T
    loading: boolean
    error: Error | null
    subscribers: Set<() => void>
    unsubscribe: (() => void) | null
}

interface FirestoreCacheContextType {
    getDocData: <T extends DocumentData>(app: AppName, key: string, initialValue: T) => T
    getDocLoading: (app: AppName, key: string) => boolean
    getDocError: (app: AppName, key: string) => Error | null
    setDocData: <T extends DocumentData>(app: AppName, key: string, value: T) => Promise<void>
    subscribeDoc: <T extends DocumentData>(app: AppName, key: string, initialValue: T, callback: () => void) => () => void
}

// ============================================================================
// Context
// ============================================================================

const FirestoreCacheContext = createContext<FirestoreCacheContextType | null>(null)

// ============================================================================
// Provider
// ============================================================================

export const FirestoreCacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth()
    
    // Cache for all documents (including those with items arrays)
    const docCacheRef = useRef<Map<string, CacheEntry<unknown>>>(new Map())
    // Initialize with current user to avoid clearing on first render
    const prevUserRef = useRef<string | null>(user?.uid ?? null)

    // Clear caches when user changes (logout/login as different user)
    useEffect(() => {
        const currentUserId = user?.uid ?? null
        
        // Only clear if user actually changed (not on initial mount)
        if (prevUserRef.current !== null && currentUserId !== prevUserRef.current) {
            // Unsubscribe from all existing subscriptions
            docCacheRef.current.forEach(entry => entry.unsubscribe?.())
            // Clear cache
            docCacheRef.current = new Map()
        }
        
        prevUserRef.current = currentUserId
    }, [user?.uid])

    // ========================================================================
    // Document Methods
    // ========================================================================

    const getCacheKey = (app: AppName, key: string) => `${app}:${key}`

    const subscribeDoc = useCallback(<T extends DocumentData>(
        app: AppName,
        key: string,
        initialValue: T,
        callback: () => void
    ) => {
        if (!user) return () => {}

        const cacheKey = getCacheKey(app, key)
        let entry = docCacheRef.current.get(cacheKey) as CacheEntry<T> | undefined

        if (!entry) {
            // Create new cache entry
            entry = {
                data: initialValue,
                loading: true,
                error: null,
                subscribers: new Set(),
                unsubscribe: null,
            }
            docCacheRef.current.set(cacheKey, entry)

            // Start Firestore listener
            entry.unsubscribe = subscribeToDocument<T>(
                user.uid,
                app,
                key,
                (firestoreData) => {
                    const currentEntry = docCacheRef.current.get(cacheKey) as CacheEntry<T>
                    if (firestoreData !== null) {
                        currentEntry.data = firestoreData
                    }
                    currentEntry.loading = false
                    // Notify all subscribers
                    currentEntry.subscribers.forEach(cb => cb())
                },
                (error) => {
                    console.error(`Firestore doc error for ${key}:`, error)
                    const currentEntry = docCacheRef.current.get(cacheKey) as CacheEntry<T>
                    currentEntry.error = error
                    currentEntry.loading = false
                    currentEntry.subscribers.forEach(cb => cb())
                }
            )
        }

        // Add this component as a subscriber
        entry.subscribers.add(callback)

        return () => {
            const currentEntry = docCacheRef.current.get(cacheKey)
            if (currentEntry) {
                currentEntry.subscribers.delete(callback)
                // Keep listener alive even when no subscribers
            }
        }
    }, [user])

    const getDocData = useCallback(<T extends DocumentData>(app: AppName, key: string, initialValue: T): T => {
        const cacheKey = getCacheKey(app, key)
        const entry = docCacheRef.current.get(cacheKey) as CacheEntry<T> | undefined
        return entry ? entry.data : initialValue
    }, [])

    const getDocLoading = useCallback((app: AppName, key: string): boolean => {
        const cacheKey = getCacheKey(app, key)
        const entry = docCacheRef.current.get(cacheKey)
        return entry ? entry.loading : true
    }, [])

    const getDocError = useCallback((app: AppName, key: string): Error | null => {
        const cacheKey = getCacheKey(app, key)
        const entry = docCacheRef.current.get(cacheKey)
        return entry?.error ?? null
    }, [])

    const setDocData = useCallback(async <T extends DocumentData>(app: AppName, key: string, value: T) => {
        if (!user) return

        const cacheKey = getCacheKey(app, key)
        const entry = docCacheRef.current.get(cacheKey) as CacheEntry<T> | undefined
        
        if (entry) {
            // Optimistic update - listener will confirm
            entry.data = value
            entry.subscribers.forEach(cb => cb())
        }

        await setDocument(user.uid, app, key, value)
    }, [user])

    const value: FirestoreCacheContextType = {
        getDocData,
        getDocLoading,
        getDocError,
        setDocData,
        subscribeDoc,
    }

    return (
        <FirestoreCacheContext.Provider value={value}>
            {children}
        </FirestoreCacheContext.Provider>
    )
}

// ============================================================================
// Hooks
// ============================================================================

export function useFirestoreCache() {
    const context = useContext(FirestoreCacheContext)
    if (!context) {
        throw new Error("useFirestoreCache must be used within a FirestoreCacheProvider")
    }
    return context
}

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
    
    // Stabilize initialValue
    const stableInitialValue = useRef(initialValue).current

    const subscribe = useCallback(
        (callback: () => void) => cache.subscribeDoc(app, key, stableInitialValue, callback),
        [cache, app, key, stableInitialValue]
    )

    const getSnapshot = useCallback(
        () => cache.getDocData<T>(app, key, stableInitialValue),
        [cache, app, key, stableInitialValue]
    )

    const data = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    const loading = cache.getDocLoading(app, key)
    const error = cache.getDocError(app, key)

    const setValue = useCallback(
        async (valueOrUpdater: T | ((prev: T) => T)) => {
            const currentData = cache.getDocData<T>(app, key, stableInitialValue)
            const newValue = typeof valueOrUpdater === "function"
                ? (valueOrUpdater as (prev: T) => T)(currentData)
                : valueOrUpdater
            await cache.setDocData(app, key, newValue)
        },
        [cache, app, key, stableInitialValue]
    )

    return [data, setValue, { loading, error }] as const
}

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

    // Use a ref to cache the items array to maintain referential stability
    const itemsRef = useRef<T[]>([])
    const rawItems = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    
    // Only update ref if items actually changed
    if (JSON.stringify(rawItems) !== JSON.stringify(itemsRef.current)) {
        itemsRef.current = rawItems
    }
    
    const items = itemsRef.current
    const loading = cache.getDocLoading(app, key)
    const error = cache.getDocError(app, key)

    const setItems = useCallback(
        async (valueOrUpdater: T[] | ((prev: T[]) => T[])) => {
            const currentDoc = cache.getDocData<{ items: T[] }>(app, key, initialDoc)
            const currentItems = currentDoc.items
            const newItems = typeof valueOrUpdater === "function"
                ? (valueOrUpdater as (prev: T[]) => T[])(currentItems)
                : valueOrUpdater
            await cache.setDocData(app, key, { items: newItems })
        },
        [cache, app, key, initialDoc]
    )

    return [items, setItems, { loading, error }] as const
}
