import React from "react"
import type { Landing } from "@/pages/Landing/types"
import { LANDING } from "@/app/styles/colors"

const ProductCardTitle: React.FC<Landing.ProductCard.ProductCardTitleProps> = ({ children }) => {
    return (
        <h3 className="text-2xl font-bold mb-4" style={{ color: LANDING.TEXT_WHITE }}>
            {children}
        </h3>
    )
}

export default ProductCardTitle
