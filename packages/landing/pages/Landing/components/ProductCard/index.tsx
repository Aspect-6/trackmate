import React from "react"
import type { Landing } from "@/pages/Landing/types"
import { LANDING } from "@/app/styles/colors"
import ProductCardIcon from "./ProductCardIcon"
import ProductCardTitle from "./ProductCardTitle"
import ProductCardDescription from "./ProductCardDescription"
import ProductCardLaunchButton from "./ProductCardLaunchButton"
import ComingSoonBadge from "./ComingSoonBadge"

const ProductCard: React.FC<Landing.ProductCard.Props> = ({ title, description, icon, href, accentColor, comingSoon = false }) => {
    return (
        <div
            className="py-10 px-8 rounded-2xl shadow-md flex flex-col items-center text-center relative"
            style={{
                minWidth: "300px",
                maxWidth: "340px",
                backgroundColor: LANDING.BACKGROUND_SECONDARY,
                border: `1px solid ${LANDING.BORDER_PRIMARY}`,
                opacity: comingSoon ? 0.6 : 1,
                filter: comingSoon ? "grayscale(0.3)" : "none",
            }}
        >
            {comingSoon && <ComingSoonBadge />}
            <ProductCardIcon icon={icon} accentColor={comingSoon ? "hsl(0, 0%, 40%)" : accentColor} />
            <ProductCardTitle>{title}</ProductCardTitle>
            <ProductCardDescription>{description}</ProductCardDescription>
            {!comingSoon && <ProductCardLaunchButton href={href} />}
        </div>
    )
}

export default ProductCard
