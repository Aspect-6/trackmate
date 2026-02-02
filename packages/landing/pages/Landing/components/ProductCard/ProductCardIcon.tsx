import React from "react"
import type { Landing } from "@/pages/Landing/types"
import { LANDING } from "@/app/styles/colors"

const ProductCardIcon: React.FC<Landing.ProductCard.ProductCardIconProps> = ({ icon, accentColor }) => {
    return (
        <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{
                backgroundColor: accentColor,
                color: LANDING.TEXT_WHITE,
                boxShadow: `0 0 7px ${accentColor}`,
            }}
        >
            {icon}
        </div>
    )
}

export default ProductCardIcon
