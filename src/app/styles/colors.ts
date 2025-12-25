// Global Colors
export const GLOBAL = {
    // General
    BACKGROUND: 'var(--webpage-background-color)',
    BLOCK_MODULE_BG: 'var(--block-module-bg)',
    MODAL_BG: 'var(--modal-surface-bg)',
    MODAL_BACKDROP: 'var(--modal-underlay-dark)',
    PAGE_HEADER_TEXT: 'var(--page-header-green)',
    ADDITEM_HEADER_TEXT: 'var(--additem-text-green)',

    // Global Text Colors
    TEXT_PRIMARY: 'var(--text-primary)',
    TEXT_SECONDARY: 'var(--text-secondary)',
    TEXT_TERTIARY: 'var(--text-tertiary)',
    TEXT_MUTED: 'var(--text-muted)',
    MODAL_DELETE_BODY: 'var(--modal-delete-body-text)',

    // Global Border Colors
    BORDER_PRIMARY: 'var(--border-primary)',
    BORDER_SECONDARY: 'var(--border-secondary)',
    BORDER_LIGHT: 'var(--border-light)',
    HEADER_DIVIDER: 'var(--page-header-divider)',
    HEADER_MENU_ICON: 'var(--header-menu-icon)',
    HEADER_MENU_ICON_HOVER: 'var(--header-menu-icon-hover)',

    // Sidebar
    SIDEBAR_BG: 'var(--sidebar-background)',
    SIDEBAR_BORDER: 'var(--sidebar-border)',
    SIDEBAR_TEXT_INACTIVE: 'var(--sidebar-text-inactive)',
    SIDEBAR_TEXT_ACTIVE: 'var(--sidebar-text-active)',
    SIDEBAR_ACTIVE_TAB_GREEN_BG: 'var(--sidebar-active-tab-background)',
    SIDEBAR_INACTIVE_TAB_BLANK_BG: 'var(--sidebar-inactive-tab-background)',
    SIDEBAR_INACTIVE_TAB_BLANK_BG_HOVER: 'var(--sidebar-inactive-tab-contrast)',
    SIDEBAR_CLOSE_ICON: 'var(--sidebar-close-icon)',
    SIDEBAR_CLOSE_ICON_HOVER: 'var(--sidebar-close-icon-tap)',

    // Add Item button colors
    ADDITEM_BUTTON_BG: 'var(--additem-green)',
    ADDITEM_BUTTON_BG_HOVER: 'var(--additem-green-dark)',

    // Text colors
    ASSIGNMENT_HEADING_TEXT: 'var(--assignment-text-color)',
    EVENT_HEADING_TEXT: 'var(--event-text-color)',
    NOSCHOOL_HEADING_TEXT: 'var(--noschool-text-color)',
    CLASS_HEADING_TEXT: 'var(--class-text-color)',

    // Assignment-related colors
    ASSIGNMENT_BUTTON_BG: 'var(--assignment-background)',
    ASSIGNMENT_BUTTON_BG_HOVER: 'var(--assignment-background-hover)',
    ASSIGNMENT_BUTTON_TEXT: 'var(--assignment-text-color)',

    // Event-related colors
    EVENT_BUTTON_BG: 'var(--event-background)',
    EVENT_BUTTON_BG_HOVER: 'var(--event-background-hover)',
    EVENT_BUTTON_TEXT: 'var(--event-text-color)',

    // No School-related colors
    NOSCHOOL_BUTTON_BG: 'var(--noschool-background)',
    NOSCHOOL_BUTTON_BG_HOVER: 'var(--noschool-background-hover)',
    NOSCHOOL_BUTTON_TEXT: 'var(--noschool-text-color)',

    // Class-related colors
    CLASS_BUTTON_BG: 'var(--class-background)',
    CLASS_BUTTON_BG_HOVER: 'var(--class-background-hover)',
    CLASS_BUTTON_TEXT: 'var(--class-text-color)',

    // Cancel button colors
    CANCEL_BUTTON_BG: 'var(--cancel-button-background)',
    CANCEL_BUTTON_BG_HOVER: 'var(--cancel-button-background-hover)',
    CANCEL_BUTTON_TEXT: 'var(--cancel-text)',
    CANCEL_BUTTON_BORDER: 'var(--cancel-button-border)',

    // Delete button colors
    DELETE_BUTTON_BG: 'var(--delete-button-bg)',
    DELETE_BUTTON_BG_HOVER: 'var(--delete-button-bg-hover)',
    DELETE_BUTTON_TEXT: 'var(--delete-text-white)',

    // Global Priority Colors
    PRIORITY_HIGH_BG: 'var(--priority-high-bg)',
    PRIORITY_HIGH_BORDER: 'var(--priority-high-border)',
    PRIORITY_HIGH_TEXT: 'var(--priority-high-text)',
    PRIORITY_MEDIUM_BG: 'var(--priority-medium-bg)',
    PRIORITY_MEDIUM_BORDER: 'var(--priority-medium-border)',
    PRIORITY_MEDIUM_TEXT: 'var(--priority-medium-text)',
    PRIORITY_LOW_BG: 'var(--priority-low-bg)',
    PRIORITY_LOW_BORDER: 'var(--priority-low-border)',
    PRIORITY_LOW_TEXT: 'var(--priority-low-text)',

    // Global Status Colors
    STATUS_DONE_TAG_BG: 'var(--status-done-bg)',
    STATUS_DONE_TAG_BORDER: 'var(--status-done-border)',
    STATUS_DONE_TAG_TEXT: 'var(--status-done-text)',
}

