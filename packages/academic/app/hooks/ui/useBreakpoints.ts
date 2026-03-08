import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = "(max-width: 767px)"
const TABLET_BREAKPOINT = "(min-width: 768px) and (max-width: 1279px)"
const DESKTOP_BREAKPOINT = "(min-width: 1280px)"

/**
 * Tracks responsive breakpoints via media queries.
 * - `isMobile`: below 768px (below `md`)
 * - `isTablet`: 768px–1279px (`md` to below `xl`)
 * - `isDesktop`: 1280px and above (`xl`+)
 */
export const useBreakpoints = () => {
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_BREAKPOINT).matches)
    const [isTablet, setIsTablet] = useState(() => window.matchMedia(TABLET_BREAKPOINT).matches)
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_BREAKPOINT).matches)

    useEffect(() => {
        const mobileQuery = window.matchMedia(MOBILE_BREAKPOINT)
        const tabletQuery = window.matchMedia(TABLET_BREAKPOINT)
        const desktopQuery = window.matchMedia(DESKTOP_BREAKPOINT)

        const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches)
        const handleTablet = (e: MediaQueryListEvent) => setIsTablet(e.matches)
        const handleDesktop = (e: MediaQueryListEvent) => setIsDesktop(e.matches)

        mobileQuery.addEventListener("change", handleMobile)
        tabletQuery.addEventListener("change", handleTablet)
        desktopQuery.addEventListener("change", handleDesktop)

        return () => {
            mobileQuery.removeEventListener("change", handleMobile)
            tabletQuery.removeEventListener("change", handleTablet)
            desktopQuery.removeEventListener("change", handleDesktop)
        }
    }, [])

    return { isMobile, isTablet, isDesktop }
}
