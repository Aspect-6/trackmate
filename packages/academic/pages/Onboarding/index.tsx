import React, { useState } from "react"
import { useAuth } from "@shared/contexts/AuthContext"
import { useSettings } from "@/app/hooks/useSettings"
import { TermStep } from "./steps/TermStep"
import { ScheduleStep } from "./steps/ScheduleStep"
import { ClassStep } from "./steps/ClassStep"
import { ThemeStep } from "./steps/ThemeStep"
import { PremiumStep } from "./steps/PremiumStep"
import { TransitionStep } from "./steps/TransitionStep"
import { GLOBAL } from "@/app/styles/colors"

export type OnboardingStep = "term" | "schedule" | "class" | "theme" | "premium" | "transition"

const Onboarding: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>("term")
    const [isUpgrading, setIsUpgrading] = useState(false)
    const [isExiting, setIsExiting] = useState(false)
    const { completeOnboarding } = useSettings()
    const { isPremium } = useAuth()

    const handleComplete = () => {
        setIsExiting(true)
        setTimeout(() => {
            completeOnboarding()
        }, 500)
    }

    const handleNext = (upgrading?: boolean) => {
        switch (currentStep) {
            case "term":
                setCurrentStep("schedule")
                break
            case "schedule":
                setCurrentStep("class")
                break
            case "class":
                setCurrentStep("theme")
                break
            case "theme":
                if (isPremium) {
                    setCurrentStep("transition")
                } else {
                    setCurrentStep("premium")
                }
                break
            case "premium":
                if (typeof upgrading === "boolean") setIsUpgrading(upgrading)
                setCurrentStep("transition")
                break
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case "term":
                return <TermStep key="term" onNext={handleNext} />
            case "schedule":
                return <ScheduleStep key="schedule" onNext={handleNext} />
            case "class":
                return <ClassStep key="class" onNext={handleNext} />
            case "theme":
                return <ThemeStep key="theme" onNext={handleNext} />
            case "premium":
                return <PremiumStep key="premium" onNext={handleNext} />
            case "transition":
                return <TransitionStep key="transition" isUpgrading={isUpgrading} onComplete={handleComplete} />
            default:
                return null
        }
    }

    return (
        <div 
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen overflow-y-auto transition-all duration-500 [&_*]:transition-colors [&_*]:duration-500 ${isExiting ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"}`}
            style={{ backgroundColor: GLOBAL.WEBPAGE_BACKGROUND }}
        >
            <div className="w-full max-w-2xl px-4 py-8 mx-auto">
                {renderStep()}
            </div>
        </div>
    )
}

export default Onboarding
