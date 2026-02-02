import React, { useEffect, useRef, useState } from "react"
import type { TodaysClasses } from "@/pages/Dashboard/types"

const TodaysClassesBody: React.FC<TodaysClasses.Body.Props> = ({ isMobile, isCollapsed, children }) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState<number>(0)

    useEffect(() => {
        if (!isMobile) return

        const computeHeight = () => {
            if (contentRef.current) {
                setContentHeight(contentRef.current.scrollHeight)
            }
        }

        computeHeight()

        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(() => computeHeight())
            if (contentRef.current) observer.observe(contentRef.current)
            return () => observer.disconnect()
        }

        window.addEventListener("resize", computeHeight)
        return () => window.removeEventListener("resize", computeHeight)
    }, [isMobile, children])

    return (
        <div
            className="overflow-y-scroll custom-scrollbar transition-max-height duration-300"
            style={{
                maxHeight: isMobile
                    ? (isCollapsed ? "0" : `min(${contentHeight + 5}px, 11rem)`)
                    : "17.5rem"
            }}
        >
            <div ref={contentRef} className="space-y-2 pr-2">
                {children}
            </div>
        </div>
    )
}

export default TodaysClassesBody

export { default as ClassList } from "./ClassList"
export { default as NoClassesScheduled } from "./NoClassesScheduled"
export { default as NoSchool } from "./NoSchool"