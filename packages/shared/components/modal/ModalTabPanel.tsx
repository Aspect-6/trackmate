import React, { useRef, useEffect } from "react"

export interface ModalTabPanelProps {
    isActive: boolean
    children: React.ReactNode
    className?: string
    onHeightChange?: (height: number) => void
}

export const ModalTabPanel: React.FC<ModalTabPanelProps> = ({
    isActive,
    children,
    className = "",
    onHeightChange,
}) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current && onHeightChange) {
            // Measure the actual height of content
            onHeightChange(ref.current.scrollHeight)
        }
    }, [children, onHeightChange])

    // Use visibility + position instead of display:none so we can measure all panels
    const hiddenStyles: React.CSSProperties = isActive
        ? {}
        : {
            visibility: "hidden",
            position: "absolute",
            pointerEvents: "none",
            top: 0,
            left: 0,
            right: 0,
        }

    return (
        <div
            ref={ref}
            className={`space-y-4 ${className}`.trim()}
            style={hiddenStyles}
            aria-hidden={!isActive}
        >
            {children}
        </div>
    )
}
