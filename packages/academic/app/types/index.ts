// Core data model types

/**
 * Represents the priority level of an assignment.
 */
export type Priority = "High" | "Medium" | "Low"

/**
 * Represents the current status of an assignment.
 */
export type Status = "To Do" | "In Progress" | "Done"

/**
 * Represents the category/type of an assignment. User-configurable string label.
 */
export type AssignmentType = string

/**
 * UI theme preference applied to the root element.
 */
export type ThemeMode = "light" | "dark"

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
    /** The name of the class */
    name: string
    /** The color code associated with this class for UI styling */
    color: string
    /** The name of the teacher for this class */
    teacherName: string
    /** The room number where the class meets */
    roomNumber: string
    /** Reference to the academic term this class belongs to */
    termId?: string
    /** Reference to a specific semester within the term (if not year-long) */
    semesterId?: string
    /** Order index for manual sorting (lower is earlier) */
    order: number
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
export type ScheduleType = "alternating-ab" | "none"

/**
 * Represents the type of school day in the schedule rotation.
 * "A" and "B" are alternating block schedule days.
 * null represents a day with no specific schedule type (e.g. weekend or break).
 */
export type AlternatingABDayType = "A" | "B" | null

/**
 * Per-term rotation configuration for alternating A/B schedules.
 * Stores overrides and starting day type scoped to a specific term.
 */
export interface AlternatingABRotationConfig {
    /** What day type the term started on */
    startDayType: NonNullable<AlternatingABDayType>
    /** Manual overrides for specific dates within this term (sparse map) */
    overrides: Record<string, NonNullable<AlternatingABDayType>>
}

/**
 * Configuration data specific to alternating A/B schedule.
 */
export interface AlternatingABData {
    /** Per-term rotation configuration (termId -> config) */
    termConfigs: Record<string, AlternatingABRotationConfig>
    /** Per-term schedule data for class periods (termId -> schedule) */
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
    /** A/B schedule data (present when type is "alternating-ab") */
    "alternating-ab"?: AlternatingABData
    /** No schedule data (present when type is "none") */
    "none"?: NoScheduleData
}

/**
 * The term mode determines whether an institution uses semesters only or quarters.
 */
export type TermMode = "Semesters Only" | "Semesters With Quarters"

/**
 * Represents a quarter within an academic term (quarters mode only).
 */
export interface Quarter {
    /** Unique identifier for the quarter */
    id: string
    /** Quarter name (Q1, Q2, Q3, Q4) */
    name: "Q1" | "Q2" | "Q3" | "Q4"
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
    name: "Fall" | "Spring"
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
    /** The schedule rotation type for this term */
    scheduleType: ScheduleType
    semesters: Semester[]
}

/**
 * Discriminator for template types.
 */
export type TemplateKind = "assignment" | "event"

/**
 * Represents a reusable template for creating assignments.
 */
export interface AssignmentTemplate extends Omit<Assignment, "dueDate"> {
    templateName: string
    kind: "assignment"
}

/**
 * Represents a reusable template for creating events.
 */
export interface EventTemplate extends Omit<Event, "date"> {
    templateName: string
    kind: "event"
}

/**
 * Union type for all template kinds.
 */
export type Template = AssignmentTemplate | EventTemplate
