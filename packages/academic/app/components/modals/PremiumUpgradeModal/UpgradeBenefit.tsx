import React from "react"
import { Check } from "lucide-react"
import { GLOBAL } from "@/app/styles/colors"

interface UpgradeBenefitProps {
    benefit: string
}

export const UpgradeBenefit: React.FC<UpgradeBenefitProps> = ({ benefit }) => {
    return (
        <li className="flex items-start gap-3">
            <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GLOBAL.GLOBAL_ACCENT }} />
            <span className="leading-snug text-sm opacity-90">
                {benefit}
            </span>
        </li>
    )
}
