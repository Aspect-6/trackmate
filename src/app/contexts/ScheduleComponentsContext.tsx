import React, { createContext, useContext, useMemo } from 'react'
import { useApp } from './AppContext'
import type { ScheduleType, Class, NoSchoolPeriod } from '@/app/types'

// Import schedule-type-specific components
import AlternatingABRenderer from '@/pages/My Schedule/components/scheduleRenderers/AlternatingAB'
import AlternatingABClassList from '@/app/components/ClassListRenderers/AlternatingABClassList'

/**
 * Props for schedule editor renderer
 */
export interface ScheduleRendererProps {
    selectedTermId: string | null
}

/**
 * Props for class list renderer
 */
export interface ClassListRendererProps {
    date: string
    noSchoolDay?: NoSchoolPeriod
    getClassById: (id: string) => Class
    openModal?: (name: string, data: any) => void
    variant: 'dashboard' | 'calendar'
}

/**
 * Schedule components for a given schedule type
 */
interface ScheduleComponents {
    ScheduleRenderer: React.FC<ScheduleRendererProps> | null
    ClassListRenderer: React.FC<ClassListRendererProps> | null
}

/**
 * All components by schedule type
 */
const COMPONENTS_BY_TYPE: Record<ScheduleType, ScheduleComponents> = {
    'alternating-ab': {
        ScheduleRenderer: AlternatingABRenderer,
        ClassListRenderer: AlternatingABClassList,
    },
    'none': {
        ScheduleRenderer: null,
        ClassListRenderer: null,
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
