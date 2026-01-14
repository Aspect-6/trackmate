import React, { createContext, useContext, useMemo } from 'react'
import { useSchedules } from '@/app/hooks/entities'
import type { ScheduleType } from '@/app/types'

// Import schedule-type-specific components
// Note: Importing from pages/ here because ScheduleRenderer is very closely 
// related to the My Schedule page. Its an acceptable exception to app/pages rule.
import AlternatingABRenderer from '@/pages/My Schedule/components/scheduleRenderers/AlternatingAB'

// Import schedule-type-specific hooks
import { useAlternatingABClassIds } from '@/app/hooks/useAlternatingABClassIds'

export interface ScheduleRendererProps {
    selectedTermId: string | null
}

export interface ClassIdsForDateResult {
    classIds: (string | null)[]
    hasClasses: boolean
}

interface ScheduleComponents {
    ScheduleRenderer: React.FC<ScheduleRendererProps> | null
    useClassIdsForDate: (date: string) => ClassIdsForDateResult
}

const useNullClassIds = (): ClassIdsForDateResult => ({
    classIds: [],
    hasClasses: false
})

const COMPONENTS_BY_TYPE: Record<ScheduleType, ScheduleComponents> = {
    'alternating-ab': {
        ScheduleRenderer: AlternatingABRenderer,
        useClassIdsForDate: (date: string): ClassIdsForDateResult => {
            const { classIds } = useAlternatingABClassIds(date)
            const hasClasses = classIds.length > 0 && classIds.some(id => id !== null)
            return { classIds, hasClasses }
        },
    },
    'none': {
        ScheduleRenderer: null,
        useClassIdsForDate: useNullClassIds,
    }
}

const ScheduleComponentsContext = createContext<ScheduleComponents>(COMPONENTS_BY_TYPE['none'])

export const ScheduleComponentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { schedules } = useSchedules()

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
