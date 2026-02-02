export interface RouteConfig {
    path: string
    fullPath: string
    title: string
}

export const BASE_PATH = "/academic"

const route = (name: string, title: string): RouteConfig => {
    return {
        path: name,
        fullPath: `${BASE_PATH}/${name}`,
        title,
    }
}

/**
 * All route configurations keyed by route ID.
 */
export const ROUTES = {
    "dashboard": route("dashboard", "Dashboard"),
    "calendar": route("calendar", "Calendar"),
    "my-assignments": route("my-assignments", "My Assignments"),
    "my-classes": route("my-classes", "My Classes"),
    "my-schedule": route("my-schedule", "My Schedule"),
    "settings": route("settings", "Settings"),
}

export const PATHS = {
    "dashboard": ROUTES["dashboard"].fullPath,
    "calendar": ROUTES["calendar"].fullPath,
    "my-assignments": ROUTES["my-assignments"].fullPath,
    "my-classes": ROUTES["my-classes"].fullPath,
    "my-schedule": ROUTES["my-schedule"].fullPath,
    "settings": ROUTES["settings"].fullPath,
}

export const DEFAULT_ROUTE = ROUTES["dashboard"]

export function getRouteByPath(pathname: string): RouteConfig | undefined {
    if (pathname === "/") return DEFAULT_ROUTE
    return Object.values(ROUTES).find(r => r.fullPath === pathname)
}
