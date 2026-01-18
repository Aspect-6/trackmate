import React from 'react'
import { LANDING } from '@/app/styles/colors'

interface ProductCardDescriptionProps {
    children: React.ReactNode
}

const ProductCardDescription: React.FC<ProductCardDescriptionProps> = ({ children }) => {
    return (
        <p className="text-sm flex-1 px-4" style={{ color: LANDING.TEXT_SECONDARY }}>
            {children}
        </p>
    )
}

export default ProductCardDescription
