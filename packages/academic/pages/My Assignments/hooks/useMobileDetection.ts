import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = "(max-width: 767px)"
const TABLET_BREAKPOINT = "(min-width: 768px) and (max-width: 1279px)"

export const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_BREAKPOINT).matches)
    const [isTablet, setIsTablet] = useState(() => window.matchMedia(TABLET_BREAKPOINT).matches)

    useEffect(() => {
        const mobileQuery = window.matchMedia(MOBILE_BREAKPOINT)
        const tabletQuery = window.matchMedia(TABLET_BREAKPOINT)

        setIsMobile(mobileQuery.matches)
        setIsTablet(tabletQuery.matches)

        const handleMobile = (event: MediaQueryListEvent) => setIsMobile(event.matches)
        const handleTablet = (event: MediaQueryListEvent) => setIsTablet(event.matches)

        mobileQuery.addEventListener("change", handleMobile)
        tabletQuery.addEventListener("change", handleTablet)

        return () => {
            mobileQuery.removeEventListener("change", handleMobile)
            tabletQuery.removeEventListener("change", handleTablet)
        }
    }, [])

    return { isMobile, isTablet }
}
