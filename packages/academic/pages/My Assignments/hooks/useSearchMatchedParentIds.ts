import { useMemo } from "react"
import { useClasses } from "@/app/hooks/entities/useClasses"
import { useVisibleAssignments } from "@/app/hooks/entities/useVisibleAssignments"

export const useSearchMatchedParentIds = (
    searchQuery: string,
    typeFilter: string[],
    priorityFilter: string[]
): ReadonlySet<string> | undefined => {
    const { assignments } = useVisibleAssignments()
    const { getClassById } = useClasses()

    return useMemo(() => {
        const query = searchQuery.toLowerCase().trim()
        if (!query && typeFilter.length === 0 && priorityFilter.length === 0) {
            return undefined
        }

        const ids = new Set<string>()
        for (const item of assignments) {
            if (item.kind !== "parent") continue

            const classNameLower = getClassById(item.classId).name.toLowerCase()
            const matchesSearch = !query ||
                item.title.toLowerCase().includes(query) ||
                classNameLower.includes(query) ||
                (item.description?.toLowerCase().includes(query) ?? false)
            const matchesType = typeFilter.length === 0 || typeFilter.includes(item.type || "")
            const matchesPriority = priorityFilter.length === 0 ||
                (item.priority ? priorityFilter.includes(item.priority) : false)

            if (matchesSearch && matchesType && matchesPriority) {
                ids.add(item.id)
            }
        }
        return ids
    }, [assignments, getClassById, searchQuery, typeFilter, priorityFilter])
}
