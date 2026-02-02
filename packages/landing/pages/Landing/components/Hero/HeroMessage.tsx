import React from "react"
import type { Landing } from "@/pages/Landing/types"
import { LANDING } from "@/app/styles/colors"

const HeroMessage: React.FC<Landing.Hero.HeroMessageProps> = ({ children }) => {
    return (
        <p style={{
            fontSize: "clamp(0.9rem, 2vw, 1.35rem)",
            color: LANDING.TEXT_SECONDARY,
            marginBottom: "3rem",
            lineHeight: 1.6,
        }}>
            {children}
        </p>
    )
}

export default HeroMessage
