// Core data model types

/**
 * Represents the priority level of an assignment.
 */
export type Priority = 'High' | 'Medium' | 'Low'

/**
 * Represents the current status of an assignment.
 */
export type Status = 'To Do' | 'In Progress' | 'Done'

/**
 * Represents the category/type of an assignment. User-configurable string label.
 */
export type AssignmentType = string

/**
 * Represents the type of school day in the schedule rotation.
 * 'A' and 'B' are alternating block schedule days.
 * null represents a day with no specific schedule type (e.g. weekend or break).
 */
export type DayType = 'A' | 'B' | null

/**
 * UI theme preference applied to the root element.
 */
export type ThemeMode = 'light' | 'dark'

/**
 * Represents a single school assignment.
 */
export interface Assignment {
    /** Unique identifier for the assignment */
    id: string
    /** The title or name of the assignment */
    title: string
    /** The due date in ISO format (YYYY-MM-DD) */
    dueDate: string
    /** The due time in 24-hour format (HH:MM) */
    dueTime: string
    /** The priority level of the assignment */
    priority: Priority
    /** The current completion status */
    status: Status
    /** The ID of the class this assignment belongs to */
    classId: string
    /** The assignment category/type */
    type: AssignmentType
    /** Timestamp of when the assignment was created */
    createdAt: string
    /** Optional detailed description or notes */
    description?: string
}

/**
 * Represents a school class or course.
 */
export interface Class {
    /** Unique identifier for the class */
    id: string
    /** The name of the class (e.g., "AP Calculus") */
    name: string
    /** The color code (hex) associated with this class for UI styling */
    color: string
    /** The name of the teacher for this class */
    teacherName: string
    /** The room number where the class meets */
    roomNumber: string
    /** Reference to the academic term this class belongs to */
    termId?: string
    /** Reference to a specific semester within the term (if not year-long) */
    semesterId?: string
}

/**
 * Represents a calendar event (non-assignment).
 */
export interface Event {
    /** Unique identifier for the event */
    id: string
    /** The title of the event */
    title: string
    /** The date of the event in ISO format (YYYY-MM-DD) */
    date: string
    /** Start time in 24-hour format (HH:MM), or null for all-day */
    startTime: string | null
    /** End time in 24-hour format (HH:MM), or null if not applicable */
    endTime: string | null
    /** Color code (hex) for the event in the calendar */
    color: string
    /** Timestamp of when the event was created */
    createdAt: string
    /** Optional description or location details */
    description?: string
}

/**
 * Represents a period of time where there is no school (holidays, breaks).
 */
export interface NoSchoolPeriod {
    /** Unique identifier for the no-school period */
    id: string
    /** The start date of the break in ISO format (YYYY-MM-DD) */
    startDate: string
    /** The end date of the break in ISO format (YYYY-MM-DD) */
    endDate: string
    /** The name or reason for the break (e.g., "Winter Break") */
    name: string
    /** Timestamp of when this period was added */
    createdAt: string
}

/**
 * Schedule for a single day type (e.g., "A", "B", "Day 1", "Monday").
 */
export interface DaySchedule {
    /** Label for this day type (e.g., "A", "B") */
    dayLabel: string
    /** Class IDs for each period (null = empty slot) */
    classes: (string | null)[]
}

/**
 * Schedule data for a single semester within a term.
 */
export interface SemesterScheduleData {
    /** Array of day schedules (supports any rotation type) */
    days: DaySchedule[]
}

/**
 * Complete schedule data for an academic term (Fall + Spring).
 */
export interface TermSchedule {
    Fall: SemesterScheduleData
    Spring: SemesterScheduleData
}

/**
 * Available schedule rotation types.
 */
export type ScheduleType = 'alternating-ab' | 'none'

/**
 * Configuration data specific to alternating A/B schedule.
 */
export interface AlternatingABData {
    /** First day of the school year */
    startDate: string
    /** What day type the start date was */
    startDayType: 'A' | 'B'
    /** Manual overrides for specific dates (sparse map) */
    dayTypeOverrides: Record<string, 'A' | 'B'>
    /** Per-term schedule data (termId -> schedule) */
    terms: Record<string, TermSchedule>
}

/**
 * Configuration data for no schedule (placeholder for future types).
 */
export interface NoScheduleData { }

/**
 * Top-level schedule storage with type-keyed data.
 */
export interface Schedules {
    /** The active schedule type */
    type: ScheduleType
    /** A/B schedule data (present when type is 'alternating-ab') */
    'alternating-ab'?: AlternatingABData
    /** No schedule data (present when type is 'none') */
    'none'?: NoScheduleData
}

/**
 * The term mode determines whether an institution uses semesters only or quarters.
 */
export type TermMode = 'Semesters Only' | 'Semesters With Quarters'

/**
 * Represents a quarter within an academic term (quarters mode only).
 */
