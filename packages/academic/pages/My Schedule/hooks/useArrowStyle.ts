import { useState, useEffect, useCallback } from "react"
import { GLOBAL } from "@/app/styles/colors"


/**
 * Hook that provides a styled dropdown arrow that matches the active theme color.
 * Updates automatically when the theme changes.
*/
export const useArrowStyle = () => {
    const getArrowSvg = useCallback((color: string) => {
        const encodedColor = encodeURIComponent(color)
        return `url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22${encodedColor}%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22%3E%3C/path%3E%3C/svg%3E")`
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
