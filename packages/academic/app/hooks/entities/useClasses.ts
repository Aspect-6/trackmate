import { useMemo, useCallback } from "react"
import { useFirestoreItems } from "@/app/hooks/data/useFirestore"
import { useToast } from "@shared/contexts/ToastContext"
import { generateId } from "@shared/lib"
import { FIRESTORE_KEYS } from "@/app/config/firestoreKeys"
import type { Class } from "@/app/types"

/**
 * Hook for accessing and working with classes.
 * Provides filtered views, lookup functions, and CRUD operations.
 */
export const useClasses = () => {
    const [rawClasses, setClasses] = useFirestoreItems<Class>(FIRESTORE_KEYS.CLASSES)
    const { showToast } = useToast()

    // Sort classes by order field
    const classes = useMemo(() => 
        [...rawClasses].sort((a, b) => a.order - b.order),
        [rawClasses]
    )

    // Counts
    const totalNum = classes.length

    // Indexed by term
    const classesByTerm = useMemo(() => classes.reduce<Record<string, Class[]>>((acc, classItem) => {
        const termId = classItem.termId || "unassigned"
        if (!acc[termId]) acc[termId] = []
        acc[termId]!.push(classItem)
        return acc
    }, {}), [classes])

    // Lookup functions
    const getClassById = useCallback((id: string): Class => {
        return classes.find(classItem => classItem.id === id) as Class
    }, [classes])

    const getClassesByTerm = useCallback((termId: string) => {
        return classesByTerm[termId] ?? []
    }, [classesByTerm])

    // Actions
    const addClass = useCallback((newClass: Omit<Class, "id" | "order">): boolean => {
        if (classes.some(c => c.name.toLowerCase() === newClass.name.toLowerCase())) {
            showToast(`A class with the name "${newClass.name}" already exists.`, "error")
            return false
        }
        // New classes go at the end
        const maxOrder = classes.reduce((max, c) => Math.max(max, c.order), -1)
        setClasses(prev => [...prev, {
            ...newClass,
            id: generateId(),
            order: maxOrder + 1,
        }])
        showToast(`Successfully added class "${newClass.name}"`, "success")
        return true
    }, [classes, setClasses, showToast])

    const updateClass = useCallback((id: string, updates: Partial<Class>): void => {
        setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
    }, [setClasses])

    const deleteClass = useCallback((id: string): void => {
        setClasses(prev => prev.filter(c => c.id !== id))
    }, [setClasses])

    const reorderClasses = useCallback((newOrder: Class[]): void => {
        // Assign order index to each class based on position
        const orderedClasses = newOrder.map((c, index) => ({ ...c, order: index }))
        setClasses(orderedClasses)
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