// Dashboard page
export const DASHBOARD = {
    ...GLOBAL,
    // General
    MODULE_BG: 'var(--dashboard-module-bg)',
    MODULE_BORDER: 'var(--dashboard-module-border)',
    MODULE_SHADOW: 'var(--dashboard-module-shadow)',
    CARD_BG: 'var(--dashboard-card-bg)',
    CARD_HOVER_BG: 'var(--dashboard-card-hover-bg)',
    CARD_SHADOW: 'var(--dashboard-card-shadow)',
    BADGE_BG: 'var(--dashboard-badge-bg)',

    // General Text Colors
    TEXT_GRAY_400: 'var(--dashboard-text-gray-400)',
    TEXT_GRAY_500: 'var(--dashboard-text-gray-500)',
    TEXT_WHITE: 'var(--dashboard-text-white)',
    NO_SCHOOL_TEXT: 'var(--dashboard-no-school-text)',

    // Priority Colors
    PRIORITY_HIGH: 'var(--dashboard-priority-high)',
    PRIORITY_MEDIUM: 'var(--dashboard-priority-medium)',
    PRIORITY_LOW: 'var(--dashboard-priority-low)',

    // Priority Badge Styles
    PRIORITY_HIGH_BG: GLOBAL.PRIORITY_HIGH_BG,
    PRIORITY_HIGH_BORDER: GLOBAL.PRIORITY_HIGH_BORDER,
    PRIORITY_HIGH_TEXT: GLOBAL.PRIORITY_HIGH_TEXT,

    PRIORITY_MEDIUM_BG: GLOBAL.PRIORITY_MEDIUM_BG,
    PRIORITY_MEDIUM_BORDER: GLOBAL.PRIORITY_MEDIUM_BORDER,
    PRIORITY_MEDIUM_TEXT: GLOBAL.PRIORITY_MEDIUM_TEXT,

    PRIORITY_LOW_BG: GLOBAL.PRIORITY_LOW_BG,
    PRIORITY_LOW_BORDER: GLOBAL.PRIORITY_LOW_BORDER,
    PRIORITY_LOW_TEXT: GLOBAL.PRIORITY_LOW_TEXT,

    // Icon Colors
    ICON_PLAY_DEFAULT: 'var(--dashboard-icon-play-default)',
    ICON_PLAY_HOVER: 'var(--dashboard-icon-play-hover)',
    ICON_IN_PROGRESS: 'var(--dashboard-icon-in-progress)',
    ICON_IN_PROGRESS_HOVER: 'var(--dashboard-icon-in-progress-hover)',
    ICON_COMPLETE: 'var(--dashboard-icon-complete)',
    ICON_COMPLETE_HOVER: 'var(--dashboard-icon-complete-hover)',

    // Today's Assignments Box
    CLASS_ITEM_BG: 'var(--dashboard-class-item-bg)',
    CLASS_ITEM_HOVER_BG: 'var(--dashboard-class-item-hover-bg)',
    // Today's Events Box
    EVENT_ITEM_BG: 'var(--dashboard-event-item-bg)',
    EVENT_ITEM_HOVER_BG: 'var(--dashboard-event-item-hover-bg)'
}

