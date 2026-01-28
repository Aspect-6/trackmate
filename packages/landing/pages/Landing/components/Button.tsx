import React from 'react'
import { useHover } from '@shared/hooks/ui/useHover'
import type { Landing } from '@/pages/Landing/types'
import { LANDING } from '@/app/styles/colors'

const Button: React.FC<Landing.Button.Props> = ({ onClick, children, variant = 'primary', className }) => {
    const { isHovered, hoverProps } = useHover()
    const isPrimary = variant === 'primary'

    return (
        <button
            className={`py-2.5 px-5 md:py-3.5 md:px-8 rounded-xl cursor-pointer text-sm font-semibold transition-all duration-200 ${className}`}
            style={{
                border: isPrimary ? '1px solid transparent' : `1px solid ${LANDING.BORDER_SECONDARY}`,
                backgroundColor: isPrimary
                    ? (isHovered ? LANDING.PRIMARY_BUTTON_BG_HOVER : LANDING.PRIMARY_BUTTON_BG)
                    : (isHovered ? LANDING.BACKGROUND_TERTIARY : 'transparent'),
                color: isPrimary ? LANDING.TEXT_WHITE : LANDING.TEXT_PRIMARY,
                transform: isHovered ? 'translateY(-0.65px)' : 'none',
                boxShadow: isHovered && isPrimary ? '0 8px 20px rgba(0, 0, 0, 0.3)' : 'none',
            }}
            onClick={onClick}
            {...hoverProps}
        >
            {children}
        </button>
    )
}

export default Button
