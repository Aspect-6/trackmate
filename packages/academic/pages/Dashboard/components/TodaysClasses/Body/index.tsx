import React from "react"
import type { TodaysClasses } from "@/pages/Dashboard/types"

const TodaysClassesBody: React.FC<TodaysClasses.Body.Props> = ({ isMobile, isCollapsed, children }) => {
    return (
        <div
            className="flex-1"
            style={{
                display: isMobile ? "grid" : undefined,
                gridTemplateRows: isCollapsed ? "0fr" : "1fr",
                transition: "grid-template-rows 0.25s ease-out",
            }}
        >
            <div className="overflow-hidden h-full">
                <div
                    className="space-y-2 pr-2 custom-scrollbar h-full"
                    style={{
                        overflowY: "auto",
                        maxHeight: isMobile ? "14.7rem" : "275px",
                        overscrollBehavior: "contain",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TodaysClassesBody

export { default as ClassList } from "./ClassList"
export { default as NoClassesScheduled } from "./NoClassesScheduled"
export { default as NoSchool } from "./NoSchool"