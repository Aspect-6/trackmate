import { useNavigate, NavigateOptions, useLocation } from "react-router-dom"

interface RedirectOptions {
    /**
     * If true, uses full page navigation (window.location.href) for cross-SPA
     * paths (e.g., /academic). Required for cross-SPA navigation.
     * @default false
     */
    allowCrossApp?: boolean
}

/**
 * Hook that returns a redirect function. A drop-in replacement for useNavigate
 * with optional cross-app navigation support.
 * 
 * @example
 * // Basic usage (same as useNavigate)
 * const redirect = useRedirect()
 * redirect("/account")
 * 
 * @example
 * // With cross-app support
 * const redirect = useRedirect({ allowCrossApp: true })
 * redirect("/academic/dashboard")  // Full page navigation
 * redirect("/account")             // Client-side navigation
 */
export const useRedirect = (options: RedirectOptions = {}) => {
    const { allowCrossApp = false } = options
    const navigate = useNavigate()
    const location = useLocation()

    const appRoots = ["/academic"]
    const landingRoots = ["/auth", "/landing", "/account"]

    const getAppRoot = (path: string): string => {
        if (!path.startsWith("/")) {
            return ""
        }
        if (landingRoots.some((root) => path.startsWith(root))) {
            return "/landing"
        }
        const matchedAppRoot = appRoots.find((root) => path.startsWith(root))
        return matchedAppRoot ?? ""
    }

    /**
     * Redirects to the specified path.
     * Works like useNavigate but can handle cross-SPA navigation when allowCrossApp is true.
     */
    return (path: string, navigateOptions?: NavigateOptions) => {
        const currentRoot = getAppRoot(location.pathname)
        const targetRoot = getAppRoot(path)
        const isCrossAppPath = currentRoot !== "" && targetRoot !== "" && currentRoot !== targetRoot

        if (allowCrossApp && isCrossAppPath) {
            window.location.href = path
        } else {
            navigate(path, navigateOptions)
        }
    }
}
