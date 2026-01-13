import { useMemo, useCallback } from 'react'
import { useLocalStorage } from '@/app/hooks/data/useLocalStorage'
import { useToast } from '@/app/contexts/ToastContext'
import { generateId } from '@/app/lib/utils'
import { STORAGE_KEYS } from '@/app/config/storageKeys'
import type { Class } from '@/app/types'

/**
 * Hook for accessing and working with classes.
 * Manages state persistence via useLocalStorage.
 */
export const useClasses = () => {
    const [classes, setClasses] = useLocalStorage<Class[]>(STORAGE_KEYS.CLASSES, [])
    const { showToast } = useToast()

    // Counts
    const totalNum = classes.length

    // Indexed by term
    const classesByTerm = useMemo(() => classes.reduce<Record<string, Class[]>>((acc, classItem) => {
        const termId = classItem.termId || 'unassigned'
        if (!acc[termId]) acc[termId] = []
        acc[termId]!.push(classItem)
        return acc
    }, {}), [classes])

    // Lookup functions
    const getClassById = useCallback((id: string): Class => {
        return classes.find(classItem => classItem.id === id) as Class
    }, [classes])

    const getClassesByTerm = useCallback((termId: string) => classesByTerm[termId] ?? []
        , [classesByTerm])

    // Actions
    const addClass = useCallback((newClass: Omit<Class, 'id'>): boolean => {
        if (classes.some(c => c.name.toLowerCase() === newClass.name.toLowerCase())) {
            showToast(`A class with the name "${newClass.name}" already exists.`, 'error')
            return false
        }
        setClasses(prev => [...prev, {
            ...newClass,
            id: generateId(),
            teacherName: newClass.teacherName || '',
            roomNumber: newClass.roomNumber || '',
            color: newClass.color || '#64748b'
        }])
        showToast(`Class "${newClass.name}" added successfully!`, 'success')
        return true
    }, [classes, setClasses, showToast])

    const updateClass = useCallback((id: string, updates: Partial<Class>): void => {
        setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
    }, [setClasses])

    const deleteClass = useCallback((id: string): void => {
        setClasses(prev => prev.filter(c => c.id !== id))
    }, [setClasses])

    const reorderClasses = useCallback((newOrder: Class[]): void => {
        setClasses(newOrder)
    }, [setClasses])

    return {
        // Raw data
        classes,

        // Counts
        totalNum,

        // Indexed data
        classesByTerm,

        // Lookup functions
        getClassById,
        getClassesByTerm,

        // Actions
        addClass,
        updateClass,
        deleteClass,
        reorderClasses
    }
}
