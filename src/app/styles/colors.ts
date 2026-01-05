// Global Colors
export const GLOBAL = {
    // General
    WEBPAGE_BACKGROUND: 'var(--webpage-background-color)',
    BACKGROUND_PRIMARY: 'var(--background-primary)',
    BACKGROUND_SECONDARY: 'var(--background-secondary)',
    BACKGROUND_TERTIARY: 'var(--background-tertiary)',
    BACKGROUND_QUATERNARY: 'var(--background-quaternary)',
    BACKGROUND_BLACK_50: 'var(--background-black-50)',
    BACKGROUND_BLACK_30: 'var(--background-black-30)',
    MODAL_BACKDROP: 'var(--modal-underlay-dark)',
    PAGE_HEADER_TEXT: 'var(--page-header-text)',
    FOCUS_COLOR: 'var(--focus-color)',
    FOCUS_COLOR_70: 'var(--focus-color-70)',
    FOCUS_COLOR_30: 'var(--focus-color-30)',

    // Text Colors
    TEXT_PRIMARY: 'var(--text-primary)',
    TEXT_SECONDARY: 'var(--text-secondary)',
    TEXT_TERTIARY: 'var(--text-tertiary)',
    TEXT_MUTED: 'var(--text-muted)',
    TEXT_DANGER: 'var(--text-danger)',
    TEXT_WHITE: 'var(--text-white)',
    TEXT_A_DAY: 'var(--text-a-day)',
    TEXT_A_DAY_CONTRAST: 'var(--text-a-day-contrast)',
    TEXT_B_DAY: 'var(--text-b-day)',
    TEXT_B_DAY_CONTRAST: 'var(--text-b-day-contrast)',
    MODAL_DELETE_BODY: 'var(--modal-delete-body-text)',

    // Border Colors
    BORDER_PRIMARY: 'var(--border-primary)',
    BORDER_SECONDARY: 'var(--border-secondary)',
    BORDER_LIGHT: 'var(--border-light)',
    HEADER_DIVIDER: 'var(--page-header-divider)',
    HEADER_MENU_ICON: 'var(--header-menu-icon)',
    HEADER_MENU_ICON_HOVER: 'var(--header-menu-icon-hover)',

    // Sidebar
    SIDEBAR_BG: 'var(--sidebar-bg)',
    SIDEBAR_BORDER: 'var(--sidebar-border)',
    SIDEBAR_TEXT_INACTIVE: 'var(--sidebar-text-inactive)',
    SIDEBAR_TEXT_ACTIVE: 'var(--sidebar-text-active)',
    SIDEBAR_ACTIVE_TAB_GREEN_BG: 'var(--sidebar-tab-active-bg)',
    SIDEBAR_INACTIVE_TAB_BLANK_BG: 'var(--sidebar-tab-inactive-bg)',
    SIDEBAR_INACTIVE_TAB_BLANK_BG_HOVER: 'var(--sidebar-tab-inactive-contrast)',
    SIDEBAR_CLOSE_ICON: 'var(--sidebar-icon-close)',
    SIDEBAR_CLOSE_ICON_HOVER: 'var(--sidebar-icon-close-tap)',

    // Themed text colors
    ADDITEM_HEADER_TEXT: 'var(--additem-text)',
    ASSIGNMENT_HEADING_TEXT: 'var(--assignment-text-color)',
    EVENT_HEADING_TEXT: 'var(--event-text-color)',
    SCHEDULE_HEADING_TEXT: 'var(--schedule-text-color)',
    CLASS_HEADING_TEXT: 'var(--class-text-color)',

    // Buttons
    ADDITEM_BUTTON_BG: 'var(--additem-bg)',
    ADDITEM_BUTTON_BG_HOVER: 'var(--additem-bg-hover)',

    ASSIGNMENT_BUTTON_BG: 'var(--assignment-theme)',
    ASSIGNMENT_BUTTON_BG_HOVER: 'var(--assignment-theme-hover)',
    ASSIGNMENT_BUTTON_TEXT: 'var(--assignment-text-color)',

    EVENT_BUTTON_BG: 'var(--event-theme)',
    EVENT_BUTTON_BG_HOVER: 'var(--event-theme-hover)',
    EVENT_BUTTON_TEXT: 'var(--event-text-color)',

    SCHEDULE_BUTTON_BG: 'var(--schedule-theme)',
    SCHEDULE_BUTTON_BG_HOVER: 'var(--schedule-theme-hover)',
    SCHEDULE_BUTTON_TEXT: 'var(--schedule-text-color)',

    CLASS_BUTTON_BG: 'var(--class-theme)',
    CLASS_BUTTON_BG_HOVER: 'var(--class-theme-hover)',
    CLASS_BUTTON_TEXT: 'var(--class-text-color)',

    CANCEL_BUTTON_BG: 'var(--cancel-button-bg)',
    CANCEL_BUTTON_BG_HOVER: 'var(--cancel-button-bg-hover)',
    CANCEL_BUTTON_TEXT: 'var(--cancel-text)',
    CANCEL_BUTTON_BORDER: 'var(--cancel-button-border)',

    DELETE_BUTTON_BG: 'var(--delete-button-bg)',
    DELETE_BUTTON_BG_HOVER: 'var(--delete-button-bg-hover)',
    DELETE_BUTTON_TEXT: 'var(--delete-button-text)',

    HOVER_ZONE_BUTTON_BORDER: 'var(--hover-zone-button-border)',
    HOVER_ZONE_BUTTON_BORDER_HOVER: 'var(--hover-zone-button-border-hover)',

    // Priority Colors
    PRIORITY_HIGH_BG: 'var(--priority-high-bg)',
    PRIORITY_HIGH_BORDER: 'var(--priority-high-border)',
    PRIORITY_HIGH_TEXT: 'var(--priority-high-text)',
    PRIORITY_MEDIUM_BG: 'var(--priority-medium-bg)',
    PRIORITY_MEDIUM_BORDER: 'var(--priority-medium-border)',
    PRIORITY_MEDIUM_TEXT: 'var(--priority-medium-text)',
    PRIORITY_LOW_BG: 'var(--priority-low-bg)',
    PRIORITY_LOW_BORDER: 'var(--priority-low-border)',
    PRIORITY_LOW_TEXT: 'var(--priority-low-text)',

    // Status Colors
    STATUS_DONE_TAG_BG: 'var(--status-done-bg)',
    STATUS_DONE_TAG_BORDER: 'var(--status-done-border)',
    STATUS_DONE_TAG_TEXT: 'var(--status-done-text)',

    // Class Colors
    CLASS_COLORS: [0, 10, 25, 38, 47, 142, 173, 199, 217, 239, 258, 292, 330]
        .map((hue) => `hsl(${hue}, 60%, 57%)`),
    
    EVENT_COLORS: [20, 39, 120, 175, 220, 275].map((hue) => `hsl(${hue}, 40%, 63%)`)
}

