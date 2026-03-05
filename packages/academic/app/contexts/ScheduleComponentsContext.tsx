import React, { createContext, useContext, useMemo } from "react"
import { useSchedules } from "@/app/hooks/entities"
import type { ScheduleType } from "@/app/types"

// Import schedule-type-specific components
// Note: Importing from pages/ here because ScheduleRenderer is very closely 
// related to the My Schedule page. Its an acceptable exception to app/pages rule.
import AlternatingABRenderer from "@/pages/My Schedule/components/scheduleRenderers/AlternatingAB"
import AlternatingABClassFormScheduleTab from "@/app/components/scheduleComponents/AlternatingABClassFormScheduleTab"

// Import schedule-type-specific hooks
import { useAlternatingABClassIds } from "@/app/hooks/schedules/useAlternatingABClassIds"

export interface ScheduleRendererProps {
    selectedTermId: string | null
}

export interface ClassIdsForDateResult {
    classIds: (string | null)[]
    hasClasses: boolean
}

/**
 * Props contract for schedule-specific class form tab components.
 * Each schedule format implements this to render its own Settings tab UI.
 */
export interface ClassFormScheduleTabProps {
    formData: Record<string, string>
    setFormData: (data: Record<string, string>) => void
    focusColor: string
}

interface ScheduleComponents {
    ScheduleRenderer: React.FC<ScheduleRendererProps> | null
    useClassIdsForDate: (date: string) => ClassIdsForDateResult
    ClassFormScheduleTab: React.FC<ClassFormScheduleTabProps> | null
}

const COMPONENTS_BY_TYPE: Record<ScheduleType, ScheduleComponents> = {
    "alternating-ab": {
        ScheduleRenderer: AlternatingABRenderer,
        useClassIdsForDate: (date: string): ClassIdsForDateResult => {
            const { classIds } = useAlternatingABClassIds(date)
            const hasClasses = classIds.length > 0 && classIds.some(id => id !== null)
            return { classIds, hasClasses }
        },
        ClassFormScheduleTab: AlternatingABClassFormScheduleTab,
    }
}

const ScheduleComponentsContext = createContext<ScheduleComponents>(null as unknown as ScheduleComponents)

export const ScheduleComponentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { schedules } = useSchedules()

    const components = useMemo(() => {
        return COMPONENTS_BY_TYPE[schedules.type]
    }, [schedules.type])

    return (
        <ScheduleComponentsContext.Provider value={components}>
            {children}
        </ScheduleComponentsContext.Provider>
    )
}

export const useScheduleComponents = () => useContext(ScheduleComponentsContext)
