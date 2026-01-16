import React, { useState, useCallback, useMemo } from 'react'

export interface ModalTabPanelsContainerProps {
    children: React.ReactNode
    className?: string
}

export const ModalTabPanelsContainer: React.FC<ModalTabPanelsContainerProps> = ({
    children,
    className = '',
}) => {
    const [panelHeights, setPanelHeights] = useState<Record<number, number>>({})

    const handleHeightChange = useCallback((index: number, height: number) => {
        setPanelHeights(prev => {
            if (prev[index] === height) return prev
            return { ...prev, [index]: height }
        })
    }, [])

    const minHeight = useMemo(() => {
        const heights = Object.values(panelHeights)
        return heights.length > 0 ? Math.max(...heights) : undefined
    }, [panelHeights])

    // Clone children and inject the onHeightChange callback
    const enhancedChildren = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ onHeightChange?: (height: number) => void }>, {
                onHeightChange: (height: number) => handleHeightChange(index, height),
            })
        }
        return child
    })

    return (
        <div
            className={className}
            style={{
                position: 'relative',
                minHeight: minHeight ? `${minHeight}px` : undefined,
            }}
        >
            {enhancedChildren}
        </div>
    )
}
