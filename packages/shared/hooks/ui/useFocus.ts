import { useState, useCallback } from "react"

interface FocusProps {
    onFocus: () => void
    onBlur: () => void
}

interface UseFocusReturn {
    isFocused: boolean
    focusProps: FocusProps
}

/**
 * A hook that provides focus state and event handlers.
 * Returns the focus state and props to spread onto an element.
 * 
 * @example
 * const { isFocused, focusProps } = useFocus()
 * 
 * <input {...focusProps} style={{ borderColor: isFocused ? FOCUS_COLOR : DEFAULT_COLOR }} />
 */
export const useFocus = (): UseFocusReturn => {
    const [isFocused, setIsFocused] = useState(false)

    const focusProps: FocusProps = {
        onFocus: useCallback(() => setIsFocused(true), []),
        onBlur: useCallback(() => setIsFocused(false), []),
    }

    return {
        isFocused,
        focusProps,
    }
}
