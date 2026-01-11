import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
    const readValue = useCallback((): T => {
        if (typeof window === 'undefined') return initialValue

        try {
            const item = localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : initialValue
        } catch (error) { throw new Error(`Error reading localStorage key "${key}": ${error}`) }
    }, [initialValue, key])

    // State to store our value
    const [storedValue, setStoredValue] = useState<T>(readValue)

    // Sync state to local storage whenever it changes
    useEffect(() => {
        if (typeof window === 'undefined') return
        try {
            localStorage.setItem(key, JSON.stringify(storedValue))
            // Dispatch a custom event for same-tab synchronization
            window.dispatchEvent(new StorageEvent('storage', { key, newValue: JSON.stringify(storedValue) }))
        } catch (error) { throw new Error(`Error setting localStorage key "${key}": ${error}`) }
    }, [key, storedValue])

    // Listen for changes to this localStorage key from other tabs/windows AND same tab
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    const newValue = JSON.parse(e.newValue)
                    // Only update if value is different to avoid loops/redundant renders
                    setStoredValue(prev => JSON.stringify(prev) === e.newValue ? prev : newValue)
                } catch (error) { throw new Error(`Error parsing localStorage key "${key}" from event: ${error}`) }
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorageChange)
            return () => window.removeEventListener('storage', handleStorageChange)
        }
    }, [key])

    return [storedValue, setStoredValue] as const
}
