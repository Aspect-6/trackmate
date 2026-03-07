import React, { useState } from "react"
import { useSettings } from "@/app/hooks/useSettings"
import type { Priority } from "@/app/types"
import type { ActionBar } from "@/pages/My Assignments/types"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import FilterChip from "./FilterChip"
import { MY_ASSIGNMENTS } from "@/app/styles/colors"

const ActionBar: React.FC<ActionBar.Props> = ({
    searchQuery,
    onSearchChange,
    typeFilter,
    onTypeFilterChange,
    priorityFilter,
    onPriorityFilterChange
}) => {
    const { assignmentTypes } = useSettings()
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleFilter = (item: string, currentFilters: string[], setFilters: (v: string[]) => void) => {
        if (currentFilters.includes(item)) {
            setFilters(currentFilters.filter(i => i !== item))
        } else {
            setFilters([...currentFilters, item])
        }
    }

    const priorities: Priority[] = ["High", "Medium", "Low"]

    const getPriorityColor = (priority: Priority) => ({
        High: MY_ASSIGNMENTS.PRIORITY_HIGH_BORDER,
        Medium: MY_ASSIGNMENTS.PRIORITY_MEDIUM_BORDER,
        Low: MY_ASSIGNMENTS.PRIORITY_LOW_BORDER
    }[priority])

    const typeChips = assignmentTypes.map(type => (
        <FilterChip
            key={type}
            label={type}
            isActive={typeFilter.includes(type)}
            onClick={() => toggleFilter(type, typeFilter, onTypeFilterChange)}
        />
    ))

    const priorityChips = priorities.map(priority => (
        <FilterChip
            key={priority}
            label={priority}
            isActive={priorityFilter.includes(priority)}
            onClick={() => toggleFilter(priority, priorityFilter, onPriorityFilterChange)}
            color={getPriorityColor(priority)}
        />
    ))

    const AllChip = () => (
        <FilterChip
            label="All"
            isActive={typeFilter.length === 0 && priorityFilter.length === 0}
            onClick={() => {
                onTypeFilterChange([])
                onPriorityFilterChange([])
            }}
        />
    )

    const searchInput = (className: string) => (
        <div className={`relative ${className}`.trim()}>
            <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
            />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search assignments"
                className="pl-9 pr-3 py-1.5 text-sm rounded-xl w-full outline-none transition-all duration-200 bg-transparent focus:bg-white/5"
                style={{ color: MY_ASSIGNMENTS.TEXT_PRIMARY }}
            />
        </div>
    )

    return (
        <div className="mb-4 flex flex-col p-2 rounded-xl transition-all duration-300"
            style={{
                backgroundColor: MY_ASSIGNMENTS.BACKGROUND_PRIMARY,
                border: `1px solid ${MY_ASSIGNMENTS.BORDER_PRIMARY}`
            }}>
            <div className="flex items-center gap-2 md:hidden py-1"
                style={{
                    borderBottom: `1px solid ${isExpanded ? "rgba(255,255,255,0.05)" : "transparent"}`,
                    transition: "border-color 0.25s ease-out",
                }}
            >
                <div className="flex-1 min-w-0">
                    {searchInput("")}
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-xl transition-colors hover:bg-white/5 flex-shrink-0"
                    style={{ color: MY_ASSIGNMENTS.TEXT_SECONDARY }}
                >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            <div className="hidden md:flex items-center gap-2">

                <div className="flex flex-1 min-w-0 items-center gap-2 overflow-x-scroll no-scrollbar mask-linear-fade py-1">
                    {typeChips}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 mr-1">
                    <div className="w-px h-4 bg-white/10 flex-shrink-0 mx-1" />
                    {priorityChips}
                    <AllChip />
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-px h-6 bg-white/10 flex-shrink-0" />
                    {searchInput("w-64")}
                </div>
            </div>

            <div
                className="md:hidden grid"
                style={{
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.25s ease-out",
                }}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-3 py-2">
                        <div className="flex items-center gap-2 py-1 overflow-x-auto no-scrollbar mask-linear-fade">
                            {typeChips}
                        </div>

                        <div className="flex items-center gap-2 pb-1 flex-wrap">
                            {priorityChips}
                            <AllChip />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionBar
