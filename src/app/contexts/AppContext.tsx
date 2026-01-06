import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { generateId, todayString, parseDateLocal, addDaysToDateString, dateToLocalISOString } from '@/app/lib/utils'
import { useToast } from '@/app/contexts/ToastContext'
import type {
    Assignment,
    AssignmentType,
    Class,
    Event,
    NoSchoolPeriod,
    AcademicTerm,
    ScheduleStore,
    TermSchedule,
    AppContextType,
    DayType,
    ThemeMode,
    TermMode
} from '../types'

const AppContext = createContext<AppContextType | undefined>(undefined)

const ASSIGNMENTS_KEY = 'studentTrackerAssignments'
const CLASSES_KEY = 'studentTrackerClasses'
const SCHEDULES_KEY = 'trackmateSchedules'
const EVENTS_KEY = 'studentTrackerEvents'
const NO_SCHOOL_KEY = 'studentTrackerNoSchool'
const TERMS_KEY = 'studentTrackerTerms'
const TERM_MODE_KEY = 'trackmateTermMode'
const THEME_KEY = 'trackmateTheme'
const ASSIGNMENT_TYPES_KEY = 'trackmateAssignmentTypes'

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

const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
    const data = localStorage.getItem(key)
    try {
        return data ? JSON.parse(data) : defaultValue
    } catch {
        return defaultValue
    }
}

const saveToLocalStorage = <T,>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data))
}

const getStoredTheme = (): ThemeMode => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem(THEME_KEY)
    if (!stored) return 'light'
    return stored as ThemeMode
}

