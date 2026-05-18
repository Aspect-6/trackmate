import React, { useState, useCallback } from "react"

interface HoverProps {
    onPointerEnter: (e: React.PointerEvent) => void
    onPointerLeave: (e: React.PointerEvent) => void
}

interface UseHoverReturn {
    isHovered: boolean
    hoverProps: HoverProps
    resetHover: () => void
}

const canHover = window.matchMedia("(hover: hover)").matches

/**
 * A hook that provides hover state and event handlers.
 * Uses pointer events to ignore touch-triggered hover (synthetic mouseenter).
 * Returns the hover state and props to spread onto an element.
 * 
 * @example
 * const { isHovered, hoverProps } = useHover()
 * 
 * <div {...hoverProps} style={{ backgroundColor: isHovered ? BG_HOVER : BG_DEFAULT }}>
 */
export const useHover = (): UseHoverReturn => {
    const [isHovered, setIsHovered] = useState(false)

    const hoverProps: HoverProps = {
        onPointerEnter: useCallback((e: React.PointerEvent) => {
            if (canHover && e.pointerType !== "touch") setIsHovered(true)
        }, []),
        onPointerLeave: useCallback((e: React.PointerEvent) => {
            if (canHover && e.pointerType !== "touch") setIsHovered(false)
        }, []),
    }

    const resetHover = useCallback(() => setIsHovered(false), [])

    return {
        isHovered,
        hoverProps,
        resetHover
    }
}
