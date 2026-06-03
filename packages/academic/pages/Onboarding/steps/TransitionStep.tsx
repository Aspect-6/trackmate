import React, { useEffect, useRef } from "react"
import { GLOBAL } from "@/app/styles/colors"
import { ROUTES } from "@/app/config/paths"
import { useRedirect } from "@shared/hooks/useRedirect"

interface TransitionStepProps {
    isUpgrading: boolean
    onComplete: () => void
}

export const TransitionStep: React.FC<TransitionStepProps> = ({ isUpgrading, onComplete }) => {
    const redirect = useRedirect({ allowCrossApp: true })
    const hasRedirected = useRef(false)

    useEffect(() => {
        if (!isUpgrading && !hasRedirected.current) {
            hasRedirected.current = true
            redirect(ROUTES["dashboard"].fullPath, { replace: true })
        }

        const timer = setTimeout(() => {
            onComplete()
            if (isUpgrading) {
                redirect("/account?tab=plans")
            }
        }, 2000)

        return () => clearTimeout(timer)
    }, [isUpgrading, onComplete, redirect])

    return (
        <div className="flex flex-col items-center justify-center animate-slide-up-fade py-12">
            <div 
                className="w-16 h-16 border-4 rounded-full animate-spin mb-8" 
                style={{ 
                    borderColor: GLOBAL.BORDER_PRIMARY, 
                    borderTopColor: GLOBAL.GLOBAL_ACCENT 
                }}
            ></div>
            <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: GLOBAL.GLOBAL_ACCENT }}>
                {isUpgrading ? "Taking you to upgrade..." : "Preparing your settings..."}
            </h1>
            <p className="text-lg text-center" style={{ color: GLOBAL.TEXT_SECONDARY }}>
                Just a moment while we get everything ready for you.
            </p>
        </div>
    )
}
