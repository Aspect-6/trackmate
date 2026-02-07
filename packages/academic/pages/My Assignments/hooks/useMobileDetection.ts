import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = "(max-width: 1023px)"

export const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)
        setIsMobile(mediaQuery.matches)

        const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
        mediaQuery.addEventListener("change", handleChange)

        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    return { isMobile }
}
