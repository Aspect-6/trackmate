import React from 'react'
import { LANDING } from '@/app/styles/colors'

interface ProductCardTitleProps {
    children: React.ReactNode
}

const ProductCardTitle: React.FC<ProductCardTitleProps> = ({ children }) => {
    return (
        <h3 className="text-2xl font-bold mb-4" style={{ color: LANDING.TEXT_WHITE }}>
            {children}
        </h3>
    )
}

export default ProductCardTitle
