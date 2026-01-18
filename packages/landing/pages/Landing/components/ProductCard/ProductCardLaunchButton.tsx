import React from 'react'
import { useHover } from '@shared/hooks/ui/useHover'
import { LANDING } from '@/app/styles/colors'
import ArrowRight from '@/pages/Landing/assets/arrow-right.svg?react'

interface ProductCardLaunchButtonProps {
    href: string
}

const ProductCardLaunchButton: React.FC<ProductCardLaunchButtonProps> = ({ href }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            className="py-3 px-6 flex items-center gap-2 rounded-lg border-none text-sm font-semibold cursor-pointer transition-all duration-200 mt-5 will-change-transform backface-hidden"
            style={{
                backgroundColor: isHovered ? LANDING.PRIMARY_BUTTON_BG_HOVER : LANDING.PRIMARY_BUTTON_BG,
                color: LANDING.TEXT_WHITE,
                transform: isHovered ? 'translate3d(0, -1px, 0)' : 'translate3d(0, 0, 0)',
            }}
            onClick={() => window.location.pathname = href}
            {...hoverProps}
        >
            Launch
            <ArrowRight className="w-4 h-4" />
        </button>
    )
}

export default ProductCardLaunchButton
