import React from "react"
import type { AssignmentColumn } from "@/pages/My Assignments/types"
import type { Status } from "@/app/types"
import { ChevronDown } from "lucide-react"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const HEADER_COLORS: Record<Status, string> = {
    "To Do": MY_ASSIGNMENTS.BOARD_HEADER_TEXT_UPCOMING,
    "In Progress": MY_ASSIGNMENTS.BOARD_HEADER_TEXT_INPROGRESS,
    "Done": MY_ASSIGNMENTS.BOARD_HEADER_TEXT_DONE,
}

const AssignmentColumnHeader: React.FC<AssignmentColumn.HeaderProps> = ({
    status,
    title,
    totalCount,
    isMobile,
    isCollapsed,
    onToggle,
}) => {
    const headerColor = HEADER_COLORS[status]

    const handleClick = () => { if (isMobile) onToggle() }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isMobile && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            onToggle()
        }
    }

    return (
        <div
            className={`flex justify-between items-center mb-4 px-2 py-2 ${isMobile ? "cursor-pointer" : ""}`}
            style={{
                borderBottom: `1px solid ${isCollapsed ? "transparent" : MY_ASSIGNMENTS.HEADER_DIVIDER}`,
                transition: "border-color 0.25s ease-out",
            }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...(isMobile ? { role: "button", tabIndex: 0 } : {})}
        >
            <div className="flex items-center gap-2">
                {isMobile && (
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}
                        style={{ color: headerColor }}
                        aria-hidden="true"
                    />
                )}
                <h2 className="text-lg font-bold" style={{ color: headerColor }}>
                    {title}
                </h2>
            </div>
            <span
                className="inline-flex justify-center items-center text-xs font-bold px-2 h-6 min-w-6 rounded-full flex-shrink-0 ml-auto"
                style={{
                    backgroundColor: MY_ASSIGNMENTS.BACKGROUND_TERTIARY,
                    color: headerColor,
                    border: `1px solid ${headerColor}`,
                }}
            >
                {totalCount}
            </span>
        </div>
    )
}

export default AssignmentColumnHeader