const getStoredTermMode = (): TermMode => {
    if (typeof window === 'undefined') return 'Semesters Only'
    const stored = localStorage.getItem(TERM_MODE_KEY)
    return stored === 'Semesters With Quarters' ? 'Semesters With Quarters' : 'Semesters Only'
}

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const { showToast } = useToast()
    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [assignmentTypes, setAssignmentTypes] = useState<AssignmentType[]>(DEFAULT_ASSIGNMENT_TYPES)
    const [classes, setClasses] = useState<Class[]>([])
    const [events, setEvents] = useState<Event[]>([])
    const [noSchool, setNoSchool] = useState<NoSchoolPeriod[]>([])
    const [academicTerms, setAcademicTerms] = useState<AcademicTerm[]>([])
    const [scheduleStore, setScheduleStore] = useState<ScheduleStore>({
        referenceDate: '2025-11-26',
        referenceType: 'A',
        terms: {}
    })
    const [theme, setThemeState] = useState<ThemeMode>(() => getStoredTheme())
    const [termMode, setTermModeState] = useState<TermMode>(() => getStoredTermMode())

    // Computed: filter terms by current termMode
    const filteredAcademicTerms = academicTerms.filter(term => term.termType === termMode)

    // Modal State
    const [activeModal, setActiveModal] = useState<string | null>(null)
    const [modalData, setModalData] = useState<any>(null)
    const [isInitialized, setIsInitialized] = useState(false)

    const openModal = (modalName: string, data: any = null): void => {
        setActiveModal(modalName)
        setModalData(data)
    }

    const closeModal = (): void => {
        setActiveModal(null)
        setModalData(null)
    }

    // Load Data
    const sanitizeTypes = (types: AssignmentType[]): AssignmentType[] => {
        const seen = new Set<string>()
        const cleaned: AssignmentType[] = []
        const banned = new Set(['study', 'stody'])
        types.forEach(t => {
            const trimmed = (t || '').toString().trim()
            if (!trimmed) return
            const key = trimmed.toLowerCase()
            if (banned.has(key)) return
            if (seen.has(key)) return
            seen.add(key)
            cleaned.push(trimmed)
        })
        return cleaned
    }

    const hydrateAssignmentTypes = (types: AssignmentType[]): AssignmentType[] => {
        const cleaned = sanitizeTypes(types)
        return cleaned.length ? cleaned : DEFAULT_ASSIGNMENT_TYPES
    }

    const setTypesAndEnsureAssignments = (types: AssignmentType[]): AssignmentType[] => {
        const valid = hydrateAssignmentTypes(types)
        const fallbackType: AssignmentType = (valid[0] ?? DEFAULT_ASSIGNMENT_TYPES[0]) as AssignmentType
        setAssignmentTypes(valid)
        setAssignments(prev => prev.map(a => (valid.includes(a.type) ? a : { ...a, type: fallbackType })))
        return valid
    }

    useEffect(() => {
        const loadedClasses = loadFromLocalStorage<Class[]>(CLASSES_KEY, []).map(c => ({
            ...c,
            teacherName: c.teacherName || '',
            roomNumber: c.roomNumber || '',
            color: c.color || '#64748b', // Default color if not set
        }))
        setClasses(loadedClasses)

        const storedTypes = loadFromLocalStorage<AssignmentType[]>(ASSIGNMENT_TYPES_KEY, DEFAULT_ASSIGNMENT_TYPES)
        const hydratedTypes = setTypesAndEnsureAssignments(storedTypes)

        const loadedScheduleStore = loadFromLocalStorage<ScheduleStore>(SCHEDULES_KEY, {
            referenceDate: '2025-11-26',
            referenceType: 'A',
            terms: {}
        })
        setScheduleStore(loadedScheduleStore)

        let loadedAssignments = loadFromLocalStorage<any[]>(ASSIGNMENTS_KEY, [])
        loadedAssignments = loadedAssignments.map(a => {
            if (typeof a.completed !== 'undefined') {
                const status = a.completed ? 'Done' : 'To Do'
                const { completed, ...rest } = a
                a = { ...rest, status }
            }
            if (typeof a.classId === 'undefined' && loadedClasses.length > 0) {
                a.classId = loadedClasses[0]?.id
            }
            if (!a.dueTime || typeof a.dueTime !== 'string') {
                a.dueTime = '23:59'
            }
            const validTypes = hydrateAssignmentTypes(hydratedTypes)
            if (!a.type || !validTypes.includes(a.type)) {
                a.type = validTypes[0]
            }
            return a
        }).filter(a => a.classId)
        setAssignments(loadedAssignments as Assignment[])

        let loadedEvents = loadFromLocalStorage<any[]>(EVENTS_KEY, [])
        loadedEvents = loadedEvents.map(e => {
            if ((e as any).time && !e.startTime && !e.endTime) {
                const { time, ...rest } = e
                return { ...rest, startTime: (e as any).time, endTime: null }
            }
            return e
        })
        setEvents(loadedEvents as Event[])

        setNoSchool(loadFromLocalStorage<NoSchoolPeriod[]>(NO_SCHOOL_KEY, []))

        let loadedTerms = loadFromLocalStorage<AcademicTerm[]>(TERMS_KEY, [])
        loadedTerms = loadedTerms.map(t => {
            // Migrate semesters if missing
            const semesters = t.semesters || []

            // Migrate quarters for each semester if missing
            const migratedSemesters = semesters.map(sem => {
                if (sem.quarters && sem.quarters.length > 0) {
                    return sem
                }

                // Calculate midpoint for default quarter boundary
                const startDate = parseDateLocal(sem.startDate)
                const endDate = parseDateLocal(sem.endDate)
                const midpointTime = startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 2
                const midpointDate = new Date(midpointTime)
                const midpoint = dateToLocalISOString(midpointDate)
                const dayAfterMidpoint = addDaysToDateString(midpoint, 1)

                const quarterNames = sem.name === 'Fall'
                    ? ['Q1', 'Q2'] as const
                    : ['Q3', 'Q4'] as const

                return {
                    ...sem,
                    quarters: [
                        { id: generateId(), name: quarterNames[0], startDate: sem.startDate, endDate: midpoint },
                        { id: generateId(), name: quarterNames[1], startDate: dayAfterMidpoint, endDate: sem.endDate }
                    ]
                }
            })

            return {
                ...t,
                termType: t.termType || 'semesters',
                semesters: migratedSemesters
            }
        })
        setAcademicTerms(loadedTerms)

        // Mark as initialized after all data is loaded
        setIsInitialized(true)
    }, [])

    // Save Data Effects - only save after initialization
    useEffect(() => { if (isInitialized) saveToLocalStorage(ASSIGNMENTS_KEY, assignments) }, [assignments, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage(CLASSES_KEY, classes) }, [classes, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage(SCHEDULES_KEY, scheduleStore) }, [scheduleStore, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage(EVENTS_KEY, events) }, [events, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage(NO_SCHOOL_KEY, noSchool) }, [noSchool, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage(TERMS_KEY, academicTerms) }, [academicTerms, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage(ASSIGNMENT_TYPES_KEY, assignmentTypes) }, [assignmentTypes, isInitialized])
    useEffect(() => {
        localStorage.setItem(TERM_MODE_KEY, termMode)
    }, [termMode])
    useEffect(() => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        localStorage.setItem(THEME_KEY, theme)
    }, [theme])

    // Actions
    const addAssignment = (assignment: Omit<Assignment, 'id' | 'createdAt'>): void => {
        setAssignments(prev => [...prev, { ...assignment, id: generateId(), createdAt: new Date().toISOString() }])
    }

    const updateAssignment = (id: string, updates: Partial<Assignment>): void => {
        setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
    }

    const deleteAssignment = (id: string): void => {
        setAssignments(prev => prev.filter(a => a.id !== id))
    }

    const addAssignmentType = (type: AssignmentType): boolean => {
        const trimmed = (type || '').trim()
        if (!trimmed) {
            showToast('Assignment type cannot be empty.', 'error')
            return false
        }
        const exists = assignmentTypes.some(t => t.toLowerCase() === trimmed.toLowerCase())
        if (exists) {
            showToast('That assignment type already exists.', 'error')
            return false
        }
        const next = [...assignmentTypes, trimmed]
        setTypesAndEnsureAssignments(next)
        showToast(`Added "${trimmed}"`, 'success')
        return true
    }

    const removeAssignmentType = (type: AssignmentType): void => {
        if (assignmentTypes.length <= 1) {
            showToast('Keep at least one assignment type.', 'error')
            return
        }
        const next = assignmentTypes.filter(t => t !== type)
        const validated = setTypesAndEnsureAssignments(next)
        if (!validated.includes(type)) {
            showToast(`Removed "${type}"`, 'info')
        }
    }

    const reorderAssignmentTypes = (types: AssignmentType[]): void => {
        setTypesAndEnsureAssignments(types)
    }

    const addClass = (newClass: Omit<Class, 'id'>): boolean => {
        if (classes.some(c => c.name.toLowerCase() === newClass.name.toLowerCase())) {
            showToast(`A class with the name "${newClass.name}" already exists.`, 'error')
            return false
        }
        setClasses(prev => [...prev, { ...newClass, id: generateId() }])
        showToast(`Class "${newClass.name}" added successfully!`, 'success')
        return true
    }

    const updateClass = (id: string, updates: Partial<Class>): void => {
        setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
    }

    const deleteClass = (id: string): void => {
        setAssignments(prev => prev.filter(a => a.classId !== id))
        setClasses(prev => prev.filter(c => c.id !== id))
    }

    const reorderClasses = (newOrder: Class[]): void => {
        setClasses(newOrder)
    }

    const addEvent = (event: Omit<Event, 'id' | 'createdAt'>): void => {
        setEvents(prev => [...prev, { ...event, id: generateId(), createdAt: new Date().toISOString() }])
    }

    const updateEvent = (id: string, updates: Partial<Event>): void => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
    }

    const deleteEvent = (id: string): void => {
        setEvents(prev => prev.filter(e => e.id !== id))
    }

    const addNoSchool = (period: Omit<NoSchoolPeriod, 'id' | 'createdAt'>): void => {
        setNoSchool(prev => [...prev, { ...period, id: generateId(), createdAt: new Date().toISOString() }])
    }

    const updateNoSchool = (id: string, updates: Partial<NoSchoolPeriod>): void => {
        setNoSchool(prev => prev.map(ns => ns.id === id ? { ...ns, ...updates } : ns))
    }

    const deleteNoSchool = (id: string): void => {
        setNoSchool(prev => prev.filter(ns => ns.id !== id))
    }

    const addAcademicTerm = (term: Omit<AcademicTerm, 'id'>): void => {
        setAcademicTerms(prev => [...prev, { ...term, id: generateId() }])
    }

    const updateAcademicTerm = (id: string, updates: Partial<AcademicTerm>): void => {
        setAcademicTerms(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
    }

    const deleteAcademicTerm = (id: string): void => {
        // Clear term assignment from any classes that reference this term
        setClasses(prev => prev.map(c =>
            c.termId === id
                ? { ...c, termId: undefined, semesterId: undefined }
                : c
        ))
        setAcademicTerms(prev => prev.filter(t => t.id !== id))
    }

    const updateTermSchedule = (termId: string, newSchedule: TermSchedule): void => {
        setScheduleStore(prev => ({
            ...prev,
            terms: {
                ...prev.terms,
                [termId]: newSchedule
            }
        }))
    }

    const setReferenceDayType = (type: 'A' | 'B'): void => {
        setScheduleStore(prev => ({
            ...prev,
            referenceType: type,
            referenceDate: todayString()
        }))
    }

    const clearAllAssignments = (): void => {
        setAssignments([])
        localStorage.removeItem(ASSIGNMENTS_KEY)
        window.location.reload()
    }

    const clearAllEvents = (): void => {
        setEvents([])
        localStorage.removeItem(EVENTS_KEY)
        window.location.reload()
    }

    const clearAllData = (): void => {
        localStorage.removeItem(ASSIGNMENTS_KEY)
        localStorage.removeItem(CLASSES_KEY)
        localStorage.removeItem(SCHEDULES_KEY)
        localStorage.removeItem(EVENTS_KEY)
        localStorage.removeItem(NO_SCHOOL_KEY)
        localStorage.removeItem(TERMS_KEY)
        localStorage.removeItem(ASSIGNMENT_TYPES_KEY)
        window.location.reload()
    }

    const setTheme = (mode: ThemeMode): void => {
        setThemeState(mode === 'dark' ? 'dark' : 'light')
    }

    // Helpers
    const getDayTypeForDate = (dateString: string): DayType => {
        const date = parseDateLocal(dateString)
        const refDate = parseDateLocal(scheduleStore.referenceDate)
        const dayOfWeek = date.getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) return null

        const isNoSchool = noSchool.some(ns => {
            const start = parseDateLocal(ns.startDate)
            const end = parseDateLocal(ns.endDate)
            const check = parseDateLocal(dateString)
            return check >= start && check <= end
        })
        if (isNoSchool) return null

        let count = 0
        let current = new Date(refDate)
        const target = new Date(date)

        if (target < current) {
            while (current > target) {
                current.setDate(current.getDate() - 1)
                const dow = current.getDay()
                if (dow !== 0 && dow !== 6) {
                    const isNoSchoolDay = noSchool.some(ns => {
                        const start = parseDateLocal(ns.startDate)
                        const end = parseDateLocal(ns.endDate)
                        return current >= start && current <= end
                    })
                    if (!isNoSchoolDay) count--
                }
            }
        } else {
            while (current < target) {
                const dow = current.getDay()
                if (dow !== 0 && dow !== 6) {
                    const isNoSchoolDay = noSchool.some(ns => {
                        const start = parseDateLocal(ns.startDate)
                        const end = parseDateLocal(ns.endDate)
                        return current >= start && current <= end
                    })
                    if (!isNoSchoolDay) count++
                }
                current.setDate(current.getDate() + 1)
            }
        }

        const isEven = count % 2 === 0
        return isEven ? scheduleStore.referenceType : (scheduleStore.referenceType === 'A' ? 'B' : 'A')
    }

    const getClassById = (id: string): Class => classes.find(c => c.id === id) as Class

    return (
        <AppContext.Provider value={{
            assignments, classes, events, noSchool, academicTerms, scheduleStore,
            addAssignment, updateAssignment, deleteAssignment,
            assignmentTypes, addAssignmentType, removeAssignmentType, reorderAssignmentTypes,
            addClass, updateClass, deleteClass, reorderClasses,
            addEvent, updateEvent, deleteEvent,
            addNoSchool, updateNoSchool, deleteNoSchool,
            termMode, setTermMode: setTermModeState, filteredAcademicTerms,
            addAcademicTerm, updateAcademicTerm, deleteAcademicTerm,
            updateTermSchedule, setReferenceDayType, clearAllData,
            clearAllAssignments, clearAllEvents,
            getDayTypeForDate, getClassById,
            activeModal, modalData, openModal, closeModal,
            theme, setTheme
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = (): AppContextType => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}
