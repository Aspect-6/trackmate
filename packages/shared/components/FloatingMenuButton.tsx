import React from 'react'
import { Menu, X } from 'lucide-react'
import { useHover } from '../hooks/ui/useHover'

interface FloatingMenuButtonProps {
    onClick: () => void
    isOpen?: boolean
    backgroundColor: string
    hoverColor: string
    iconColor?: string
}

const FloatingMenuButton: React.FC<FloatingMenuButtonProps> = ({
    onClick,
    isOpen = false,
    backgroundColor,
    hoverColor,
    iconColor = '#fff'
}) => {
    const { isHovered, hoverProps } = useHover()

    // Animate position: Left (closed) -> Right (open)
    const leftPosition = isOpen ? 'calc(100% - 3.5rem - 1.5rem)' : '1.5rem' // 3.5rem (w-14) + 1.5rem (margin)

    return (
        <button
            onClick={onClick}
            className={`lg:hidden fixed bottom-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out active:scale-95 ${isOpen ? 'z-[60]' : 'z-40'}`}
            style={{
                backgroundColor: isHovered ? hoverColor : backgroundColor,
                color: iconColor,
                left: leftPosition
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            {...hoverProps}
        >
            <div className="transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
        </button>
    )
}

export default FloatingMenuButton
