import React, { createContext, useContext, useRef, useCallback, useSyncExternalStore, useEffect } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { DocumentData } from "firebase/firestore"
import {
    subscribeToDocument,
    subscribeToCollection,
    setDocument,
    setCollectionDoc,
    deleteCollectionDoc,
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

    getCollectionData: <T extends { id: string }>(app: AppName, key: string, initialValue: T[]) => T[]
    getCollectionLoading: (app: AppName, key: string) => boolean
    getCollectionError: (app: AppName, key: string) => Error | null
    setCollectionData: <T extends { id: string }>(app: AppName, key: string, value: T[], prevValue: T[]) => Promise<void>
    subscribeCollection: <T extends { id: string }>(app: AppName, key: string, initialValue: T[], callback: () => void) => () => void
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
    
    // Caches for documents and collections
    const docCacheRef = useRef<Map<string, CacheEntry<unknown>>>(new Map())
    const collectionCacheRef = useRef<Map<string, CacheEntry<unknown[]>>>(new Map())
    // Initialize with current user to avoid clearing on first render
    const prevUserRef = useRef<string | null>(user?.uid ?? null)

    // Clear caches when user changes (logout/login as different user)
    useEffect(() => {
        const currentUserId = user?.uid ?? null
        
        // Only clear if user actually changed (not on initial mount)
        if (prevUserRef.current !== null && currentUserId !== prevUserRef.current) {
            // Unsubscribe from all existing subscriptions
            docCacheRef.current.forEach(entry => entry.unsubscribe?.())
            collectionCacheRef.current.forEach(entry => entry.unsubscribe?.())
            
            // Clear caches
            docCacheRef.current = new Map()
            collectionCacheRef.current = new Map()
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

            // Start Firestore subscription
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
                // Don't unsubscribe from Firestore - keep the subscription alive
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
            // Optimistic update
            entry.data = value
            entry.subscribers.forEach(cb => cb())
        }

        await setDocument(user.uid, app, key, value)
    }, [user])

    // ========================================================================
    // Collection Methods
    // ========================================================================

    const subscribeCollection = useCallback(<T extends { id: string }>(
        app: AppName,
        key: string,
        initialValue: T[],
        callback: () => void
    ) => {
        if (!user) return () => {}

        const cacheKey = getCacheKey(app, key)
        let entry = collectionCacheRef.current.get(cacheKey) as CacheEntry<T[]> | undefined

        if (!entry) {
            // Create new cache entry
            entry = {
                data: initialValue,
                loading: true,
                error: null,
                subscribers: new Set(),
                unsubscribe: null,
            }
            collectionCacheRef.current.set(cacheKey, entry)

            // Start Firestore subscription
            entry.unsubscribe = subscribeToCollection<T>(
                user.uid,
                app,
                key,
                (items) => {
                    const currentEntry = collectionCacheRef.current.get(cacheKey) as CacheEntry<T[]>
                    currentEntry.data = items
                    currentEntry.loading = false
                    currentEntry.subscribers.forEach(cb => cb())
                },
                (error) => {
                    console.error(`Firestore collection error for ${key}:`, error)
                    const currentEntry = collectionCacheRef.current.get(cacheKey) as CacheEntry<T[]>
                    currentEntry.error = error
                    currentEntry.loading = false
                    currentEntry.subscribers.forEach(cb => cb())
                }
            )
        }

        // Add this component as a subscriber
        entry.subscribers.add(callback)

        return () => {
            const currentEntry = collectionCacheRef.current.get(cacheKey)
            if (currentEntry) {
                currentEntry.subscribers.delete(callback)
            }
        }
    }, [user])

    const getCollectionData = useCallback(<T extends { id: string }>(app: AppName, key: string, initialValue: T[]): T[] => {
        const cacheKey = getCacheKey(app, key)
        const entry = collectionCacheRef.current.get(cacheKey) as CacheEntry<T[]> | undefined
        return entry ? entry.data : initialValue
    }, [])

    const getCollectionLoading = useCallback((app: AppName, key: string): boolean => {
        const cacheKey = getCacheKey(app, key)
        const entry = collectionCacheRef.current.get(cacheKey)
        return entry ? entry.loading : true
    }, [])

    const getCollectionError = useCallback((app: AppName, key: string): Error | null => {
        const cacheKey = getCacheKey(app, key)
        const entry = collectionCacheRef.current.get(cacheKey)
        return entry?.error ?? null
    }, [])

    const setCollectionData = useCallback(async <T extends { id: string }>(
        app: AppName,
        key: string,
        value: T[],
        prevValue: T[]
    ) => {
        if (!user) return

        const cacheKey = getCacheKey(app, key)
        const entry = collectionCacheRef.current.get(cacheKey) as CacheEntry<T[]> | undefined
        
        if (entry) {
            // Optimistic update
            entry.data = value
            entry.subscribers.forEach(cb => cb())
        }

        // Diff and sync
        const newIds = new Set(value.map(item => item.id))

        const promises: Promise<void>[] = []

        // Add or update items
        for (const item of value) {
            const prevItem = prevValue.find(p => p.id === item.id)
            if (!prevItem || JSON.stringify(prevItem) !== JSON.stringify(item)) {
                promises.push(setCollectionDoc(user.uid, app, key, item))
            }
        }

        // Delete removed items
        for (const prevItem of prevValue) {
            if (!newIds.has(prevItem.id)) {
                promises.push(deleteCollectionDoc(user.uid, app, key, prevItem.id))
            }
        }

        await Promise.all(promises)
    }, [user])

    const value: FirestoreCacheContextType = {
        getDocData,
        getDocLoading,
        getDocError,
        setDocData,
        subscribeDoc,
        getCollectionData,
        getCollectionLoading,
        getCollectionError,
        setCollectionData,
        subscribeCollection,
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
 * Hook for Firestore documents with caching across navigations.
 */
export function useCachedFirestoreDoc<T extends DocumentData>(
    app: AppName,
    key: string,
    initialValue: T
) {
    const cache = useFirestoreCache()
    
    // Stabilize initialValue - use first value and ignore subsequent changes
    // This prevents issues with object/array references changing each render
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
 * Hook for Firestore collections with caching across navigations.
 */
export function useCachedFirestoreCollection<T extends { id: string }>(
    app: AppName,
    key: string,
    initialValue: T[]
) {
    const cache = useFirestoreCache()
    
    // Stabilize initialValue - use first value and ignore subsequent changes
    // This prevents issues with array references changing each render
    const stableInitialValue = useRef(initialValue).current

    const subscribe = useCallback(
        (callback: () => void) => cache.subscribeCollection(app, key, stableInitialValue, callback),
        [cache, app, key, stableInitialValue]
    )

    const getSnapshot = useCallback(
        () => cache.getCollectionData<T>(app, key, stableInitialValue),
        [cache, app, key, stableInitialValue]
    )

    const data = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    const loading = cache.getCollectionLoading(app, key)
    const error = cache.getCollectionError(app, key)

    const setValue = useCallback(
        async (valueOrUpdater: T[] | ((prev: T[]) => T[])) => {
            const currentData = cache.getCollectionData<T>(app, key, stableInitialValue)
            const newValue = typeof valueOrUpdater === "function"
                ? (valueOrUpdater as (prev: T[]) => T[])(currentData)
                : valueOrUpdater
            await cache.setCollectionData(app, key, newValue, currentData)
        },
        [cache, app, key, stableInitialValue]
    )

    return [data, setValue, { loading, error }] as const
}
