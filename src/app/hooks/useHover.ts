import { useState, useCallback } from 'react'

interface HoverProps {
    onMouseEnter: () => void
    onMouseLeave: () => void
}

/**
 * A hook that provides hover state and event handlers.
 * Returns the hover state and props to spread onto an element.
 * 
 * @example
 * const { isHovered, hoverProps } = useHover()
 * 
 * <div {...hoverProps} style={{ backgroundColor: isHovered ? BG_HOVER : BG_DEFAULT }}>
 */
export const useHover = (): { isHovered: boolean, hoverProps: HoverProps } => {
    const [isHovered, setIsHovered] = useState(false)

    const hoverProps: HoverProps = {
        onMouseEnter: useCallback(() => setIsHovered(true), []),
        onMouseLeave: useCallback(() => setIsHovered(false), []),
    }

    return {
        isHovered,
        hoverProps
    }
}
