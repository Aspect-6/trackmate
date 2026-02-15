import { TRACKMATE, TRACKMATE_MODALS } from "@shared/styles/colors"

// Global Colors
export const GLOBAL = {
    ...TRACKMATE,

    // General
    FOCUS_COLOR: "var(--focus-color)",
    FOCUS_COLOR_70: "var(--focus-color-70)",
    FOCUS_COLOR_30: "var(--focus-color-30)",

    // Text Colors
    TEXT_A_DAY: "var(--text-a-day)",
    TEXT_A_DAY_CONTRAST: "var(--text-a-day-contrast)",
    TEXT_B_DAY: "var(--text-b-day)",
    TEXT_B_DAY_CONTRAST: "var(--text-b-day-contrast)",

    // Themed Text Colors
    ADDITEM_HEADER_TEXT: "var(--additem-text)",
    ASSIGNMENT_HEADING_TEXT: "var(--assignment-text-color)",
    EVENT_HEADING_TEXT: "var(--event-text-color)",
    SCHEDULE_HEADING_TEXT: "var(--schedule-text-color)",
    CLASS_HEADING_TEXT: "var(--class-text-color)",
    
    // Buttons
    ADDITEM_BUTTON_BG: "var(--additem-bg)",
    ADDITEM_BUTTON_BG_HOVER: "var(--additem-bg-hover)",
    
    ASSIGNMENT_BUTTON_BG: "var(--assignment-theme)",
    ASSIGNMENT_BUTTON_BG_HOVER: "var(--assignment-theme-hover)",
    ASSIGNMENT_BUTTON_BG_18: "var(--assignment-theme-18)",
    ASSIGNMENT_BUTTON_TEXT: "var(--assignment-text-color)",

    EVENT_BUTTON_BG: "var(--event-theme)",
    EVENT_BUTTON_BG_HOVER: "var(--event-theme-hover)",
    EVENT_BUTTON_TEXT: "var(--event-text-color)",

    SCHEDULE_BUTTON_BG: "var(--schedule-theme)",
    SCHEDULE_BUTTON_BG_HOVER: "var(--schedule-theme-hover)",
    SCHEDULE_BUTTON_TEXT: "var(--schedule-text-color)",

    CLASS_BUTTON_BG: "var(--class-theme)",
    CLASS_BUTTON_BG_HOVER: "var(--class-theme-hover)",
    CLASS_BUTTON_TEXT: "var(--class-text-color)",

    // Priority Colors
    PRIORITY_HIGH_BG: "var(--priority-high-bg)",
    PRIORITY_HIGH_BORDER: "var(--priority-high-border)",
    PRIORITY_HIGH_TEXT: "var(--priority-high-text)",
    PRIORITY_MEDIUM_BG: "var(--priority-medium-bg)",
    PRIORITY_MEDIUM_BORDER: "var(--priority-medium-border)",
    PRIORITY_MEDIUM_TEXT: "var(--priority-medium-text)",
    PRIORITY_LOW_BG: "var(--priority-low-bg)",
    PRIORITY_LOW_BORDER: "var(--priority-low-border)",
    PRIORITY_LOW_TEXT: "var(--priority-low-text)",

    // Status Colors
    STATUS_DONE_TAG_BG: "var(--status-done-bg)",
    STATUS_DONE_TAG_BORDER: "var(--status-done-border)",
    STATUS_DONE_TAG_TEXT: "var(--status-done-text)",

    // Class Colors
    CLASS_COLORS: [0, 10, 25, 38, 47, 142, 173, 199, 217, 239, 258, 292, 330]
        .map((hue) => `hsl(${hue}, 60%, 57%)`),

    EVENT_COLORS: [20, 39, 120, 175, 220, 275].map((hue) => `hsl(${hue}, 40%, 63%)`)
}

// Dashboard page
export const DASHBOARD = {
    ...GLOBAL,

    // Icon Colors
    ICON_PLAY_DEFAULT: "var(--dashboard-icon-play-default)",
    ICON_PLAY_HOVER: "var(--dashboard-icon-play-hover)",
    ICON_IN_PROGRESS: "var(--dashboard-icon-in-progress)",
    ICON_IN_PROGRESS_HOVER: "var(--dashboard-icon-in-progress-hover)",
    ICON_COMPLETE: "var(--dashboard-icon-complete)",
}

// Calendar page
export const CALENDAR = {
    ...GLOBAL,

    // No School
    NO_SCHOOL_BG: "var(--calendar-no-school-bg)",
    NO_SCHOOL_PATTERN: "var(--calendar-no-school-pattern)",

    // Side Panel Items
    ITEM_BG: "var(--calendar-item-bg)",
    ITEM_BG_HOVER: "var(--calendar-item-bg-hover)",
}

// My Assignments page
export const MY_ASSIGNMENTS = {
    ...GLOBAL,

    BOARD_HEADER_TEXT_UPCOMING: "var(--my-assignments-header-upcoming)",
    BOARD_HEADER_TEXT_INPROGRESS: "var(--my-assignments-header-inprogress)",
    BOARD_HEADER_TEXT_DONE: "var(--my-assignments-header-done)",
}

// My Classes page
export const MY_CLASSES = {
    ...GLOBAL,
}

// My Schedule page
export const MY_SCHEDULE = {
    ...GLOBAL,
}

// Settings page
export const SETTINGS = {
    ...GLOBAL,
}

// All modals
export const MODALS = {
    ...TRACKMATE_MODALS,
    ASSIGNMENT: {
        HEADING: GLOBAL.ASSIGNMENT_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.ASSIGNMENT_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER,
        PRIMARY_TEXT: GLOBAL.TEXT_WHITE
    },
    EVENT: {
        HEADING: GLOBAL.EVENT_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.EVENT_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.EVENT_BUTTON_BG_HOVER,
        PRIMARY_TEXT: GLOBAL.TEXT_WHITE,
        COLORS: GLOBAL.EVENT_COLORS
    },
    CLASS: {
        HEADING: GLOBAL.CLASS_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.CLASS_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.CLASS_BUTTON_BG_HOVER,
        PRIMARY_TEXT: GLOBAL.TEXT_WHITE,
        COLORS: GLOBAL.CLASS_COLORS,
    },
    SCHEDULE: {
        HEADING: GLOBAL.SCHEDULE_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.SCHEDULE_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.SCHEDULE_BUTTON_BG_HOVER,
        PRIMARY_TEXT: GLOBAL.TEXT_WHITE
    },
    ACADEMICTERM: {
        HEADING: GLOBAL.SCHEDULE_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.SCHEDULE_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.SCHEDULE_BUTTON_BG_HOVER,
        PRIMARY_TEXT: GLOBAL.TEXT_WHITE
    }
}