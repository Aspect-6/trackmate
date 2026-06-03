import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useAuth } from "@shared/contexts/AuthContext"
import { useToast } from "@shared/contexts/ToastContext"
import Header from "./Content/Header"
import Body from "./Content/Body"
import Footer from "./Content/Footer"
import UpgradeBenefit from "./Content/UpgradeBenefit"
import { ACCOUNT } from "@/app/styles/colors"

const PlansSection: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { user, isPremium } = useAuth()
    const { showToast } = useToast()

    useEffect(() => {
        const checkout = searchParams.get("checkout")
        if (checkout === "success") {
            user?.getIdToken(true)
            showToast("Upgrade to Academic Premium successful!", "success")
            setSearchParams(params => {
                params.delete("checkout")
                return params
            }, { replace: true })
        } else if (checkout === "cancelled") {
            showToast("Checkout was cancelled", "error")
            setSearchParams(params => {
                params.delete("checkout")
                return params
            }, { replace: true })
        }

        const billing = searchParams.get("billing")
        if (billing === "returned") {
            user?.getIdToken(true)
            setSearchParams(params => {
                params.delete("billing")
                return params
            }, { replace: true })
        }
    }, [searchParams, setSearchParams, showToast, user])

    return (
        <>
            <div className="mb-8 pb-4 shrink-0" style={{ borderBottom: `1px solid ${ACCOUNT.BORDER_PRIMARY}` }}>
                <h2 className="text-2xl font-bold mb-1" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                    Your Plans
                </h2>
                <p style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    Manage your TrackMate subscriptions
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl border p-6 flex flex-col h-full" style={{ borderColor: ACCOUNT.BORDER_PRIMARY, backgroundColor: ACCOUNT.BACKGROUND_SECONDARY }}>
                    <Header
                        productName="TrackMate Academic"
                        productDescription="Your ultimate student planner"
                        isPremium={isPremium}
                        accentColor={ACCOUNT.ACADEMIC_ACCENT}
                    />

                    <div className="flex flex-col flex-grow">
                        <Body isPremium={isPremium}>
                            <UpgradeBenefit benefit="Access to Templates that allow you to create preset assignments and events with just a few clicks" />
                            <UpgradeBenefit benefit="The ability to add multiple subtasks to assignments to make it easier to track your progress" />
                            <UpgradeBenefit benefit="The ability to sync your Canvas calendar so you never have to manually create assignments again" />
                        </Body>
                        
                        <Footer
                            isPremium={isPremium}
                            accentColor={ACCOUNT.ACADEMIC_ACCENT}
                            accentColorHover={ACCOUNT.ACADEMIC_BUTTON_HOVER}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlansSection
