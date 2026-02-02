import { TRACKMATE } from "@shared/styles/colors"

export const GLOBAL = {
    ...TRACKMATE,

    // Focus Colors
    FOCUS_COLOR: 'var(--focus-color)',
    FOCUS_COLOR_70: 'var(--focus-color-70)',
    FOCUS_COLOR_30: 'var(--focus-color-30)',

    GLOBAL_ACCENT: 'var(--global-accent)',
    GLOBAL_ACCENT_15: 'var(--global-accent-15)',
    GLOBAL_ACCENT_25: 'var(--global-accent-25)',

    PRIMARY_BUTTON_BG: 'var(--primary-button-bg)',
    PRIMARY_BUTTON_BG_HOVER: 'var(--primary-button-bg-hover)',
}

// Auth Page Colors
export const AUTH = {
    ...GLOBAL,
}

// Landing Page Colors
export const LANDING = {
    ...GLOBAL,
}

// Account Page Colors
export const ACCOUNT = {
    ...GLOBAL,

    // Danger Zone Colors
    DANGER_ZONE_BG: 'var(--danger-zone-bg)',
    DANGER_ZONE_BG_PATTERN: 'var(--danger-zone-bg-pattern)',
    DANGER_ZONE_BORDER: 'var(--danger-zone-border)',
    DANGER_ZONE_CONFIRM_DELETE_SHADOW: 'var(--danger-zone-confirm-delete-shadow)',
}