// Calendar page
export const CALENDAR = {
    ...GLOBAL,
    // General
    BG_COLOR: 'var(--calendar-bg-color)',
    BORDER_COLOR: 'var(--calendar-border-color)',
    CONTAINER_SHADOW: 'var(--calendar-container-shadow)',

    // Header
    HEADER_TEXT: 'var(--calendar-header-text)',
    HEADER_ICON: 'var(--calendar-header-icon)',
    HEADER_BUTTON_HOVER: 'var(--calendar-header-button-hover)',

    // Headings
    ASSIGNMENT_HEADING: GLOBAL.ASSIGNMENT_HEADING_TEXT,
    EVENT_HEADING: GLOBAL.EVENT_HEADING_TEXT,
    CLASS_HEADING: GLOBAL.CLASS_HEADING_TEXT,
    NO_SCHOOL_HEADING: GLOBAL.NOSCHOOL_HEADING_TEXT,

    // Grid
    GRID_BORDER: 'var(--calendar-grid-border)',
    DAY_HEADER_BG: 'var(--calendar-day-header-bg)',
    DAY_HEADER_TEXT: 'var(--calendar-day-header-text)',

    // Day Cell
    DAY_BG: 'var(--calendar-day-bg)',
    DAY_BG_HOVER: 'var(--calendar-day-bg-hover)',
    DAY_INACTIVE_BG: 'var(--calendar-day-inactive-bg)',
    DAY_INACTIVE_TEXT: 'var(--calendar-day-inactive-text)',
    DAY_NUMBER_TEXT: 'var(--calendar-day-number-text)',

    // Today
    TODAY_BG: 'var(--calendar-today-bg)',
    TODAY_BORDER: 'var(--calendar-today-border)',

    // No School
    NO_SCHOOL_BG: 'var(--calendar-no-school-bg)',
    NO_SCHOOL_BORDER: 'var(--calendar-no-school-border)',
    NO_SCHOOL_TEXT: 'var(--calendar-no-school-text)',
    NO_SCHOOL_PATTERN: 'var(--calendar-no-school-pattern)',

    // Side Panel
    SIDE_PANEL_BG: 'var(--calendar-side-panel-bg)',
    SIDE_PANEL_BORDER: 'var(--calendar-side-panel-border)',
    SIDE_PANEL_TEXT: 'var(--calendar-side-panel-text)',
    SIDE_PANEL_DIM_TEXT: 'var(--calendar-side-panel-dim-text)',
    SIDE_PANEL_CLOSE_ICON: 'var(--calendar-side-panel-close-icon)',
    SIDE_PANEL_CLOSE_ICON_HOVER: 'var(--calendar-side-panel-close-icon-hover)',

    // Side Panel - Items
    ITEM_BG: 'var(--calendar-item-bg)',
    ITEM_BG_HOVER: 'var(--calendar-item-bg-hover)',

    // Day Types
    A_DAY_TEXT: 'var(--calendar-a-day-text)',
    B_DAY_TEXT: 'var(--calendar-b-day-text)',

    // Priorities & Status
    PRIORITY_HIGH_BG: GLOBAL.PRIORITY_HIGH_BG,
    PRIORITY_HIGH_BORDER: GLOBAL.PRIORITY_HIGH_BORDER,
    PRIORITY_HIGH_TEXT: GLOBAL.PRIORITY_HIGH_TEXT,
    PRIORITY_MEDIUM_BG: GLOBAL.PRIORITY_MEDIUM_BG,
    PRIORITY_MEDIUM_BORDER: GLOBAL.PRIORITY_MEDIUM_BORDER,
    PRIORITY_MEDIUM_TEXT: GLOBAL.PRIORITY_MEDIUM_TEXT,
    PRIORITY_LOW_BG: GLOBAL.PRIORITY_LOW_BG,
    PRIORITY_LOW_BORDER: GLOBAL.PRIORITY_LOW_BORDER,
    PRIORITY_LOW_TEXT: GLOBAL.PRIORITY_LOW_TEXT,

    STATUS_DONE_TEXT: 'var(--calendar-status-done-text)',
    STATUS_DONE_TAG_BG: GLOBAL.STATUS_DONE_TAG_BG,
    STATUS_DONE_TAG_TEXT: GLOBAL.STATUS_DONE_TAG_TEXT,
    STATUS_DONE_TAG_BORDER: GLOBAL.STATUS_DONE_TAG_BORDER,

    // Default Class Color
    DEFAULT_CLASS_COLOR: 'var(--calendar-default-class-color)',
}

