import React from 'react'
import { Menu, X } from 'lucide-react'
import { GLOBAL } from '@/app/styles/colors'
import { useHover } from '@shared/hooks/ui/useHover'

interface FloatingMenuButtonProps {
    onClick: () => void
    isOpen?: boolean
}

/**
 * A floating action button (FAB) for opening the mobile sidebar.
 * Positioned at the bottom-left corner of the screen, only visible on mobile.
 * Hides when the sidebar is open to avoid overlapping sidebar content.
 */
const FloatingMenuButton: React.FC<FloatingMenuButtonProps> = ({ onClick, isOpen = false }) => {
    const { isHovered, hoverProps } = useHover()

    // Animate position: Left (closed) -> Right (open)
    const leftPosition = isOpen ? 'calc(100% - 3.5rem - 1.5rem)' : '1.5rem' // 3.5rem (w-14) + 1.5rem (margin)

    return (
        <button
            onClick={onClick}
            className={`lg:hidden fixed bottom-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out active:scale-95 ${isOpen ? 'z-[60]' : 'z-40'}`}
            style={{
                backgroundColor: isHovered ? GLOBAL.ADDITEM_BUTTON_BG_HOVER : GLOBAL.ADDITEM_BUTTON_BG,
                color: '#fff',
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
