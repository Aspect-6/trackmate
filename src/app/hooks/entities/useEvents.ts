import { useMemo, useCallback } from 'react'
import { useLocalStorage } from '@/app/hooks/data/useLocalStorage'
import { generateId, todayString } from '@/app/lib/utils'
import { STORAGE_KEYS } from '@/app/config/storageKeys'
import type { Event } from '@/app/types'

/**
 * Hook for accessing and working with events.
 * Manages state persistence via useLocalStorage.
 * Provides filtered views, lookup functions, and CRUD operations.
 */
export const useEvents = () => {
    const [events, setEvents] = useLocalStorage<Event[]>(STORAGE_KEYS.EVENTS, [])

    // Counts
    const totalNum = events.length

    // Helper: sort events by start time
    const sortByStartTime = useCallback((eventA: Event, eventB: Event) => {
        if (eventA.startTime && eventB.startTime) return eventA.startTime.localeCompare(eventB.startTime)
        if (eventA.startTime) return -1
        if (eventB.startTime) return 1
        return 0
    }, [])

    // Filtered views
    const todaysEvents = useMemo(() => {
        const today = todayString()
        return events.filter(event => event.date === today).toSorted(sortByStartTime)
    }, [events, sortByStartTime])

    const upcomingEvents = useMemo(() => {
        const today = todayString()
        return events.filter(event => event.date >= today).toSorted((eventA, eventB) => {
            // First sort by date
            const dateCompare = eventA.date.localeCompare(eventB.date)
            if (dateCompare !== 0) return dateCompare
            // Then by start time
            return sortByStartTime(eventA, eventB)
        })
    }, [events, sortByStartTime])

    // Indexed by date (pre-sorted by start time)
    const eventsByDate = useMemo(() => events.reduce<Record<string, Event[]>>((acc, event) => {
        if (event.date) {
            if (!acc[event.date]) acc[event.date] = []
            acc[event.date]!.push(event)
        }
        return acc
    }, {}), [events])

    // Sort each date's events by start time
    const eventsByDateSorted = useMemo(() => {
        const sorted: Record<string, Event[]> = {}
        for (const [date, dateEvents] of Object.entries(eventsByDate)) {
            sorted[date] = dateEvents.toSorted(sortByStartTime)
        }
        return sorted
    }, [eventsByDate, sortByStartTime])

    // Lookup functions
    const getEventById = useCallback((id: string) => {
        return events.find(event => event.id === id) ?? null
    }, [events])
    const getEventsForDate = useCallback((date: string) => {
        return eventsByDateSorted[date] ?? []
    }, [eventsByDateSorted])

    // CRUD Actions
    const addEvent = useCallback((event: Omit<Event, 'id' | 'createdAt'>): void => {
        setEvents(prev => [...prev, { ...event, id: generateId(), createdAt: new Date().toISOString() }])
    }, [setEvents])

    const updateEvent = useCallback((id: string, updates: Partial<Event>): void => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
    }, [setEvents])

    const deleteEvent = useCallback((id: string): void => {
        setEvents(prev => prev.filter(e => e.id !== id))
    }, [setEvents])

    return {
        // Raw data
        events,

        // Counts
        totalNum,

        // Filtered views
        todaysEvents,
        upcomingEvents,

        // Indexed data
        eventsByDate: eventsByDateSorted,

        // Lookup functions
        getEventById,
        getEventsForDate,

        // Actions
        addEvent,
        updateEvent,
        deleteEvent,
    }
}
