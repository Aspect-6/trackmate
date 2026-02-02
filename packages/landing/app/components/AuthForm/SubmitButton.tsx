import { useHover } from '@shared/hooks/ui/useHover'
import React from 'react'
import { AUTH } from '@/app/styles/colors'

interface SubmitButtonProps {
    disabled: boolean
    children: React.ReactNode
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled, children }) => {
    const { isHovered, hoverProps } = useHover()
    return (
        <button
            type="submit"
            className="auth-button w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
                backgroundColor: isHovered ? AUTH.PRIMARY_BUTTON_BG_HOVER : AUTH.PRIMARY_BUTTON_BG,
                color: AUTH.TEXT_WHITE,
                transform: isHovered ? 'translateY(-0.65px)' : 'none',
            }}
            {...hoverProps}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default SubmitButton