export interface Quarter {
    /** Unique identifier for the quarter */
    id: string
    /** Quarter name (Q1, Q2, Q3, Q4) */
    name: 'Q1' | 'Q2' | 'Q3' | 'Q4'
    /** The start date in ISO format (YYYY-MM-DD) */
    startDate: string
    /** The end date in ISO format (YYYY-MM-DD) */
    endDate: string
}

/**
 * Represents a semester within an academic term.
 */
export interface Semester {
    id: string
    name: 'Fall' | 'Spring'
    startDate: string
    endDate: string
    /** The quarters within this semester (only present in quarters mode) */
    quarters?: Quarter[]
}

/**
 * Represents an academic year/term.
 */
export interface AcademicTerm {
    id: string
    name: string
    startDate: string
    endDate: string
    /** The type of term (semesters-only or quarters) */
    termType: TermMode
    semesters: Semester[]
}

// Context types

/**
 * The main application context interface, providing access to global state and actions.
 */
export interface AppContextType {
    // State
    /** List of all tracked assignments */
    assignments: Assignment[]
    /** List of all user classes */
    classes: Class[]
    /** List of all calendar events */
    events: Event[]
    /** List of no-school periods */
    noSchool: NoSchoolPeriod[]
    /** List of academic terms */
    academicTerms: AcademicTerm[]
    /** Current schedule configuration (rotation + per-term schedules) */
    schedules: Schedules
    /** Currently selected UI theme */
    theme: ThemeMode
    /** Updates the active theme */
    setTheme: (mode: ThemeMode) => void
    /** Ordered list of assignment types used across the app */
    assignmentTypes: AssignmentType[]
    /** Add a new assignment type (case-insensitive uniqueness) */
    addAssignmentType: (type: AssignmentType) => boolean
    /** Remove an existing assignment type */
    removeAssignmentType: (type: AssignmentType) => void
    /** Reorder the assignment types list */
    reorderAssignmentTypes: (types: AssignmentType[]) => void

    // Assignment actions
    /** Adds a new assignment to the state */
    addAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void
    /** Updates an existing assignment */
    updateAssignment: (id: string, updates: Partial<Assignment>) => void
    /** Removes an assignment by ID */
    deleteAssignment: (id: string) => void

    // Class actions
    /** Adds a new class. Returns true if successful. */
    addClass: (newClass: Omit<Class, 'id'>) => boolean
    /** Updates an existing class */
    updateClass: (id: string, updates: Partial<Class>) => void
    /** Removes a class by ID */
    deleteClass: (id: string) => void
    /** Reorders the list of classes (for UI display order) */
    reorderClasses: (newOrder: Class[]) => void

    // Event actions
    /** Adds a new calendar event */
    addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void
    /** Updates an existing event */
    updateEvent: (id: string, updates: Partial<Event>) => void
    /** Removes an event by ID */
    deleteEvent: (id: string) => void

    // No school actions
    /** Adds a new no-school period */
    addNoSchool: (period: Omit<NoSchoolPeriod, 'id' | 'createdAt'>) => void
    /** Updates an existing no-school period */
    updateNoSchool: (id: string, updates: Partial<NoSchoolPeriod>) => void
    /** Removes a no-school period by ID */
    deleteNoSchool: (id: string) => void

    // Term actions
    /** The currently selected term mode */
    termMode: TermMode
    /** Updates the term mode setting */
    setTermMode: (mode: TermMode) => void
    /** Academic terms filtered by the current termMode */
    filteredAcademicTerms: AcademicTerm[]
    addAcademicTerm: (term: Omit<AcademicTerm, 'id'>) => void
    updateAcademicTerm: (id: string, updates: Partial<AcademicTerm>) => void
    deleteAcademicTerm: (id: string) => void

    // Schedule actions
    /** Updates the schedule type (rotation mode) */
    setScheduleType: (type: ScheduleType) => void
    /** Updates the schedule for a specific term */
    updateTermSchedule: (termId: string, schedule: TermSchedule) => void
    /** Manually sets the day type for the current reference date to correct rotation */
    setReferenceDayType: (type: NonNullable<DayType>) => void

    // Utility actions
    /** Clears all application data (Danger Zone) */
    clearAllData: () => void
    /** Clears all assignments */
    clearAllAssignments: () => void
    /** Clears all events */
    clearAllEvents: () => void

    // Helper functions
    /** Calculates the day type (A, B, or null) for a specific date */
    getDayTypeForDate: (dateString: string) => DayType
    /** Retrieves a class object by its ID */
    getClassById: (id: string) => Class

    // Modal state
    /** The name of the currently active modal, or null if none */
    activeModal: string | null
    /** Data passed to the active modal */
    modalData: any
    /** Opens a modal by name with optional data */
    openModal: (modalName: string, data?: any) => void
    /** Closes the currently active modal */
    closeModal: () => void
}

/**
 * Types of toast notifications available.
 */
export type ToastType = 'success' | 'error' | 'info'

/**
 * Context interface for managing toast notifications.
 */
export interface ToastContextType {
    /** Displays a toast message with a specific type */
    showToast: (message: string, type?: ToastType) => void
}