// My Assignments page
export const MY_ASSIGNMENTS = {
    ...GLOBAL,
    BOARD_BG: 'var(--my-assignments-board-bg)',
    COLUMN_BORDER: 'var(--my-assignments-column-border)',
    COLUMN_SHADOW: 'var(--my-assignments-column-shadow)',

    HEADER_TEXT_TODO: 'var(--my-assignments-header-todo)',
    HEADER_TEXT_INPROGRESS: 'var(--my-assignments-header-inprogress)',
    HEADER_TEXT_DONE: 'var(--my-assignments-header-done)',
    COUNT_BORDER_TODO: 'var(--my-assignments-count-border-todo)',
    COUNT_BORDER_INPROGRESS: 'var(--my-assignments-count-border-inprogress)',
    COUNT_BORDER_DONE: 'var(--my-assignments-count-border-done)',

    ITEM_BG: 'var(--my-assignments-item-bg)',
    ITEM_HOVER_BG: 'var(--my-assignments-item-hover-bg)',
    ITEM_TEXT: 'var(--my-assignments-item-text)',
    ITEM_SUBTEXT: 'var(--my-assignments-item-subtext)',
    ITEM_SHADOW: 'var(--my-assignments-item-shadow)',

    PRIORITY_HIGH_BG: GLOBAL.PRIORITY_HIGH_BG,
    PRIORITY_HIGH_BORDER: GLOBAL.PRIORITY_HIGH_BORDER,
    PRIORITY_HIGH_TEXT: GLOBAL.PRIORITY_HIGH_TEXT,

    PRIORITY_MEDIUM_BG: GLOBAL.PRIORITY_MEDIUM_BG,
    PRIORITY_MEDIUM_BORDER: GLOBAL.PRIORITY_MEDIUM_BORDER,
    PRIORITY_MEDIUM_TEXT: GLOBAL.PRIORITY_MEDIUM_TEXT,

    PRIORITY_LOW_BG: GLOBAL.PRIORITY_LOW_BG,
    PRIORITY_LOW_BORDER: GLOBAL.PRIORITY_LOW_BORDER,
    PRIORITY_LOW_TEXT: GLOBAL.PRIORITY_LOW_TEXT,
}

// My Classes page
export const MY_CLASSES = {
    ...GLOBAL,
    CLASS_TEXT_THEME: 'var(--my-classes-text-theme)',
    CLASS_TEXT_THEME_HOVER: 'var(--my-classes-text-theme-hover)',
    CLASS_MODAL_BUTTON_BG: 'var(--my-classes-modal-button-bg)',
    CLASS_MODAL_BUTTON_BG_HOVER: 'var(--my-classes-modal-button-bg-hover)',
    CLASS_CARD_BG: 'var(--my-classes-card-bg)',
    CARD_HOVER_BG: 'var(--my-classes-card-hover-bg)',

    BORDER: 'var(--my-classes-border)',
    SHADOW: 'var(--my-classes-shadow)',
    DRAGGING_BORDER: 'var(--my-classes-dragging-border)',
    HOVER_BORDER: 'var(--my-classes-hover-border)',

    TEXT_HEADER: 'var(--my-classes-text-header)',
    TEXT_HEADER_HOVER: 'var(--my-classes-text-header-hover)',
    TEXT_LABEL: 'var(--my-classes-text-label)',
    TEXT_VALUE: 'var(--my-classes-text-value)',

    ICON_COLOR: 'var(--my-classes-icon-color)',
    ICON_HOVER: 'var(--my-classes-icon-hover)',
    ICON_DELETE_HOVER: 'var(--my-classes-icon-delete-hover)',

    CLASS_COLORS: [
        'var(--class-color-1)', 'var(--class-color-2)', 'var(--class-color-3)', 'var(--class-color-4)',
        'var(--class-color-5)', 'var(--class-color-6)', 'var(--class-color-7)', 'var(--class-color-8)',
        'var(--class-color-9)', 'var(--class-color-10)', 'var(--class-color-11)', 'var(--class-color-12)',
        'var(--class-color-13)',
    ]
}

