import React, { useRef } from "react"
import { Outlet } from "react-router-dom"
import { useSettings } from "@/app/hooks/useSettings"
import { useAcademicTerms } from "@/app/hooks/entities"
import Onboarding from "@/pages/Onboarding"
import { GLOBAL } from "@/app/styles/colors"

/**
 * Route guard that waits for settings to load.
 * If the user is new, it shows the full-screen onboarding walkthrough.
 * If the user is returning, it renders the rest of the app (<Layout />).
 */
const OnboardingGuard: React.FC = () => {
    const { settings, loading: settingsLoading } = useSettings()
    const { academicTerms, loading: termsLoading } = useAcademicTerms()
    const shouldShowOnboarding = useRef<boolean | null>(null)

    if (settingsLoading || termsLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: GLOBAL.WEBPAGE_BACKGROUND }}>
                <div 
                    className="animate-spin rounded-full h-8 w-8"
                    style={{ borderBottom: `2px solid ${GLOBAL.TEXT_SECONDARY}` }}
                />
            </div>
        )
    }

    if (shouldShowOnboarding.current === null) {
        shouldShowOnboarding.current = !settings.hasCompletedOnboarding && academicTerms.length === 0
    }

    if (settings.hasCompletedOnboarding && shouldShowOnboarding.current) {
        shouldShowOnboarding.current = false
    }

    if (shouldShowOnboarding.current && !settings.hasCompletedOnboarding) {
        return <Onboarding />
    }

    return <Outlet />
}

export default OnboardingGuard
