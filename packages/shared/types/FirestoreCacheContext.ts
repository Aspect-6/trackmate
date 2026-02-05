import { DocumentData } from "firebase/firestore"
import { type AppName } from "@shared/lib/firestore"

export interface CacheEntry<T> {
    data: T
    loading: boolean
    error: Error | null
    subscribers: Set<() => void>
    unsubscribe: (() => void) | null
}

export interface FirestoreCacheContextType {
    getDocData: <T extends DocumentData>(app: AppName, key: string, initialValue: T) => T
    getDocLoading: (app: AppName, key: string) => boolean
    getDocError: (app: AppName, key: string) => Error | null
    setDocData: <T extends DocumentData>(app: AppName, key: string, value: T) => Promise<void>
    subscribeDoc: <T extends DocumentData>(app: AppName, key: string, initialValue: T, callback: () => void) => () => void
}
