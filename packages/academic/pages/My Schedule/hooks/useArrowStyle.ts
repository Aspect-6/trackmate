import { useState, useEffect, useCallback } from "react"
import { GLOBAL } from "@/app/styles/colors"


/**
 * Hook that provides a styled dropdown arrow that matches the active theme color.
 * Updates automatically when the theme changes.
*/
export const useArrowStyle = () => {
    const getArrowSvg = useCallback((color: string) => {
        const encodedColor = encodeURIComponent(color)
        return `url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="${encodedColor}"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"%3E%3C/path%3E%3C/svg%3E")`
    }, [])

    const [arrowColor, setArrowColor] = useState("")

    useEffect(() => {
        const updateColor = () => {
            const color = getComputedStyle(document.documentElement)
                .getPropertyValue(GLOBAL.GLOBAL_ACCENT.slice(4, -1))
                .trim()
            if (color) setArrowColor(color)
        }
        updateColor()

        const observer = new MutationObserver(updateColor)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
        return () => observer.disconnect()
    }, [])

    return { backgroundImage: getArrowSvg(arrowColor) }
}
