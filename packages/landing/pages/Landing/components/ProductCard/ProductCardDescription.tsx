import React from 'react'
import type { Landing } from '@/pages/Landing/types'
import { LANDING } from '@/app/styles/colors'

const ProductCardDescription: React.FC<Landing.ProductCard.ProductCardDescription.Props> = ({ children }) => {
    return (
        <p className="text-sm flex-1 px-4" style={{ color: LANDING.TEXT_SECONDARY }}>
            {children}
        </p>
    )
}

export default ProductCardDescription
