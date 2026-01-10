import React, { createContext, useContext, useMemo } from 'react'
import { useApp } from './AppContext'
import type { ScheduleType } from '@/app/types'

// Import schedule-type-specific components
// Note: Importing from pages/ here because ScheduleRenderer is very closely 
// related to the My Schedule page. Its an Acceptable exception to app/pages rule.
import AlternatingABRenderer from '@/pages/My Schedule/components/scheduleRenderers/AlternatingAB'

// Import schedule-type-specific hooks
import { useAlternatingABClasses } from '@/app/hooks/useAlternatingABClasses'

/**
 * Props for schedule editor renderer
 */
export interface ScheduleRendererProps {
    selectedTermId: string | null
}

/**
 * Return type for class IDs hook
 */
export interface ClassIdsForDateResult {
    classIds: (string | null)[]
    hasClasses: boolean
}

/**
 * Schedule components and hooks for a given schedule type
 */
interface ScheduleComponents {
    ScheduleRenderer: React.FC<ScheduleRendererProps> | null
    useClassIdsForDate: (date: string) => ClassIdsForDateResult
}

/**
 * Null implementation for useClassIdsForDate when no schedule is configured
 */
const useNullClassIds = (): ClassIdsForDateResult => ({
    classIds: [],
    hasClasses: false
})

/**
 * Wrapper hook for alternating A/B schedule class IDs
 */
const useAlternatingABClassIds = (date: string): ClassIdsForDateResult => {
    const { classIds } = useAlternatingABClasses(date)
    const hasClasses = classIds.length > 0 && classIds.some(id => id !== null)
    return { classIds, hasClasses }
}

/**
 * All components/hooks by schedule type
 */
const COMPONENTS_BY_TYPE: Record<ScheduleType, ScheduleComponents> = {
    'alternating-ab': {
        ScheduleRenderer: AlternatingABRenderer,
        useClassIdsForDate: useAlternatingABClassIds,
    },
    'none': {
        ScheduleRenderer: null,
        useClassIdsForDate: useNullClassIds,
    }
}

const ScheduleComponentsContext = createContext<ScheduleComponents>(COMPONENTS_BY_TYPE['none'])

/**
 * Provider that exposes schedule-type-specific components based on current schedule type.
 */
export const ScheduleComponentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { schedules } = useApp()

    const components = useMemo(() => {
        return COMPONENTS_BY_TYPE[schedules.type] || COMPONENTS_BY_TYPE['none']
    }, [schedules.type])

    return (
        <ScheduleComponentsContext.Provider value={components}>
            {children}
        </ScheduleComponentsContext.Provider>
    )
}

/**
 * Hook to access schedule-type-specific components.
 */
export const useScheduleComponents = () => useContext(ScheduleComponentsContext)
