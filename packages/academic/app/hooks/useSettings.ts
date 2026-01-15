import { useCallback, useEffect } from 'react'
import { useLocalStorage } from '@/app/hooks/data/useLocalStorage'
import { useToast } from '@shared/contexts/ToastContext'
import { STORAGE_KEYS } from '@/app/config/storageKeys'
import type { Assignment, AssignmentType, ThemeMode, TermMode } from '@/app/types'

export const DEFAULT_ASSIGNMENT_TYPES: AssignmentType[] = [
    'Homework',
    'Classwork',
    'Workbook',
    'Project',
    'Presentation',
    'Paper',
    'Lab',
    'Quiz',
    'Test',
    'Midterm',
    'Final Exam',
    'Other'
]

interface Settings {
    theme: ThemeMode
    termMode: TermMode
    assignmentTypes: AssignmentType[]
}

const DEFAULT_SETTINGS: Settings = {
    theme: 'light',
    termMode: 'Semesters Only',
    assignmentTypes: DEFAULT_ASSIGNMENT_TYPES
}

export const useSettings = () => {
    const [settings, setSettings] = useLocalStorage<Settings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
    const { showToast } = useToast()

    // Update settings actions
    const setTheme = useCallback((theme: ThemeMode) => {
        setSettings(prev => ({ ...prev, theme }))
    }, [setSettings])
    const setTermMode = useCallback((termMode: TermMode) => {
        setSettings(prev => ({ ...prev, termMode }))
    }, [setSettings])

    // Apply theme to DOM
    useEffect(() => {
        if (settings.theme === 'dark') {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
        }
    }, [settings.theme])

    // Assignment type actions
    const addAssignmentType = useCallback((type: AssignmentType): boolean => {
        const trimmed = type.trim()
        if (!trimmed) {
            showToast('Assignment type cannot be empty', 'error')
            return false
        }
        const exists = settings.assignmentTypes.some(t => t.toLowerCase() === trimmed.toLowerCase())
        if (exists) {
            showToast('That assignment type already exists', 'error')
            return false
        }

        const next = [...settings.assignmentTypes, trimmed]
        setSettings(prev => ({ ...prev, assignmentTypes: next }))
        showToast(`Added "${trimmed}"`, 'success')
        return true
    }, [settings.assignmentTypes, setSettings, showToast])
    const removeAssignmentType = useCallback((type: AssignmentType, existingAssignments: Assignment[]) => {
        // Check if type is in use
        const isInUse = existingAssignments.filter(a => a.type === type).length
        if (isInUse > 0) {
            showToast(`Cannot delete "${type}" because it is used by ${isInUse} existing assignment${isInUse > 1 ? 's' : ''}`, 'error')
            return
        }

        const newAssignmentTypes = settings.assignmentTypes.filter(t => t !== type)
        if (newAssignmentTypes.length !== settings.assignmentTypes.length) {
            setSettings(prev => ({ ...prev, assignmentTypes: newAssignmentTypes }))
            showToast(`Removed "${type}"`, 'success')
        }
    }, [settings.assignmentTypes, setSettings, showToast])
    const reorderAssignmentTypes = useCallback((types: AssignmentType[]) => {
        setSettings(prev => ({ ...prev, assignmentTypes: types }))
        showToast(`Reordered assignment types`, 'success')
    }, [setSettings, showToast])

    return {
        // Each setting
        settings,
        theme: settings.theme,
        termMode: settings.termMode,
        assignmentTypes: settings.assignmentTypes,

        // Actions
        setSettings,
        setTheme,
        setTermMode,
        addAssignmentType,
        removeAssignmentType,
        reorderAssignmentTypes
    }
}
