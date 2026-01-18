import React from 'react'
import GoogleIcon from '@/app/assets/google-icon.svg?react'
import { useHover } from '@shared/hooks/ui/useHover'
import { AUTH } from '@/app/styles/colors'

interface GoogleButtonProps {
    onClick: () => void
    children: React.ReactNode
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick, children }) => {
    const { isHovered, hoverProps } = useHover()

    return (
        <button
            type="button"
            className="w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-3"
            style={{
                backgroundColor: AUTH.BACKGROUND_TERTIARY,
                border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                color: AUTH.TEXT_PRIMARY,
                filter: isHovered ? 'brightness(1.1)' : 'none',
                transform: isHovered ? 'translateY(-0.65px)' : 'none',
            }}
            onClick={onClick}
            {...hoverProps}
        >
            <GoogleIcon className="w-5 h-5" />
            {children}
        </button>
    )
}

export default GoogleButton