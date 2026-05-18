import React, { createContext, useCallback, useContext } from "react"
import { useAcademicTerms } from "@/app/hooks/entities"
import type { ScheduleType } from "@/app/types"

// Schedule-type-specific renderers and class-form tab components
// Note: Importing from pages/ here because ScheduleRenderer is very closely
// related to the My Schedule page. It's an acceptable exception to the
// app/pages rule.
import AlternatingABRenderer from "@/pages/My Schedule/components/scheduleRenderers/AlternatingAB"
import SemesterRenderer from "@/pages/My Schedule/components/scheduleRenderers/Semester"
import FixedWeeklyRenderer from "@/pages/My Schedule/components/scheduleRenderers/FixedWeekly"
import AlternatingABClassFormSettingsTab from "@/app/components/scheduleComponents/AlternatingABClassFormSettingsTab"
import SemesterClassFormSettingsTab from "@/app/components/scheduleComponents/SemesterClassFormSettingsTab"
import FixedWeeklyClassFormSettingsTab from "@/app/components/scheduleComponents/FixedWeeklyClassFormSettingsTab"

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
export interface ClassFormSettingsTabProps {
    formData: Record<string, string>
    setFormData: (data: Record<string, string>) => void
    focusColor: string
}

export interface ScheduleComponents {
    ScheduleRenderer: React.FC<ScheduleRendererProps>
    ClassFormScheduleTab: React.FC<ClassFormSettingsTabProps>
}

const COMPONENTS_BY_TYPE: Record<ScheduleType, ScheduleComponents> = {
    "alternating-ab": {
        ScheduleRenderer: AlternatingABRenderer,
        ClassFormScheduleTab: AlternatingABClassFormSettingsTab,
    },
    "semester": {
        ScheduleRenderer: SemesterRenderer,
        ClassFormScheduleTab: SemesterClassFormSettingsTab,
    },
    "fixed-weekly": {
        ScheduleRenderer: FixedWeeklyRenderer,
        ClassFormScheduleTab: FixedWeeklyClassFormSettingsTab,
    }
}

interface ScheduleComponentsContextValue {
    /** Returns the renderer/tab bundle for a specific schedule format. */
    getComponentsForType: (type: ScheduleType) => ScheduleComponents
}

const ScheduleComponentsContext = createContext<ScheduleComponentsContextValue | null>(null)

export const ScheduleComponentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getComponentsForType = useCallback(
        (type: ScheduleType): ScheduleComponents => COMPONENTS_BY_TYPE[type],
        []
    )

    return (
        <ScheduleComponentsContext.Provider value={{ getComponentsForType }}>
            {children}
        </ScheduleComponentsContext.Provider>
    )
}

const useScheduleComponentsContext = (): ScheduleComponentsContextValue => {
    const ctx = useContext(ScheduleComponentsContext)
    if (!ctx) {
        throw new Error("useScheduleComponents* must be used inside <ScheduleComponentsProvider>")
    }
    return ctx
}

/**
 * Returns the renderer/tab bundle for an explicit schedule type. Use this when
 * the caller already knows which format it wants.
 */
export const useScheduleComponentsForType = (type: ScheduleType): ScheduleComponents => {
    const { getComponentsForType } = useScheduleComponentsContext()
    return getComponentsForType(type)
}

/**
 * Returns the renderer/tab bundle for a specific term, looked up by id. Falls
 * back to the "alternating-ab" bundle when the term can't be found (e.g. no
 * term selected yet in the form).
 */
export const useScheduleComponentsForTerm = (termId: string | null | undefined): ScheduleComponents => {
    const { getComponentsForType } = useScheduleComponentsContext()
    const { academicTerms } = useAcademicTerms()
    const term = termId ? academicTerms.find(t => t.id === termId) : undefined
    const type: ScheduleType = term?.scheduleType ?? "alternating-ab"
    return getComponentsForType(type)
}
