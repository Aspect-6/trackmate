import React, { ButtonHTMLAttributes } from 'react'
import { useHover } from '@shared/hooks/ui/useHover'
import { ACCOUNT } from '@/app/styles/colors'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary' | 'danger' | 'danger-outline' | 'icon'
    fullWidth?: boolean
    isLoading?: boolean
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
    variant,
    fullWidth = false,
    isLoading = false,
    className = '',
    style,
    disabled,
    children,
    ...props
}) => {
    const { isHovered, hoverProps } = useHover()

    const layoutClasses = `flex items-center justify-center gap-2 ${fullWidth ? ' w-full flex-1' : ''}`.trim()
    const textClasses = "text-sm font-medium"
    const appearanceClasses = "rounded-lg duration-200 disabled:cursor-not-allowed"

    const classes = `${layoutClasses} ${textClasses} ${appearanceClasses} ${className}`.trim()

    let variantStyles = {}

    switch (variant) {
        case 'primary':
            variantStyles = {
                backgroundColor: isHovered ? ACCOUNT.PRIMARY_BUTTON_BG_HOVER : ACCOUNT.PRIMARY_BUTTON_BG,
                color: ACCOUNT.TEXT_PRIMARY
            }
            break
        case 'secondary':
            variantStyles = {
                backgroundColor: "transparent",
                border: `1px solid ${ACCOUNT.BORDER_PRIMARY}`,
                color: ACCOUNT.TEXT_PRIMARY,
                opacity: (disabled || isLoading) ? 0.6 : isHovered ? 0.8 : 1,
                willChange: "opacity",
            }
            break
        case 'icon':
            variantStyles = {
                backgroundColor: "transparent",
                color: ACCOUNT.TEXT_PRIMARY,
                opacity: (disabled || isLoading) ? 0.6 : isHovered ? 0.7 : 1,
                willChange: "opacity",
            }
            break
        case 'danger':
            variantStyles = {
                backgroundColor: (!isLoading && isHovered) ? ACCOUNT.DELETE_BUTTON_BG_HOVER : ACCOUNT.DELETE_BUTTON_BG,
                color: ACCOUNT.DELETE_BUTTON_TEXT,
                boxShadow: ACCOUNT.DANGER_ZONE_CONFIRM_DELETE_SHADOW
            }
            break
        case 'danger-outline':
            variantStyles = {
                backgroundColor: isHovered ? ACCOUNT.DANGER_ZONE_BORDER : 'transparent',
                border: `1px solid ${ACCOUNT.DANGER_ZONE_BORDER}`,
                color: ACCOUNT.TEXT_DANGER
            }
            break
    }

    return (
        <button
            className={classes}
            style={{
                ...variantStyles,
                ...style
            }}
            disabled={isLoading || disabled}
            {...hoverProps}
            {...props}
        >
            {children}
        </button>
    )
}