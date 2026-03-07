import React, { useEffect, useRef, useState } from "react"
import type { TodaysEvents } from "@/pages/Dashboard/types"

const TodaysEventsBody: React.FC<TodaysEvents.Body.Props> = ({ isMobile, isCollapsed, children }) => {
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
            style={{
                overflow: "hidden",
                maxHeight: isMobile
                    ? (isCollapsed ? "0px" : `min(${contentHeight + 5}px, 14.7rem)`)
                    : "330px",
                transition: isMobile ? "max-height 0.25s ease-out" : undefined,
                willChange: isMobile ? "max-height" : undefined,
            }}
        >
            <div
                ref={contentRef}
                className="space-y-2 pr-2 custom-scrollbar"
                style={{
                    overflowY: "auto",
                    maxHeight: isMobile ? undefined : "220px",
                    overscrollBehavior: "contain",
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default TodaysEventsBody

export { default as EventList } from "./EventList"
export { default as NoEventsScheduled } from "./NoEventsScheduled"
