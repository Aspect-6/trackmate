import { useMemo, useCallback } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { Class } from '@/app/types'

/**
 * Hook for accessing and working with classes.
 * Provides lookup functions, and CRUD operations.
 */
export const useClasses = () => {
    const { classes, addClass, updateClass, deleteClass, reorderClasses, openModal } = useApp()

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
        const found = classes.find(classItem => classItem.id === id)!
        return found
    }, [classes])
    const getClassesByTerm = useCallback((termId: string) => classesByTerm[termId] ?? []
        , [classesByTerm])

    // Actions
    const openAddClass = useCallback(() => openModal('add-class'), [openModal])
    const openEditClass = useCallback((id: string) => openModal('edit-class', id), [openModal])

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
        reorderClasses,
        openAddClass,
        openEditClass,
    }
}
