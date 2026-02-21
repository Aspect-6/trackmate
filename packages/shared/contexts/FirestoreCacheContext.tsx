import React, { createContext, useContext, useRef, useCallback, useEffect } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { DocumentData } from "firebase/firestore"
import {
    subscribeToDocument,
    setDocument,
    type AppName,
} from "@shared/lib/firestore"
import type { CacheEntry, FirestoreCacheContextType } from "@shared/types/FirestoreCacheContext"

const FirestoreCacheContext = createContext<FirestoreCacheContextType | null>(null)

export const FirestoreCacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth()

    // Cache for all documents
    const docCacheRef = useRef<Map<string, CacheEntry<unknown>>>(new Map())
    const prevUserRef = useRef<string | null>(user?.uid ?? null)

    // Clear cache on user change
    useEffect(() => {
        const currentUserId = user?.uid ?? null
        if (prevUserRef.current !== null && currentUserId !== prevUserRef.current) {
            docCacheRef.current.forEach(entry => entry.unsubscribe?.())
            docCacheRef.current = new Map()
        }
        prevUserRef.current = currentUserId
    }, [user?.uid])

    const getCacheKey = (app: AppName, key: string) => `${app}:${key}`

    // Doc actions
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
            entry = {
                data: initialValue,
                loading: true,
                error: null,
                subscribers: new Set(),
                unsubscribe: null,
            }
            docCacheRef.current.set(cacheKey, entry)

            entry.unsubscribe = subscribeToDocument<T>(user.uid, app, key, (firestoreData) => {
                const currentEntry = docCacheRef.current.get(cacheKey) as CacheEntry<T>
                if (firestoreData !== null) {
                    currentEntry.data = firestoreData
                } else {
                    setDocument(user.uid, app, key, initialValue as DocumentData)
                }
                currentEntry.loading = false
                currentEntry.subscribers.forEach(cb => cb())
            }, (error) => {
                const currentEntry = docCacheRef.current.get(cacheKey) as CacheEntry<T>
                currentEntry.error = error
                currentEntry.loading = false
                currentEntry.subscribers.forEach(cb => cb())
            })
        }

        entry.subscribers.add(callback)

        return () => {
            // Keep listener alive even when no subscribers to prevent refetching later when data is needed again
            const currentEntry = docCacheRef.current.get(cacheKey)
            if (currentEntry) {
                currentEntry.subscribers.delete(callback)
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

export function useFirestoreCache() {
    const context = useContext(FirestoreCacheContext)
    if (!context) {
        throw new Error("useFirestoreCache must be used within a FirestoreCacheProvider")
    }
    return context
}
