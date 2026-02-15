export const TRACKMATE = {
    // General
    GLOBAL_ACCENT: "var(--global-accent)",
    WEBPAGE_BACKGROUND: "var(--webpage-background-color)",
    BACKGROUND_PRIMARY: "var(--background-primary)",
    BACKGROUND_SECONDARY: "var(--background-secondary)",
    BACKGROUND_TERTIARY: "var(--background-tertiary)",
    BACKGROUND_QUATERNARY: "var(--background-quaternary)",
    BACKGROUND_BLACK_50: "var(--background-black-50)",
    BACKGROUND_BLACK_30: "var(--background-black-30)",
    BACKGROUND_BLACK_05: "var(--background-black-05)",
    MODAL_BACKDROP: "var(--modal-underlay-dark)",

    // Text Colors
    TEXT_PRIMARY: "var(--text-primary)",
    TEXT_SECONDARY: "var(--text-secondary)",
    TEXT_TERTIARY: "var(--text-tertiary)",
    TEXT_MUTED: "var(--text-muted)",
    TEXT_DANGER: "var(--text-danger)",
    TEXT_SUCCESS: "var(--text-success)",
    TEXT_SUCCESS_15: "var(--text-success-15)",
    TEXT_WHITE: "var(--text-white)",
    MODAL_DELETE_BODY: "var(--modal-delete-body-text)",

    // Border Colors
    BORDER_PRIMARY: "var(--border-primary)",
    BORDER_SECONDARY: "var(--border-secondary)",
    HEADER_DIVIDER: "var(--page-header-divider)",

    // Buttons
    CANCEL_BUTTON_BG: "var(--cancel-button-bg)",
    CANCEL_BUTTON_BG_HOVER: "var(--cancel-button-bg-hover)",
    CANCEL_BUTTON_TEXT: "var(--cancel-text)",
    CANCEL_BUTTON_BORDER: "var(--cancel-button-border)",

    DELETE_BUTTON_BG: "var(--delete-button-bg)",
    DELETE_BUTTON_BG_HOVER: "var(--delete-button-bg-hover)",
    DELETE_BUTTON_TEXT: "var(--delete-button-text)",

    HOVER_ZONE_BUTTON_BORDER: "var(--hover-zone-button-border)",
    HOVER_ZONE_BUTTON_BORDER_HOVER: "var(--hover-zone-button-border-hover)",

}

export const TRACKMATE_MODALS = {
    BASE: {
        BG: TRACKMATE.BACKGROUND_PRIMARY,
        BACKDROP: TRACKMATE.MODAL_BACKDROP,
        BORDER: TRACKMATE.BORDER_PRIMARY,
        TEXT: TRACKMATE.TEXT_PRIMARY,
        DELETE_BODY: TRACKMATE.MODAL_DELETE_BODY,
        DELETE_HEADING: TRACKMATE.DELETE_BUTTON_BG,
        CANCEL_BG: TRACKMATE.CANCEL_BUTTON_BG,
        CANCEL_BG_HOVER: TRACKMATE.CANCEL_BUTTON_BG_HOVER,
        CANCEL_TEXT: TRACKMATE.CANCEL_BUTTON_TEXT,
        CANCEL_BORDER: TRACKMATE.CANCEL_BUTTON_BORDER,
        DELETE_BG: TRACKMATE.DELETE_BUTTON_BG,
        DELETE_BG_HOVER: TRACKMATE.DELETE_BUTTON_BG_HOVER,
        DELETE_TEXT: TRACKMATE.DELETE_BUTTON_TEXT
    },
}