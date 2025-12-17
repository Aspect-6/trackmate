// Core data model types

/**
 * Represents the priority level of an assignment.
 */
export type Priority = 'High' | 'Medium' | 'Low';

/**
 * Represents the current status of an assignment.
 */
export type Status = 'To Do' | 'In Progress' | 'Done';

/**
 * Represents the category/type of an assignment. User-configurable string label.
 */
export type AssignmentType = string;

/**
 * Represents the type of school day in the schedule rotation.
 * 'A' and 'B' are alternating block schedule days.
 * null represents a day with no specific schedule type (e.g. weekend or break).
 */
export type DayType = 'A' | 'B' | null;

/**
 * UI theme preference applied to the root element.
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Represents a single school assignment.
 */
export interface Assignment {
    /** Unique identifier for the assignment */
    id: string;
    /** The title or name of the assignment */
    title: string;
    /** The due date in ISO format (YYYY-MM-DD) */
    dueDate: string;
    /** The due time in 24-hour format (HH:MM) */
    dueTime: string;
    /** The priority level of the assignment */
    priority: Priority;
    /** The current completion status */
    status: Status;
    /** The ID of the class this assignment belongs to */
    classId: string;
    /** The assignment category/type */
    type: AssignmentType;
    /** Optional subject tag (often redundant with classId but useful for display) */
    subject?: string;
    /** Timestamp of when the assignment was created */
    createdAt: string;
    /** Optional detailed description or notes */
    description?: string;
}

/**
 * Represents a school class or course.
 */
export interface Class {
    /** Unique identifier for the class */
    id: string;
    /** The name of the class (e.g., "AP Calculus") */
    name: string;
    /** The color code (hex) associated with this class for UI styling */
    color: string;
    /** The name of the teacher for this class */
    teacherName: string;
    /** The room number where the class meets */
    roomNumber: string;
}

/**
 * Represents a calendar event (non-assignment).
 */
export interface Event {
    /** Unique identifier for the event */
    id: string;
    /** The title of the event */
    title: string;
    /** The date of the event in ISO format (YYYY-MM-DD) */
    date: string;
    /** Start time in 24-hour format (HH:MM), or null for all-day */
    startTime: string | null;
    /** End time in 24-hour format (HH:MM), or null if not applicable */
    endTime: string | null;
    /** Color code (hex) for the event in the calendar */
    color: string;
    /** Timestamp of when the event was created */
    createdAt: string;
    /** Optional description or location details */
    description?: string;
}

/**
 * Represents a period of time where there is no school (holidays, breaks).
 */
export interface NoSchoolPeriod {
    /** Unique identifier for the no-school period */
    id: string;
    /** The start date of the break in ISO format (YYYY-MM-DD) */
    startDate: string;
    /** The end date of the break in ISO format (YYYY-MM-DD) */
    endDate: string;
    /** The name or reason for the break (e.g., "Winter Break") */
    name: string;
    /** Timestamp of when this period was added */
    createdAt: string;
}

/**
 * Defines the block schedule rotation configuration.
 */
export interface Schedule {
    /** Array of class IDs representing the schedule for A-Days (indices correspond to periods) */
    aDay: (string | null)[];
    /** Array of class IDs representing the schedule for B-Days (indices correspond to periods) */
    bDay: (string | null)[];
    /** A reference date used to calculate the A/B rotation for any given date */
    referenceDate: string;
    /** The day type ('A' or 'B') of the reference date */
    referenceType: 'A' | 'B';
}

// Context types

/**
 * The main application context interface, providing access to global state and actions.
 */
export interface AppContextType {
    // State
    /** List of all tracked assignments */
    assignments: Assignment[];
    /** List of all user classes */
    classes: Class[];
    /** List of all calendar events */
    events: Event[];
    /** List of no-school periods */
    noSchool: NoSchoolPeriod[];
    /** Current schedule configuration */
    schedule: Schedule;
    /** Currently selected UI theme */
    theme: ThemeMode;
    /** Updates the active theme */
    setTheme: (mode: ThemeMode) => void;
    /** Ordered list of assignment types used across the app */
    assignmentTypes: AssignmentType[];
    /** Add a new assignment type (case-insensitive uniqueness) */
    addAssignmentType: (type: AssignmentType) => boolean;
    /** Remove an existing assignment type */
    removeAssignmentType: (type: AssignmentType) => void;
    /** Reorder the assignment types list */
    reorderAssignmentTypes: (types: AssignmentType[]) => void;

    // Assignment actions
    /** Adds a new assignment to the state */
    addAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void;
    /** Updates an existing assignment */
    updateAssignment: (id: string, updates: Partial<Assignment>) => void;
    /** Removes an assignment by ID */
    deleteAssignment: (id: string) => void;

    // Class actions
    /** Adds a new class. Returns true if successful. */
    addClass: (newClass: Omit<Class, 'id'>) => boolean;
    /** Updates an existing class */
    updateClass: (id: string, updates: Partial<Class>) => void;
    /** Removes a class by ID */
    deleteClass: (id: string) => void;
    /** Reorders the list of classes (for UI display order) */
    reorderClasses: (newOrder: Class[]) => void;

    // Event actions
    /** Adds a new calendar event */
    addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void;
    /** Updates an existing event */
    updateEvent: (id: string, updates: Partial<Event>) => void;
    /** Removes an event by ID */
    deleteEvent: (id: string) => void;

    // No school actions
    /** Adds a new no-school period */
    addNoSchool: (period: Omit<NoSchoolPeriod, 'id' | 'createdAt'>) => void;
    /** Updates an existing no-school period */
    updateNoSchool: (id: string, updates: Partial<NoSchoolPeriod>) => void;
    /** Removes a no-school period by ID */
    deleteNoSchool: (id: string) => void;

    // Schedule actions
    /** Updates a specific period in the A or B day schedule */
    updateSchedule: (dayType: 'A' | 'B', index: number, classId: string | null) => void;
    /** Manually sets the day type for the current reference date to correct rotation */
    setReferenceDayType: (type: 'A' | 'B') => void;

    // Utility actions
    /** Clears all application data (Danger Zone) */
    clearAllData: () => void;

    // Helper functions
    /** Calculates the day type (A, B, or null) for a specific date */
    getDayTypeForDate: (dateString: string) => DayType;
    /** Returns the list of class IDs scheduled for a specific date */
    getClassesForDate: (dateString: string) => (string | null)[];
    /** Retrieves a class object by its ID */
    getClassById: (id: string) => Class | undefined;

    // Modal state
    /** The name of the currently active modal, or null if none */
    activeModal: string | null;
    /** Data passed to the active modal */
    modalData: any;
    /** Opens a modal by name with optional data */
    openModal: (modalName: string, data?: any) => void;
    /** Closes the currently active modal */
    closeModal: () => void;
}

/**
 * Types of toast notifications available.
 */
export type ToastType = 'success' | 'error' | 'info';

/**
 * Context interface for managing toast notifications.
 */
export interface ToastContextType {
    /** Displays a toast message with a specific type */
    showToast: (message: string, type?: ToastType) => void;
}
