import React, { useMemo } from "react"
import { useAssignments, useEvents, useClasses } from "@/app/hooks/entities"
import { CALENDAR } from "@/app/styles/colors"
import SearchResultItem from "./SearchResultItem"
import NoResults from "./NoResults"

interface CalendarSearchResultsProps {
    searchQuery: string
    onSelectDate: (date: Date) => void
    month: number
    year: number
}

const CalendarSearchResults: React.FC<CalendarSearchResultsProps> = ({ searchQuery, onSelectDate, month, year }) => {
    const { assignments } = useAssignments()
    const { events } = useEvents()
    const { getClassById } = useClasses()

    const results = useMemo(() => {
        const query = searchQuery.toLowerCase().trim()
        if (!query) return []

        const isAssignmentSearch = query === "assignment" || query === "assignments"
        const isEventSearch = query === "event" || query === "events"

        // Helper to check if a date string falls within the current month/year
        const isInCurrentMonth = (dateString: string) => {
            const date = new Date(dateString + "T12:00:00")
            return date.getMonth() === month && date.getFullYear() === year
        }

        const filteredAssignments = assignments.filter(assignment => {
            if (!isInCurrentMonth(assignment.dueDate)) return false
            if (isAssignmentSearch) return true
            if (isEventSearch) return false

            const className = getClassById(assignment.classId)?.name || ""
            return (
                assignment.title.toLowerCase().includes(query) ||
                assignment.type.toLowerCase().includes(query) ||
                className.toLowerCase().includes(query) ||
                (assignment.description?.toLowerCase().includes(query) ?? false)
            )
        })

        const filteredEvents = events.filter(event => {
            if (!isInCurrentMonth(event.date)) return false
            if (isEventSearch) return true
            if (isAssignmentSearch) return false

            return (
                event.title.toLowerCase().includes(query) ||
                (event.description?.toLowerCase().includes(query) ?? false)
            )
        })

        const combined = [
            ...filteredAssignments.map(a => ({
                type: "assignment" as const,
                id: a.id,
                title: a.title,
                date: a.dueDate,
                subtext: getClassById(a.classId)?.name || a.type,
                color: getClassById(a.classId)?.color
            })),
            ...filteredEvents.map(e => ({
                type: "event" as const,
                id: e.id,
                title: e.title,
                date: e.date,
                subtext: "Event",
                color: CALENDAR.GLOBAL_ACCENT
            }))
        ]

        return combined.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }, [searchQuery, assignments, events, getClassById, month, year])

    if (results.length === 0) {
        return <NoResults />
    }

    return (
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)]">
            {results.map((item) => (
                <SearchResultItem
                    key={`${item.type}-${item.id}`}
                    item={item}
                    onClick={onSelectDate}
                />
            ))}
        </div>
    )
}

export default CalendarSearchResults
