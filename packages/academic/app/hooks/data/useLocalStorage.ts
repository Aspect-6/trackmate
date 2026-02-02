import { useCallback, useMemo, useSyncExternalStore } from "react"

// Custom event for same-tab sync between hook instances
const STORAGE_EVENT = "app-storage-update"

function dispatchStorageEvent(key: string) {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }))
}

/**
 * A hook for persisting state to localStorage with cross-component sync.
 * - Reads initial value from localStorage on mount
 * - Writes to localStorage synchronously on every update
 * - Syncs across components in the same tab via custom events
 * - Syncs across browser tabs via the native "storage" event
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    // Read from localStorage
    const getSnapshot = useCallback(() => {
        try {
            const item = localStorage.getItem(key)
            return item ?? JSON.stringify(initialValue)
        } catch {
            return JSON.stringify(initialValue)
        }
    }, [key, initialValue])

    // Subscribe to storage changes (same-tab and cross-tab)
    const subscribe = useCallback((onStoreChange: () => void) => {
        const handleCustomEvent = (e: Event) => {
            if ((e as CustomEvent).detail?.key === key) onStoreChange()
        }
        const handleStorageEvent = (e: StorageEvent) => {
            if (e.key === key) onStoreChange()
        }

        window.addEventListener(STORAGE_EVENT, handleCustomEvent)
        window.addEventListener("storage", handleStorageEvent)

        return () => {
            window.removeEventListener(STORAGE_EVENT, handleCustomEvent)
            window.removeEventListener("storage", handleStorageEvent)
        }
    }, [key])

    // Use React's useSyncExternalStore for proper sync
    const rawValue = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

    // Parse the stored JSON value
    const storedValue = useMemo(() => {
        try {
            return JSON.parse(rawValue) as T
        } catch {
            return initialValue
        }
    }, [rawValue, initialValue])

    // Setter that writes to localStorage and notifies other instances
    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        try {
            const currentValue = JSON.parse(localStorage.getItem(key) ?? JSON.stringify(initialValue)) as T
            const nextValue = value instanceof Function ? value(currentValue) : value
            localStorage.setItem(key, JSON.stringify(nextValue))
            dispatchStorageEvent(key)
        } catch (error) {
            console.error(`Error writing to localStorage key "${key}":`, error)
        }
    }, [key, initialValue])

    return [storedValue, setValue] as const
}
