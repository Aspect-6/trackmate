import React from "react"
import type { Landing } from "@/pages/Landing/types"
import { LANDING } from "@/app/styles/colors"

const Footer: React.FC<Landing.FooterProps> = ({ children }) => {
    return (
        <footer
            className="lg:mx-15 self-stretch"
            style={{
                marginTop: "4rem",
                paddingTop: "2rem",
                borderTop: `1px solid ${LANDING.BORDER_PRIMARY}`,
                textAlign: "center",
            }}
        >
            <p
                id="landing-footer-text"
                style={{
                    fontSize: "0.85rem",
                    color: LANDING.TEXT_TERTIARY,
                }}
            >
                {children}
            </p>
        </footer>
    )
}

export default Footer
