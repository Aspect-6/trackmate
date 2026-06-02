import React from "react"
import type { PlansSection } from "@/pages/Account/types"
import { Check } from "lucide-react"
import { ACCOUNT } from "@/app/styles/colors"

const UpgradeBenefit: React.FC<PlansSection.Content.UpgradeBenefitProps> = ({ benefit }) => {
    return (
        <li className="flex items-start gap-2 text-sm md:text-base">
            <Check className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCOUNT.TEXT_SUCCESS }} />
            <span style={{ color: ACCOUNT.TEXT_SECONDARY }}>{benefit}</span>
        </li>
    )
}

export default UpgradeBenefit