// Dashboard page
export const DASHBOARD = {
    ...GLOBAL,

    // Icon Colors
    ICON_PLAY_DEFAULT: 'var(--dashboard-icon-play-default)',
    ICON_PLAY_HOVER: 'var(--dashboard-icon-play-hover)',
    ICON_IN_PROGRESS: 'var(--dashboard-icon-in-progress)',
    ICON_IN_PROGRESS_HOVER: 'var(--dashboard-icon-in-progress-hover)',
    ICON_COMPLETE: 'var(--dashboard-icon-complete)',
    ICON_COMPLETE_HOVER: 'var(--dashboard-icon-complete-hover)',
}

// Calendar page
export const CALENDAR = {
    ...GLOBAL,

    // Day Cell
    DAY_INACTIVE_BG: 'var(--calendar-day-inactive-bg)',

    // No School
    NO_SCHOOL_BG: 'var(--calendar-no-school-bg)',
    NO_SCHOOL_PATTERN: 'var(--calendar-no-school-pattern)',

    // Side Panel Items
    ITEM_BG: 'var(--calendar-item-bg)',
    ITEM_BG_HOVER: 'var(--calendar-item-bg-hover)',
}

// My Assignments page
export const MY_ASSIGNMENTS = {
    ...GLOBAL,

    BOARD_HEADER_TEXT_UPCOMING: 'var(--my-assignments-header-upcoming)',
    BOARD_HEADER_TEXT_INPROGRESS: 'var(--my-assignments-header-inprogress)',
    BOARD_HEADER_TEXT_DONE: 'var(--my-assignments-header-done)',
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
    BASE: {
        BG: GLOBAL.BACKGROUND_SECONDARY,
        BACKDROP: GLOBAL.MODAL_BACKDROP,
        BORDER: GLOBAL.BORDER_PRIMARY,
        TEXT: GLOBAL.TEXT_PRIMARY,
        DELETE_BODY: GLOBAL.MODAL_DELETE_BODY,
        DELETE_HEADING: GLOBAL.DELETE_BUTTON_BG,
        CANCEL_BG: GLOBAL.CANCEL_BUTTON_BG,
        CANCEL_BG_HOVER: GLOBAL.CANCEL_BUTTON_BG_HOVER,
        CANCEL_TEXT: GLOBAL.CANCEL_BUTTON_TEXT,
        CANCEL_BORDER: GLOBAL.CANCEL_BUTTON_BORDER,
        DELETE_BG: GLOBAL.DELETE_BUTTON_BG,
        DELETE_BG_HOVER: GLOBAL.DELETE_BUTTON_BG_HOVER,
        DELETE_TEXT: GLOBAL.DELETE_BUTTON_TEXT
    },
    ASSIGNMENT: {
        HEADING: GLOBAL.ASSIGNMENT_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.ASSIGNMENT_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.ASSIGNMENT_BUTTON_BG_HOVER,
        PRIMARY_TEXT: '#ffffff'
    },
    EVENT: {
        HEADING: GLOBAL.EVENT_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.EVENT_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.EVENT_BUTTON_BG_HOVER,
        PRIMARY_TEXT: GLOBAL.EVENT_BUTTON_TEXT,
        COLORS: GLOBAL.EVENT_COLORS
    },
    CLASS: {
        HEADING: GLOBAL.CLASS_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.CLASS_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.CLASS_BUTTON_BG_HOVER,
        PRIMARY_TEXT: '#ffffff',
        COLORS: GLOBAL.CLASS_COLORS,
    },
    SCHEDULE: {
        HEADING: GLOBAL.SCHEDULE_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.SCHEDULE_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.SCHEDULE_BUTTON_BG_HOVER,
        PRIMARY_TEXT: '#ffffff'
    },
    ACADEMICTERM: {
        HEADING: GLOBAL.SCHEDULE_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.SCHEDULE_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.SCHEDULE_BUTTON_BG_HOVER,
        PRIMARY_TEXT: '#ffffff'
    }
}