// Modal-specific colors (shared across modal components)
export const MODALS = {
    BASE: {
        BG: GLOBAL.MODAL_BG,
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
        COLORS: [
            'var(--event-color-1)', 'var(--event-color-2)', 'var(--event-color-3)',
            'var(--event-color-4)', 'var(--event-color-5)', 'var(--event-color-6)'
        ]
    },
    CLASS: {
        HEADING: MY_CLASSES.CLASS_TEXT_THEME,
        PRIMARY_BG: MY_CLASSES.CLASS_MODAL_BUTTON_BG,
        PRIMARY_BG_HOVER: MY_CLASSES.CLASS_MODAL_BUTTON_BG_HOVER,
        PRIMARY_TEXT: '#ffffff',
        COLORS: MY_CLASSES.CLASS_COLORS,
    },
    NOSCHOOL: {
        HEADING: GLOBAL.NOSCHOOL_HEADING_TEXT,
        PRIMARY_BG: GLOBAL.NOSCHOOL_BUTTON_BG,
        PRIMARY_BG_HOVER: GLOBAL.NOSCHOOL_BUTTON_BG_HOVER,
        PRIMARY_TEXT: '#ffffff'
    }
}

// My Schedule page
export const MY_SCHEDULE = {
    ...GLOBAL,
    MODULE_BG: 'var(--my-schedule-module-bg)',
    MODULE_BORDER: 'var(--my-schedule-module-border)',
    MODULE_SHADOW: 'var(--my-schedule-module-shadow)',
    TEXT_HEADER: 'var(--my-schedule-text-header)',

    REMOVE_BUTTON_BG: GLOBAL.DELETE_BUTTON_BG,
    REMOVE_BUTTON_BG_HOVER: GLOBAL.DELETE_BUTTON_BG_HOVER,
    REMOVE_BUTTON_TEXT: GLOBAL.DELETE_BUTTON_TEXT,

    CARD_BG: 'var(--my-schedule-card-bg)',
    TEXT_PRIMARY: 'var(--my-schedule-text-primary)',
    TEXT_SECONDARY: 'var(--my-schedule-text-secondary)',

    EMPTY_BG: 'var(--my-schedule-empty-bg)',
    EMPTY_BORDER: 'var(--my-schedule-empty-border)',
    EMPTY_BORDER_HOVER: 'var(--my-schedule-empty-border-hover)',
    EMPTY_TEXT: 'var(--my-schedule-empty-text)',
    EMPTY_SUBTEXT: 'var(--my-schedule-empty-subtext)',
}

// Settings page
export const SETTINGS = {
    ...GLOBAL,
    MODULE_BG: 'var(--settings-module-bg)',
    MODULE_BORDER: 'var(--settings-module-border)',
    MODULE_SHADOW: 'var(--settings-module-shadow)',
    SCHEDULE_SETTINGS_HEADER: 'var(--settings-schedule-header)',
    BODY_TEXT: 'var(--settings-body-text)',

    CARD_BG: 'var(--settings-card-bg)',
    CARD_BORDER: 'var(--settings-card-border)',

    TEXT_DANGER: 'var(--settings-text-danger)',
    BUTTON_DANGER_BG: 'var(--settings-button-danger-bg)',
    BUTTON_DANGER_HOVER: 'var(--settings-button-danger-bg-hover)',
    BUTTON_DANGER_TEXT: 'var(--settings-button-danger-text)',

    BUTTON_A_BG: 'var(--settings-button-a-bg)',
    BUTTON_A_HOVER: 'var(--settings-button-a-hover)',
    BUTTON_B_BG: 'var(--settings-button-b-bg)',
    BUTTON_B_HOVER: 'var(--settings-button-b-hover)',
    TEXT_A: 'var(--settings-text-a)',
    TEXT_B: 'var(--settings-text-b)',

    SEMESTER_BG: 'var(--settings-semester-bg)',
}