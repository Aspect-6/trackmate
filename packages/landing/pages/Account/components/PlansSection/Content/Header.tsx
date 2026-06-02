import React from "react"
import type { PlansSection } from "@/pages/Account/types"
import { ACCOUNT } from "@/app/styles/colors"

const Header: React.FC<PlansSection.Content.HeaderProps> = ({ 
    productName, 
    productDescription, 
    isPremium, 
    accentColor 
}) => {
    return (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
            <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: accentColor }}>
                    {productName}
                </h3>
                <p style={{ color: ACCOUNT.TEXT_SECONDARY }}>
                    {productDescription}
                </p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium w-fit" 
                style={{ 
                    borderColor: isPremium ? accentColor : ACCOUNT.BORDER_PRIMARY,
                    backgroundColor: ACCOUNT.BACKGROUND_TERTIARY,
                    color: isPremium ? accentColor : ACCOUNT.TEXT_SECONDARY
                }}
            >
                {isPremium ? "Premium Plan" : "Free Plan"}
            </div>
        </div>
    )
}

export default Header
