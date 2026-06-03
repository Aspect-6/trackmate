import React, { useState } from "react"
import { useToast } from "@shared/contexts/ToastContext"
import { useHover } from "@shared/hooks/ui/useHover"
import { getFunctions, httpsCallable } from "firebase/functions"
import { app } from "@shared/lib/firebase"
import type { PlansSection } from "@/pages/Account/types"
import { ACCOUNT } from "@/app/styles/colors"

const functions = getFunctions(app)
const createCheckoutSessionFn = httpsCallable<{ product: string }, { url: string }>(functions, "createCheckoutSession")
const createBillingPortalSessionFn = httpsCallable<Record<string, never>, { url: string }>(functions, "createBillingPortalSession")

const Footer: React.FC<PlansSection.Content.FooterProps> = ({ isPremium, accentColor, accentColorHover }) => {
    const { showToast } = useToast()
    const { isHovered, hoverProps } = useHover()
    const [loading, setLoading] = useState(false)

    const handleUpgrade = async () => {
        setLoading(true)
        try {
            const { data } = await createCheckoutSessionFn({ product: "academic" })
            window.location.href = data.url
        } catch (error) {
            showToast("Failed to create checkout session", "error")
            setLoading(false)
        }
    }
    const handleManageBilling = async () => {
        setLoading(true)
        try {
            const { data } = await createBillingPortalSessionFn({})
            window.location.href = data.url
        } catch (error) {
            showToast("Failed to open billing portal", "error")
            setLoading(false)
        }
    }

    return (
        <div className="pt-6 mt-auto" style={{ borderTop: `1px solid ${ACCOUNT.BORDER_PRIMARY}` }}>
            {!isPremium ? (
                <button
                    {...hoverProps}
                    onClick={handleUpgrade}
                    disabled={loading}
                    className={`w-full px-6 py-2.5 rounded-lg font-medium transition-all ${loading ? "opacity-80 cursor-wait" : ""}`}
                    style={{
                        backgroundColor: isHovered ? accentColorHover : accentColor,
                        color: ACCOUNT.TEXT_WHITE,
                    }}
                >
                    {loading ? "Redirecting..." : "Upgrade to Premium"}
                </button>
            ) : (
                <p style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    You currently have access to all Premium features in TrackMate Academic.{" "}
                    <a
                        className={`${loading ? "opacity-70 cursor-wait" : "hover:underline cursor-pointer"} font-medium transition-opacity`}
                        style={{ color: accentColor }}
                        onClick={loading ? undefined : handleManageBilling}
                    >
                        {loading ? "Redirecting..." : "Manage billing"}
                    </a>
                    .
                </p>
            )}
        </div>
    )
}

export default Footer
