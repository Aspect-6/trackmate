 import React from "react"
import type { PlansSection } from "@/pages/Account/types"
import { ACCOUNT } from "@/app/styles/colors"

const Body: React.FC<PlansSection.Content.BodyProps> = ({ isPremium, children }) => {
    return (
        <div className="mb-6 pt-6 flex-grow" style={{ borderTop: `1px solid ${ACCOUNT.BORDER_PRIMARY}` }}>
            <h4 className="font-semibold mb-4" style={{ color: ACCOUNT.TEXT_PRIMARY }}>
                {isPremium ? "Your Premium features:" : "Upgrade to Premium to unlock:"}
            </h4>
            <ul className="flex flex-col gap-3">
                {children}
            </ul>
        </div>
    )
}

export default Body
