import { useNavigate, NavigateOptions } from "react-router-dom"

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

    /**
     * Redirects to the specified path.
     * Works like useNavigate but can handle cross-SPA navigation when allowCrossApp is true.
     */
    return (path: string, navigateOptions?: NavigateOptions) => {
        const isCrossAppPath = path.startsWith("/academic")

        if (allowCrossApp && isCrossAppPath) {
            window.location.href = path
        } else {
            navigate(path, navigateOptions)
        }
    }
}
